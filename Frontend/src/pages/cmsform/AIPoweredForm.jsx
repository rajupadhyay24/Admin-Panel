import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function AIPoweredForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    media: null,
    type: "image",
  });

  const [preview, setPreview] = useState(null);

  const handleEditorChange = (field, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type.startsWith("video")
        ? "video"
        : "image";

      setFormData((prev) => ({
        ...prev,
        media: file,
        type: fileType,
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    navigate("/dashboard/cms/ai-powered");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10 shadow-xl rounded-2xl">

        <Typography variant="h4" className="mb-2">
          {id ? "Edit AI-Powered Section" : "Add AI Powered Section"}
        </Typography>

        <Typography variant="small" color="gray" className="mb-8">
          Manage AI Powered Content
        </Typography>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">

          {/* Title */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">
              Title
            </Typography>
            <div className="border rounded-xl p-2 bg-white">
              <CKEditor
                editor={ClassicEditor}
                data={formData.title}
                onChange={(event, editor) =>
                  handleEditorChange("title", editor)
                }
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">
              Content
            </Typography>
            <div className="border rounded-xl p-2 bg-white">
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
                onChange={(event, editor) =>
                  handleEditorChange("content", editor)
                }
              />
            </div>
          </div>

          {/* Media Upload */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">
              Upload Image or Video
            </Typography>

            <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition overflow-hidden">
              {preview ? (
                formData.type === "image" ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full object-cover rounded-xl"
                  />
                ) : (
                  <video
                    src={preview}
                    className="h-full object-cover rounded-xl"
                    controls
                  />
                )
              ) : (
                <Typography color="gray">
                  Click to upload image or video
                </Typography>
              )}

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="col-span-12">
            <Button type="submit" fullWidth>
              Save
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}
