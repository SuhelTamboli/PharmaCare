import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Ensure this path points to your actual store file

export interface CartItem {
  cart_item_id: number;
  medicine_id: number;
  name: string;
  price: string;
  quantity: number;
  subtotal: string;
  available_stock: number;
}

interface CartData {
  user_id: string;
  cart_items: CartItem[];
  grand_total: string;
  total_items: number;
}

interface CartState {
  data: CartData;
  loading: boolean;
  error: string | null;
  cartCount: number;
}

const initialState: CartState = {
  data: {
    user_id: "",
    cart_items: [],
    grand_total: "0.00",
    total_items: 0,
  },
  loading: false,
  error: null,
  cartCount: 0,
};

// 3. Async Thunk to fetch cart data
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Access the auth state to get the user ID
      const state = getState() as RootState;
      const userId = state.auth.user?.id; // Adjust based on your auth slice structure

      if (!userId) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/fetch-cart`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch cart");
      }

      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

// 4. Async Thunk to add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    payload: { medicine_id: number; quantity?: number },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) throw new Error("User not authenticated");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add-to-cart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            medicine_id: payload.medicine_id,
            quantity: payload.quantity || 1, // default increment = 1
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to add to cart");
      }

      // Refresh cart after update
      // dispatch(fetchCart());

      return result.data; // ⚡ return updated/inserted item
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

// 5. Async Thunk to decrease cart item quantity
export const decrementCartItem = createAsyncThunk(
  "cart/decrementCartItem",
  async (
    payload: { medicine_id: number },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) throw new Error("User not authenticated");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/decrease-quantity-from-cart`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            medicine_id: payload.medicine_id,
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to decrease quantity");
      }

      // Refresh cart
      // dispatch(fetchCart());

      return { medicine_id: payload.medicine_id, ...result.data };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

// 6. Async Thunk to remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    payload: { medicine_id: number },
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.id;

      if (!userId) throw new Error("User not authenticated");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/remove-from-cart`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            medicine_id: payload.medicine_id,
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to remove item");
      }

      // Refresh cart
      // dispatch(fetchCart());

      return payload.medicine_id; // just return id
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.data = initialState.data;
    },
    updateCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    updateLocalQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.data.cart_items.find(
        (i) => i.cart_item_id === action.payload.id,
      );
      if (item) {
        item.quantity = action.payload.quantity;
        item.subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);

        const newTotal = state.data.cart_items.reduce(
          (acc, curr) => acc + parseFloat(curr.subtotal),
          0,
        );
        state.data.grand_total = newTotal.toFixed(2);
      }
    },
  },
  extraReducers: (builder) => {
    builder

      // ✅ FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<CartData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
          state.cartCount = action.payload.cart_items.length;
        },
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ ADD / INCREMENT
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;

        const existing = state.data.cart_items.find(
          (i) => i.medicine_id === item.medicine_id,
        );

        if (existing) {
          existing.quantity = item.quantity;
          existing.subtotal = (
            parseFloat(existing.price) * existing.quantity
          ).toFixed(2);
        } else {
          state.data.cart_items.push(item);
        }

        // recalc total
        const total = state.data.cart_items.reduce(
          (sum, i) => sum + parseFloat(i.subtotal),
          0,
        );

        state.data.grand_total = total.toFixed(2);
        state.cartCount = state.data.cart_items.length;
      })

      // ✅ DECREMENT
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        const { medicine_id } = action.payload;

        const itemIndex = state.data.cart_items.findIndex(
          (i) => i.medicine_id === medicine_id,
        );

        if (itemIndex !== -1) {
          const item = state.data.cart_items[itemIndex];

          if (item.quantity > 1) {
            item.quantity -= 1;
            item.subtotal = (parseFloat(item.price) * item.quantity).toFixed(2);
          } else {
            // remove if 0
            state.data.cart_items.splice(itemIndex, 1);
          }
        }

        // recalc total
        const total = state.data.cart_items.reduce(
          (sum, i) => sum + parseFloat(i.subtotal),
          0,
        );

        state.data.grand_total = total.toFixed(2);
        state.cartCount = state.data.cart_items.length;
      })

      // ✅ REMOVE
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.data.cart_items = state.data.cart_items.filter(
          (i) => i.medicine_id !== action.payload,
        );

        const total = state.data.cart_items.reduce(
          (sum, i) => sum + parseFloat(i.subtotal),
          0,
        );

        state.data.grand_total = total.toFixed(2);
        state.cartCount = state.data.cart_items.length;
      });
  },
});

export const { clearCart, updateLocalQuantity, updateCartCount } =
  cartSlice.actions;
export default cartSlice.reducer;
