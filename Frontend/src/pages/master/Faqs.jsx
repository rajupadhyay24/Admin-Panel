import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Faqs() {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: 1,
      title: "<b>What is your service about?</b>",
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
              navigate("/dashboard/master/faqs/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody>
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Title", "Action"].map((head) => (
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.title,
                      }}
                    />
                  </td>

                  <td className="py-3 px-5 border-b">
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/master/faqs/edit/${item.id}`
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
