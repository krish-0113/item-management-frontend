import { useState } from "react";
import { createItem } from "../api/itemApi";

function ItemForm({ onItemAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.price) {
      setError("Name and Price are required");
      return;
    }

    try {
      setLoading(true);
      await createItem({
        name: form.name,
        description: form.description,
        price: Number(form.price),
      });
      setSuccess("Item added successfully!");
      setForm({ name: "", description: "", price: "" });
      setTimeout(() => {
        onItemAdded();
      }, 1000);
    } catch (err) {
      setError("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Item</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Item Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter item name"
            className="w-full border-2 border-gray-300 focus:border-blue-600 p-3 rounded-lg focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter item description"
            rows="3"
            className="w-full border-2 border-gray-300 focus:border-blue-600 p-3 rounded-lg focus:outline-none transition resize-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter item price"
            className="w-full border-2 border-gray-300 focus:border-blue-600 p-3 rounded-lg focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 disabled:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⏳</span>
              Adding Item...
            </span>
          ) : (
            "Add Item"
          )}
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
