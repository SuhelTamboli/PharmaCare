"use client";
import { Medicine } from "@/app/inventory/page";
import { RootState } from "@/store/store";
import { Minus, Plus, X } from "lucide-react";
import { useSelector } from "react-redux";
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
  const { user } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = async () => {
    console.log(`Added ${quantity} of ${selectedMedicine?.name} to cart`);
    // Add your cart logic here (e.g.,call api, dispatch to Redux or Context)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user?.id,
            medicine_id: selectedMedicine.id,
            quantity: quantity,
          }),
          credentials: "include", // crucial for cookies to be sent
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // If your Node.js API returns errors (e.g., status 400 or 500)
        toast.error("Add to Cart Failed", {
          description: "Failed to add to cart. Please try again.",
        });
        return;
      }

      // Success!
      console.log("Added to cart successfully", data);
      toast.success("Added to Cart Successfully", {
        description: "Successfully added medicine to your cart.",
      });
      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Server Error: Add to Cart Failed", {
        description: "Failed to add to cart. Please try again.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white">Add to Cart</h2>
            <button
              onClick={closeModal}
              className="text-slate-400 hover:text-white"
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

          <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800 mb-6">
            <span className="text-slate-300">Quantity</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(selectedMedicine.stock, quantity + 1))
                }
                className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-white"
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
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            Confirm Add
          </button>
        </div>
      </div>
    </div>
  );
};
