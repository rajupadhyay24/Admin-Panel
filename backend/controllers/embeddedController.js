const prisma = require("../config/prisma");

const stripHtml = (html) => {
  if (!html || typeof html !== "string") return html;
  return html.replace(/<[^>]*>/g, "").trim();
};

// ================= GET ALL =================
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.embedded.findMany({
      orderBy: { id: "desc" },
    });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ================= GET ONE =================
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await prisma.embedded.findUnique({
      where: { id: parseInt(id) },
    });

    if (!record) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ================= CREATE =================
exports.create = async (req, res) => {
  try {
    const { heading, paragraph1, paragraph2 } = req.body;
    const files = req.files || {};

    const data = {
      heading: stripHtml(heading) ?? null,
      paragraph1: stripHtml(paragraph1) ?? null,
      paragraph2: stripHtml(paragraph2) ?? null,
      image1: files.image1?.[0] ? ` /${files.image1[0].filename}` : null,
      image2: files.image2?.[0] ? ` /${files.image2[0].filename}` : null,
      image3: files.image3?.[0] ? ` /${files.image3[0].filename}` : null,
      image4: files.image4?.[0] ? ` /${files.image4[0].filename}` : null,
      video: files.video?.[0] ? ` /${files.video[0].filename}` : null,
    };

    await prisma.embedded.create({ data });

    res.json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

// ================= UPDATE =================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraph1, paragraph2 } = req.body;
    const files = req.files || {};

    const data = {
      heading: heading ? stripHtml(heading) : undefined,
      paragraph1: paragraph1 ? stripHtml(paragraph1) : undefined,
      paragraph2: paragraph2 ? stripHtml(paragraph2) : undefined,
    };

    if (files.image1?.[0]) data.image1 = ` /${files.image1[0].filename}`;
    if (files.image2?.[0]) data.image2 = ` /${files.image2[0].filename}`;
    if (files.image3?.[0]) data.image3 = ` /${files.image3[0].filename}`;
    if (files.image4?.[0]) data.image4 = ` /${files.image4[0].filename}`;
    if (files.video?.[0]) data.video = ` /${files.video[0].filename}`;

    await prisma.embedded.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ================= DELETE =================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.embedded.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
