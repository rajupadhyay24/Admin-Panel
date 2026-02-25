const prisma = require("../config/prisma");

/* =============================== */
/* HELPER: Strip HTML */
/* =============================== */
const stripHtml = (html) => {
  if (!html || typeof html !== "string") return html;
  return html.replace(/<[^>]*>/g, "").trim();
};

// ===============================
// GET ALL
// ===============================
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.networksection.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// ===============================
// GET ONE
// ===============================
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await prisma.networksection.findUnique({
      where: { id: parseInt(id) },
    });

    if (!record) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ===============================
// CREATE
// ===============================
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const data = {
      heading: stripHtml(req.body.heading) ?? null,
      paragraph1: stripHtml(req.body.paragraph1) ?? null,
      paragraph2: stripHtml(req.body.paragraph2) ?? null,
      image1: files.image1?.[0] ? ` /${files.image1[0].filename}` : null,
      image2: files.image2?.[0] ? ` /${files.image2[0].filename}` : null,
      image3: files.image3?.[0] ? ` /${files.image3[0].filename}` : null,
      image4: files.image4?.[0] ? ` /${files.image4[0].filename}` : null,
    };

    await prisma.networksection.create({ data });

    res.json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

// ===============================
// UPDATE
// ===============================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files || {};

    const existing = await prisma.networksection.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    const data = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,

      paragraph1: req.body.paragraph1
        ? stripHtml(req.body.paragraph1)
        : existing.paragraph1,

      paragraph2: req.body.paragraph2
        ? stripHtml(req.body.paragraph2)
        : existing.paragraph2,

      // 👇 Important logic
      image1: files.image1?.[0]
        ? ` /${files.image1[0].filename}`
        : existing.image1,

      image2: files.image2?.[0]
        ? ` /${files.image2[0].filename}`
        : existing.image2,

      image3: files.image3?.[0]
        ? ` /${files.image3[0].filename}`
        : existing.image3,

      image4: files.image4?.[0]
        ? ` /${files.image4[0].filename}`
        : existing.image4,
    };

    await prisma.networksection.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// ===============================
// DELETE
// ===============================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.networksection.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    await prisma.networksection.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};
