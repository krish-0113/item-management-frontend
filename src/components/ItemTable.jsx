
function ItemTable({ items, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        onDelete(id);
      } catch (error) {
        alert("Failed to delete item");
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">ID</th>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-left font-semibold">Price</th>
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-blue-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-gray-700">{item.name}</td>
                <td className="px-6 py-4 text-gray-700">{item.description || "-"}</td>
                <td className="px-6 py-4 font-semibold text-green-600">₹{item.price}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemTable;
