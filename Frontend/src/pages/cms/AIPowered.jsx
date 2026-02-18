import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AIPowered() {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: 1,
      title: "<b>Smarter Title</b>",
      content: "<p>Smarter section description</p>",
      media: "https://picsum.photos/100",
      type: "image", // image or video
    },
  ]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 px-6">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            AI-Powered Section
          </Typography>

          <Button
            color="white"
            size="sm"
            onClick={() =>
              navigate("/dashboard/cms/ai-powered/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto">
            <thead>
              <tr>
                {["Title", "Content", "Media", "Action"].map((head) => (
                  <th key={head} className="border-b py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-5 border-b">
                    <div dangerouslySetInnerHTML={{ __html: item.title }} />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </td>

                  <td className="py-3 px-5 border-b">
                    {item.type === "image" ? (
                      <img
                        src={item.media}
                        alt="media"
                        className="h-16 w-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={item.media}
                        className="h-16 w-24 object-cover rounded-lg"
                        controls
                      />
                    )}
                  </td>

                  <td className="py-3 px-5 border-b">
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/cms/ai-powered/edit/${item.id}`
                        )
                      }
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
