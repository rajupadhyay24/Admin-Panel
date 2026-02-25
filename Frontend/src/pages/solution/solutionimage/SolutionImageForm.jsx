import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SolutionImageForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(
          `http://localhost:5000/api/solution-images/${id}`
        )
        .then((res) => {
          setTitle(res.data.title);

          setPreview({
            image1: res.data.image1
              ? `http://localhost:5000/${res.data.image1}`
              : null,
            image2: res.data.image2
              ? `http://localhost:5000/${res.data.image2}`
              : null,
            image3: res.data.image3
              ? `http://localhost:5000/${res.data.image3}`
              : null,
            image4: res.data.image4
              ? `http://localhost:5000/${res.data.image4}`
              : null,
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (id) {
      await axios.put(
        `http://localhost:5000/api/solution-images/${id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/solution-images",
        formData
      );
    }

    navigate(
      "/dashboard/solution/solution-images"
    );
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Typography>Title</Typography>
          <Input
            name="title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          {[1, 2, 3, 4].map((num) => (
            <div key={num}>
              <Typography>
                Image {num}
              </Typography>

              <input
                type="file"
                name={`image${num}`}
              />

              {preview[`image${num}`] && (
                <img
                  src={preview[`image${num}`]}
                  className="h-20 mt-3"
                  alt=""
                />
              )}
            </div>
          ))}

          <Button type="submit" fullWidth>
            {id ? "Update" : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
