import { useEffect, useState } from "react";
import { deleteItem, getAllItems } from "../api/itemApi";
import ItemForm from "../components/ItemForm";
import ItemTable from "../components/ItemTable";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await getAllItems();
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  const handleItemAdded = () => {
    setShowForm(false);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Item Management System</h1>
          <p className="text-gray-600">Manage and track your items efficiently</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Add Item Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            {showForm ? "Close Form" : "+ Add New Item"}
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="mb-10 bg-white rounded-lg shadow-lg p-6">
            <ItemForm onItemAdded={handleItemAdded} />
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-semibold">Loading items...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div className="mb-6">
              <p className="text-gray-700 font-semibold text-lg">
                Total Items: <span className="text-blue-600">{items.length}</span>
              </p>
            </div>

            {/* Items Table */}
            {items.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <ItemTable items={items} onDelete={handleDelete} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <p className="text-gray-500 text-xl mb-4">No items found</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Add Your First Item
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
