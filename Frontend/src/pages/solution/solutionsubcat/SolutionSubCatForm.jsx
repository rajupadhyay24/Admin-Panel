import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function SolutionSubCatForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!!id);

  const [formData, setFormData] = useState({
    solutionCatId: "",
    title: "",
    image: "",
    para1: "",
    para2: "",
    image2: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // 🔹 Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/solution-cat")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Fetch sub category if editing
  useEffect(() => {
    if (id) {
      setLoading(true);

      axios
        .get(`http://localhost:5000/api/solution-sub-cat/${id}`)
        .then((res) => {
          const data = res.data;

          setFormData({
            solutionCatId: data.solutionCatId || "",
            title: data.title || "",
            image: data.image || "",
            para1: data.para1 || "",
            para2: data.para2 || "",
            image2: [],
          });

          const existingImages =
            typeof data.image2 === "string"
              ? JSON.parse(data.image2 || "[]")
              : data.image2 || [];

          setPreviewImages(
            existingImages.map(
              (img) =>
                `http://localhost:5000/${img}`
            )
          );

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  // 🔹 Handle multiple image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      image2: files,
    }));

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.solutionCatId) {
      alert("Please select category");
      return;
    }

    const data = new FormData();
    data.append("solutionCatId", formData.solutionCatId);
    data.append("para1", formData.para1);
    data.append("para2", formData.para2);

    formData.image2.forEach((file) => {
      data.append("image2", file);
    });

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/solution-sub-cat/${id}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/solution-sub-cat",
          data
        );
      }

      navigate("/dashboard/solution/solution-sub-cat");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Prevent CKEditor from rendering before data loads
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Category Dropdown */}
          <Typography>Select Category</Typography>
          <select
            className="border p-2 w-full"
            value={formData.solutionCatId}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                solutionCatId: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          {/* Category Title */}
          {formData.title && (
            <>
              <Typography>Category Title</Typography>
              <input
                value={formData.title}
                disabled
                className="border p-2 w-full bg-gray-100"
              />
            </>
          )}

          {/* Category Image */}
          {formData.image && (
            <>
              <Typography>Category Image</Typography>
              <img
                src={`http://localhost:5000/${formData.image}`}
                className="h-24 rounded"
                alt="category"
              />
            </>
          )}

          {/* Full Details */}
          <Typography>Full Details</Typography>
          <CKEditor
            key={`para1-${id || "new"}`}
            editor={ClassicEditor}
            data={formData.para1 || ""}
            onChange={(event, editor) =>
              setFormData((prev) => ({
                ...prev,
                para1: editor.getData(),
              }))
            }
          />

          {/* Description */}
          <Typography>Description</Typography>
          <CKEditor
            key={`para2-${id || "new"}`}
            editor={ClassicEditor}
            data={formData.para2 || ""}
            onChange={(event, editor) =>
              setFormData((prev) => ({
                ...prev,
                para2: editor.getData(),
              }))
            }
          />

          {/* Multiple Images */}
          <Typography>Upload Multiple Images</Typography>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />

          <div className="flex gap-2 flex-wrap mt-2">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                className="h-20 rounded"
                alt="preview"
              />
            ))}
          </div>

          <Button type="submit" fullWidth>
            {id ? "Update" : "Create"}
          </Button>

        </form>
      </Card>
    </div>
  );
}
