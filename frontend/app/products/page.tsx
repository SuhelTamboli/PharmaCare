"use client";
import { useState } from "react";
import { Search, Package, Filter } from "lucide-react";
import { Medicine } from "../inventory/page";
import { useFetch } from "@/hooks/useFetch";
import MedicineCard from "@/components/MedicineCard";
import { AddToCart } from "@/components/modal/AddToCart";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);

  // Pass the specific URL to the useFetch hook
  const {
    data: medicines,
    // loading,
    // error,
    // refresh,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/medicine/all-medicines`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Essential for cross-site cookies/sessions
    },
  );

  // Since 'data' starts as null, we default to an empty array for filtering
  const allMedicines: Medicine[] = medicines || [];

  const filteredMedicines = allMedicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const closeModal = () => {
    setSelectedMedicine(null);
    setQuantity(1);
  };

  return (
    <div className=" text-slate-200 p-6">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Pharmacare <span className="text-emerald-400">Inventory</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Real-time medicine availability and stock management.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1e293b] border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-white placeholder:text-slate-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-[#1e293b] border border-slate-700 rounded-xl hover:bg-slate-700 text-slate-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((med) => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onOpenModal={() => setSelectedMedicine(med)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredMedicines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-800 rounded-3xl">
            <Package className="w-16 h-16 text-slate-700 mb-4" />
            <h3 className="text-xl font-medium text-slate-400">
              No results found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}

        {/* --- ADD TO CART MODAL --- */}
        {selectedMedicine && (
          <AddToCart
            selectedMedicine={selectedMedicine}
            quantity={quantity}
            setQuantity={setQuantity}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}
