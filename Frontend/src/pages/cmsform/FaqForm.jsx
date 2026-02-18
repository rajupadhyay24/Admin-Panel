import {
  Card,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function FaqForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const questions = [
    "What is SkyIIoT?",
    "what industries do you server?",
    "is skyiiot is compatible with existing system?",
    "how secure is the platform?",
    "Do you offer cloud and mobile access?",
    "what features are included in the pump automation system?",
    "How scalable is the system?",
  ];

  const [formData, setFormData] = useState({
    question: "",
    description: "",
  });

  const handleEditorChange = (editor) => {
    const data = editor.getData();
    setFormData((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    navigate("/dashboard/cms/faq");
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <Card className="w-full p-10 shadow-xl rounded-2xl">

        <Typography variant="h4" className="mb-2">
          {id ? "Edit FAQ" : "Add FAQ"}
        </Typography>

        <Typography variant="small" color="gray" className="mb-8">
          Manage FAQ Questions
        </Typography>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-8">

          {/* Dropdown */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">
              Select Question
            </Typography>

            <Select
              label="Select Option"
              value={formData.question}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  question: value,
                }))
              }
            >
              {questions.map((q, index) => (
                <Option key={index} value={q}>
                  {q}
                </Option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div className="col-span-12">
            <Typography className="mb-2 font-medium">
              Description
            </Typography>

            <div className="border rounded-xl p-2 bg-white">
              <CKEditor
                editor={ClassicEditor}
                data={formData.description}
                onChange={(event, editor) =>
                  handleEditorChange(editor)
                }
              />
            </div>
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
