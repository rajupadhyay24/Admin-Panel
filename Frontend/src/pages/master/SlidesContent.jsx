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

export default function SlidesContent() {
  const navigate = useNavigate();

  // ✅ Dummy Data (Based on Form Fields)
  const [slides] = useState([
    {
      id: 1,
      title: "<b>Welcome To Our Platform</b>",
      media:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      type: "image",
    },
    {
      id: 2,
      title: "<i>Learn Modern Development</i>",
      media:
        "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video",
    },
    {
      id: 3,
      title: "Build Your Career With Us",
      media:
        "https://images.unsplash.com/photo-1508780709619-79562169bc64",
      type: "image",
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
            Slides Content
          </Typography>

          <Button
            color="white"
            size="sm"
            onClick={() => navigate("/dashboard/master/slides-content/add")}
          >
            + Add Slide
          </Button>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">

            <thead>
              <tr>
                {["Title", "Media", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {slides.map((slide, key) => {
                const className = `py-3 px-5 ${key === slides.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr key={slide.id}>

                    {/* Title */}
                    <td className={className}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: slide.title,
                        }}
                      />
                    </td>

                    {/* Media */}
                    <td className={className}>
                      {slide.type === "video" ? (
                        <video
                          src={slide.media}
                          className="h-14 w-24 object-cover rounded"
                        />
                      ) : (
                        <Avatar
                          src={slide.media}
                          size="md"
                          variant="rounded"
                        />
                      )}
                    </td>

                    {/* Action */}
                    <td className={className}>
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/dashboard/master/slides-content/edit/${slide.id}`)
                        }
                      >
                        Edit
                      </Button>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </CardBody>
      </Card>

    </div>
  );
}
