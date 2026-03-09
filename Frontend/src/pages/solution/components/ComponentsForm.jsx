import { useNavigate } from "react-router-dom";

export default function ComponentsForm() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Component Saved");

    navigate("/solution/components");
  };

  return (
    <div className="mt-8 max-w-xl">

      <h2 className="text-2xl font-bold mb-6">
        Add Component
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block mb-1">Component Name</label>

          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter component name"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

      </form>

    </div>
  );
}