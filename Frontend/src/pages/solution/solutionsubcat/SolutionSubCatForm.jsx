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
import BASE_URL from "../../../configs/api";


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
  para3: "",
  para4: "",
  para5: "",
  para6: "",
  image2: []
});

  const [previewImages, setPreviewImages] = useState([]);


  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/solution-cat`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    if (id) {
      setLoading(true);

      axios
        .get(`${BASE_URL}/api/solution-sub-cat/${id}`)
        .then((res) => {
          const data = res.data;

         setFormData({
          solutionCatId: data.solutionCatId || "",
          title: data.title || "",
          image: data.image || "",
          para1: data.para1 || "",
          para2: data.para2 || "",
          para3: data.para3 || "",
          para4: data.para4 || "",
          para5: data.para5 || "",
          para6: data.para6 || "",
          image2: [],
        });

          const existingImages =
            typeof data.image2 === "string"
              ? JSON.parse(data.image2 || "[]")
              : data.image2 || [];

          setPreviewImages(
            existingImages.map(
              (img) =>
                `${BASE_URL}/${img}`
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
    data.append("para3", formData.para3);
    data.append("para4", formData.para4);
    data.append("para5", formData.para5);
    data.append("para6", formData.para6);

    formData.image2.forEach((file) => {
      data.append("image2", file);
    });

    try {
      if (id) {
        await axios.put(
          `${BASE_URL}/api/solution-sub-cat/${id}`,
          data
        );
      } else {
        await axios.post(
          `${BASE_URL}/api/solution-sub-cat`,
          data
        );
      }

      navigate("/dashboard/solution/solution-sub-cat");
    } catch (err) {
      console.log(err);
    }
  };


  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10">
        <form onSubmit={handleSubmit} className="space-y-6">


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


          {formData.image && (
            <>
              <Typography>Category Image</Typography>
              <img
                src={`${BASE_URL}/${formData.image}`}
                className="h-24 rounded"
                alt="category"
              />
            </>
          )}


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

          <Typography>Paragraph 3</Typography>
          <CKEditor
          editor={ClassicEditor}
          data={formData.para3}
          onChange={(event, editor) =>
            setFormData(prev => ({
            ...prev,
            para3: editor.getData()
            }))
          }
          />


        <Typography>Paragraph 4</Typography>
        <CKEditor
        editor={ClassicEditor}
        data={formData.para4}
        onChange={(event, editor) =>
          setFormData(prev => ({
          ...prev,
          para4: editor.getData()
          }))
        }
        />

        <Typography>Paragraph 5</Typography>
        <CKEditor
        editor={ClassicEditor}
        data={formData.para5}
        onChange={(event, editor) =>
          setFormData(prev => ({
          ...prev,
          para5: editor.getData()
          }))
        }
        />

        <Typography>Paragraph 6</Typography>
        <CKEditor
        editor={ClassicEditor}
        data={formData.para6}
        onChange={(event, editor) =>
          setFormData(prev => ({
          ...prev,
          para6: editor.getData()
          }))
        }
        />


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
