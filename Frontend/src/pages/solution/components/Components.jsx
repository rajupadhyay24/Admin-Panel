import { useNavigate } from "react-router-dom";

export default function Components() {

  const navigate = useNavigate();

  return (
    <div className="mt-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Components</h2>

        <button
          onClick={() => navigate("/solution/components/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Component
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-5">
        <p className="text-gray-600">
          Components list 
        </p>
      </div>

    </div>
  );
}