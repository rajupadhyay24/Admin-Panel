import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Testimonial() {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: 1,
      title: "<b>Testimonial Title</b>",
      content: "<p>Client testimonial content here...</p>",
      image1: "https://picsum.photos/60?21",
      image2: "https://picsum.photos/60?22",
      image3: "https://picsum.photos/60?23",
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
            Testimonial Section
          </Typography>

          <Button
            color="white"
            size="sm"
            onClick={() =>
              navigate("/dashboard/cms/testimonial/add")
            }
          >
            Add
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-auto">
          <table className="w-full min-w-[1100px] table-auto">
            <thead>
              <tr>
                {[
                  "Title",
                  "Content",
                  "Image1",
                  "Image2",
                  "Image3",
                  "Action",
                ].map((head) => (
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

                  {[1, 2, 3].map((num) => (
                    <td key={num} className="py-3 px-5 border-b">
                      <img
                        src={item[`image${num}`]}
                        alt={`Testimonial ${num}`}
                        className="h-12 w-12 object-cover rounded-lg"
                      />
                    </td>
                  ))}

                  <td className="py-3 px-5 border-b">
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `/dashboard/cms/testimonial/edit/${item.id}`
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
