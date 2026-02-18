import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SolutionCatForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/solution-cat/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setPreview(
            `http://localhost:5000/uploads/${res.data.image}`
          );
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    if (id) {
      await axios.put(
        `http://localhost:5000/api/solution-cat/${id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/solution-cat",
        formData
      );
    }

    navigate("/dashboard/solution/solution-cat");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Typography>Title</Typography>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Typography>Image</Typography>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(
                URL.createObjectURL(e.target.files[0])
              );
            }}
          />

          {preview && (
            <img
              src={preview}
              className="h-20 mt-3"
              alt=""
            />
          )}

          <Button type="submit" fullWidth>
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}
