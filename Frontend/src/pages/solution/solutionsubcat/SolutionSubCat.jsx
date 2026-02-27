import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SolutionSubCat() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/solution-sub-cat")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(
        `http://localhost:5000/api/solution-sub-cat/${id}`
      );
      fetchData();
    }
  };

  const truncateText = (html, maxLength = 150) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <div className="flex justify-between mb-6">
        <Typography variant="h4">
          Solution Sub Categories
        </Typography>
        <Button
          onClick={() =>
            navigate("/dashboard/solution/solution-sub-cat/add")
          }
        >
          Add New
        </Button>
      </div>

      <Card>
        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Category Title</th>
                <th className="border px-3 py-2">Image1</th>
                <th className="border px-3 py-2">Full Details</th>
                <th className="border px-3 py-2">Description</th>
                <th className="border px-3 py-2">Image2</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                // SAFE image2 parsing
                let images = [];
                try {
                  images =
                    typeof item.image2 === "string"
                      ? JSON.parse(item.image2)
                      : item.image2 || [];
                } catch {
                  images = [];
                }

                return (
                  <tr key={item.id} className="border-b">
                    <td className="border p-3">
                      {index + 1}
                    </td>

                    {/* Category Title */}
                    <td className="border p-3 font-semibold">
                      {item.solution_cat?.title || "No Category"}
                    </td>

                    {/* Category Image */}
                    <td className="border p-3">
                      {item.solution_cat?.image ? (
                        <img
                          src={`http://localhost:5000/${item.solution_cat.image}`}
                          className="h-16 rounded"
                          alt={item.solution_cat.title}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    {/* Para1 */}
                    <td className="border p-3 max-w-xs">
                      {truncateText(item.para1)}
                    </td>

                    {/* Para2 */}
                    <td className="border p-3 max-w-xs">
                      {truncateText(item.para2)}
                    </td>

                    {/* Multiple Images (image2) */}
                    <td className="border p-3">
                      <div className="flex gap-2 flex-wrap">
                        {images.length > 0 ? (
                          images.map((img, i) => (
                            <img
                              key={i}
                              src={`http://localhost:5000/${img}`}
                              className="h-12 rounded"
                              alt="multi"
                            />
                          ))
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="border p-3 space-x-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(
                            `/dashboard/solution/solution-sub-cat/edit/${item.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}

              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}