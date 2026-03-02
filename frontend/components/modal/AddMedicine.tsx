"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddMedicineProps {
  setIsModalOpen: (isOpen: boolean) => void;
  refreshData: () => void; // Add this to your interface
}

export const AddMedicine = ({
  setIsModalOpen,
  refreshData,
}: AddMedicineProps) => {
  // Form State
  const [formData, setFormData] = useState({
    name: "Paracetamol",
    category: "Analgesics",
    stock: "20",
    price: "5.50",
    expiry_date: "01-01-2028",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  /**
   * Updates the form data with the new value from the input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the input field.
   * @returns {void}
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
   * Handles the form submission event.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the submission is complete.
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/medicine/add-medicine`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Use the message from your ApiResponse.error(res, "...", status)
        setErrors({
          form: data.error || "Failed to add medicine. Please try again.",
        });
        toast.error("Add Medicine Error", { description: data.message });
        return;
      }

      // 1. Success feedback
      toast.success("Medicine added successfully!");

      // 2. Trigger the refresh in the parent component
      refreshData();

      // 3. Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Server Error", {
        description: "Could not connect to the server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Add New Medicine</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            {errors.form && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {errors.form}
              </div>
            )}
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Medicine Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 focus:border-blue-500 outline-none text-white"
              placeholder="e.g. Paracetamol"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 outline-none text-white"
                placeholder="Analgesic"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Stock (Strips)
              </label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 outline-none text-white"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Price per Strip
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 outline-none text-white"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Expiry Date
              </label>
              <input
                name="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 outline-none text-white"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
