import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SupportedContent() {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: 1,
      title: "<b>Sample Title</b>",
      content: "<p>Sample Content</p>",
      image1: "https://via.placeholder.com/60",
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
            Supported Content
          </Typography>

          <Button
            color="white"
            size="sm"
            onClick={() =>
              navigate("/dashboard/master/supported-content/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto">
            <thead>
              <tr>
                {["Title", "Content", "Image", "Action"].map(
                  (head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {head}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-5 border-b">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.title,
                      }}
                    />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <Avatar
                      src={item.image1}
                      size="sm"
                      variant="rounded"
                    />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/master/supported-content/edit/${item.id}`
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
