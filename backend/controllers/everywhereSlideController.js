const prisma = require("../config/prisma");

/* =============================== */
/* HELPER: STRIP HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = async (req, res) => {
  try {
    const file = req.file;

    await prisma.everywhere_slide.create({
      data: {
        heading: stripHtml(req.body.heading) ?? null,
        paragraph: stripHtml(req.body.paragraph) ?? null,
        image: file ? ` /${file.filename}` : null,
      },
    });

    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.everywhere_slide.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* =============================== */
/* GET BY ID */
/* =============================== */
exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const record = await prisma.everywhere_slide.findUnique({
      where: { id },
    });

    if (!record) return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const file = req.file;

    const existing = await prisma.everywhere_slide.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Not found" });

    await prisma.everywhere_slide.update({
      where: { id },
      data: {
        heading: req.body.heading
          ? stripHtml(req.body.heading)
          : existing.heading,

        paragraph: req.body.paragraph
          ? stripHtml(req.body.paragraph)
          : existing.paragraph,

        image: file ? ` /${file.filename}` : existing.image,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.everywhere_slide.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};
