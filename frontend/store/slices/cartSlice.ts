import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Ensure this path points to your actual store file

interface CartItem {
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
    payload: { medicine_id: number; quantity: number },
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
            quantity: payload.quantity,
          }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to add to cart");
      }

      // Refresh the cart data immediately after a successful add
      dispatch(fetchCart());

      return result.data;
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
      });
  },
});

export const { clearCart, updateLocalQuantity, updateCartCount } =
  cartSlice.actions;
export default cartSlice.reducer;
