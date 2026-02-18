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

export default function EmbeddedSection() {
    const navigate = useNavigate();

    const [data] = useState([
        {
            id: 1,
            title: "<b>Slide Title</b>",
            content: "<p>Slide Content</p>",
            image1: "https://via.placeholder.com/60",
            image2: "https://via.placeholder.com/60",
            image3: "https://via.placeholder.com/60",
            image4: "https://via.placeholder.com/60",
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
                        Embedded Page
                    </Typography>

                    <Button
                        color="white"
                        size="sm"
                        onClick={() =>
                            navigate("/dashboard/master/embedded-section/add")
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
                                    "Image 1",
                                    "Image 2",
                                    "Image 3",
                                    "Image 4",
                                    "Action",
                                ].map((head) => (
                                    <th
                                        key={head}
                                        className="border-b py-3 px-5 text-left"
                                    >
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

                                    {[1, 2, 3, 4].map((num) => (
                                        <td key={num} className="py-3 px-5 border-b">
                                            <Avatar
                                                src={item[`image${num}`]}
                                                size="sm"
                                                variant="rounded"
                                            />
                                        </td>
                                    ))}

                                    <td className="py-3 px-5 border-b">
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/master/embedded-section/edit/${item.id}`
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
