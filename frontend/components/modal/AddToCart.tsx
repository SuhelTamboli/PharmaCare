"use client";
import { Medicine } from "@/app/inventory/page";
import { useAppDispatch } from "@/store/hooks"; // Use your typed dispatch
import { addToCart } from "@/store/slices/cartSlice";
import { Minus, Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartProps {
  selectedMedicine: Medicine;
  closeModal: () => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const AddToCart = ({
  selectedMedicine,
  closeModal,
  quantity,
  setQuantity,
}: AddToCartProps) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = async () => {
    setIsSubmitting(true);

    // Dispatch the thunk
    const resultAction = await dispatch(
      addToCart({
        medicine_id: selectedMedicine.id,
        quantity: quantity,
      }),
    );

    if (addToCart.fulfilled.match(resultAction)) {
      toast.success("Added to Cart Successfully", {
        description: `${quantity}x ${selectedMedicine.name} added.`,
      });
      closeModal();
    } else {
      const errorMessage = resultAction.payload as string;
      toast.error("Failed to Add", {
        description: errorMessage || "Something went wrong.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white">Add to Cart</h2>
            <button
              onClick={closeModal}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-white disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-emerald-400 font-medium">
              {selectedMedicine.name}
            </p>
            <p className="text-sm text-slate-400">
              {selectedMedicine.category}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-6">
            <span className="text-slate-300">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                disabled={isSubmitting || quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold w-6 text-center">
                {quantity}
              </span>
              <button
                disabled={isSubmitting || quantity >= selectedMedicine.stock}
                onClick={() =>
                  setQuantity(Math.min(selectedMedicine.stock, quantity + 1))
                }
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <span className="text-slate-400">Total Price</span>
            <span className="text-2xl font-bold text-emerald-400">
              ${(Number(selectedMedicine.price) * quantity).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Add"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
