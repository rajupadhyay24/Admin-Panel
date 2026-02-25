import {
  Card,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AddSlidesContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [media, setMedia] = useState(null);
  const [oldMedia, setOldMedia] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/slides/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setOldMedia(res.data.media);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (media) formData.append("media", media);

    if (id) {
      await axios.put(
        `http://localhost:5000/api/slides/${id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/slides",
        formData
      );
    }

    navigate("/dashboard/master/slides-content");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="p-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <Typography variant="small" className="mb-2">
              Title
            </Typography>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Typography variant="small" className="mb-2">
              Image / Video
            </Typography>
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full"
            />

            {oldMedia && (
              <div className="mt-3">
                {oldMedia.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={`http://localhost:5000/ /${oldMedia}`}
                    width="200"
                    controls
                  />
                ) : (
                  <img
                    src={`http://localhost:5000/ /${oldMedia}`}
                    alt=""
                    width="200"
                  />
                )}
              </div>
            )}
          </div>

          <Button type="submit" fullWidth>
            {id ? "Update" : "Add"}
          </Button>

        </form>
      </Card>
    </div>
  );
}
