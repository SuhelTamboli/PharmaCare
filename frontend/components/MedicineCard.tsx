import { Medicine } from "@/app/inventory/page";
import {
  ShoppingCart,
  AlertCircle,
} from "lucide-react";

function MedicineCard({ medicine }: { medicine: Medicine }) {
  const isOutOfStock = medicine.status === "Out Of Stock";

  return (
    <div
      className={`group relative bg-[#1e293b] border border-slate-800 rounded-2xl p-5 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] ${isOutOfStock ? "opacity-60" : ""}`}
    >
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-6">
        <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-slate-400 border border-slate-700 rounded-md">
          {medicine.category}
        </span>
        {isOutOfStock ? (
          <div className="flex items-center text-rose-400 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Unavailable
          </div>
        ) : (
          <div className="flex items-center text-emerald-400 text-xs font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            {medicine.stock} in stock
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
          {medicine.name}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Expires: {new Date(medicine.expiry_date).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 uppercase font-bold">
            Price
          </span>
          <span className="text-xl font-bold text-white">
            ${medicine.price}
          </span>
        </div>

        <button
          disabled={isOutOfStock}
          className={`p-3 rounded-xl transition-all ${
            isOutOfStock
              ? "bg-slate-800 text-slate-600 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-500 active:scale-95 shadow-lg shadow-emerald-900/20"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MedicineCard;