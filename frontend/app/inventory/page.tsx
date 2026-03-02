"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { AddMedicine } from "@/components/modal/AddMedicine";
import { InventoryDataGrid } from "@/components/data-grid/InventoryDataGrid";
import { useFetch } from "@/hooks/useFetch";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pass the specific URL to the useFetch hook
  const {
    data: medicines,
    loading,
    error,
    refresh,
  } = useFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/medicine/all-medicines`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Essential for cross-site cookies/sessions
    },
  );

  // Since 'data' starts as null, we default to an empty array for filtering
  const medicineList = medicines || [];

  return (
    <div className="w-full space-y-6 p-6">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Inventory Management
      </h2>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <input
            type="text"
            placeholder="Search medicine..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
        >
          <Plus size={20} /> Add Medicine
        </button>
      </div>

      {/* Table (Simplified for brevity) */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <InventoryDataGrid medicines={medicineList} />
        {/* <button onClick={refresh}>Manual Reload</button> */}
      </div>

      {/* --- ADD MEDICINE POPUP MODAL --- */}
      {isModalOpen && (
        <AddMedicine setIsModalOpen={setIsModalOpen} refreshData={refresh} />
      )}
    </div>
  );
};

export default Inventory;
