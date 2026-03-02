"use client";

import { Medicine } from "@/app/inventory/page";
import { checkIsExpired, formatDate } from "@/app/utils/helper";
import { AlertCircle, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

interface InventoryDataGridProps {
  medicines: Medicine[];
  onDelete: (id: number) => Promise<void>; // Add this prop
}

export const InventoryDataGrid = ({ medicines, onDelete }: InventoryDataGridProps) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  // Function to handle deleting a medicine
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this medicine?")) {
      setIsDeleting(id);
      await onDelete(id);
      setIsDeleting(null);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
      <table className="w-full text-left">
        <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase font-semibold">
          <tr>
            <th className="p-4">Medicine</th>
            <th className="p-4">Category</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Price</th>
            <th className="p-4">Expiry Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {medicines.map((m) => {
            // Check if medicine is expired
            const expired = checkIsExpired(m.expiry_date);
            return (
              <tr key={m.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="p-4 font-medium text-white">{m.name}</td>
                <td className="p-4 text-gray-400 text-sm">{m.category}</td>
                <td className="p-4 text-sm">{m.stock}</td>
                <td className="p-4 text-sm">
                  $
                  {typeof m.price === "string"
                    ? parseFloat(m.price).toFixed(2)
                    : m.price.toFixed(2)}
                </td>
                <td className="p-4 text-gray-400 text-sm">
                  {formatDate(m.expiry_date)}
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    {/* Primary Status */}
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        m.status === "In Stock"
                          ? "text-green-400 bg-green-900/20"
                          : "text-red-400 bg-red-900/20"
                      }`}
                    >
                      {m.status}
                    </span>

                    {/* Expiry Alert */}
                    {expired && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-md uppercase tracking-tighter border border-orange-500/20">
                        <AlertCircle size={10} />
                        Expired
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 hover:bg-gray-800 rounded-lg hover:text-blue-400 transition-all"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      disabled={isDeleting === m.id}
                      className={`p-2 rounded-lg transition-all ${
                        isDeleting === m.id
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-800 hover:text-red-400"
                      }`}
                      title="Delete"
                    >
                      <Trash2
                        size={16}
                        className={isDeleting === m.id ? "animate-pulse" : ""}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {medicines.length === 0 && (
        <div className="p-8 text-center text-gray-500 text-sm">
          No medicines found in inventory.
        </div>
      )}
    </div>
  );
};
