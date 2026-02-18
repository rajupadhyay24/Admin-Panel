import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Faq() {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: 1,
      question: "What is SkyIIoT?",
      description: "<p>SkyIIoT is an intelligent IoT platform...</p>",
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
            FAQ Section
          </Typography>

          <Button
            color="white"
            size="sm"
            onClick={() =>
              navigate("/dashboard/cms/faq/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody>
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Question", "Description", "Action"].map((head) => (
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
                    {item.question}
                  </td>

                  <td className="py-3 px-5 border-b">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/cms/faq/edit/${item.id}`
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
