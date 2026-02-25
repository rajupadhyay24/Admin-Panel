const prisma = require("../config/prisma");

/* ======================= */
/* HELPER: STRIP HTML */
/* ======================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* ======================= */
/* GET ALL */
/* ======================= */
exports.getAll = async (req, res) => {
  try {
    const data = await prisma.ai_powered.findMany({
      orderBy: { id: "desc" },
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ======================= */
/* GET ONE */
/* ======================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ======================= */
/* CREATE */
/* ======================= */
exports.create = async (req, res) => {
  try {
    const { heading1, heading2, heading3, paragraph1, paragraph2 } = req.body;

    const cleanHeading1 = stripHtml(heading1);
    const cleanHeading2 = stripHtml(heading2);
    const cleanHeading3 = stripHtml(heading3);
    const cleanParagraph1 = stripHtml(paragraph1);
    const cleanParagraph2 = stripHtml(paragraph2);

    if (!cleanHeading1 || !cleanParagraph1) {
      return res
        .status(400)
        .json({ message: "Heading1 and Paragraph1 are required" });
    }

    const media = req.file ? ` /${req.file.filename}` : null;

    await prisma.ai_powered.create({
      data: {
        heading1: cleanHeading1,
        heading2: cleanHeading2,
        heading3: cleanHeading3,
        paragraph1: cleanParagraph1,
        paragraph2: cleanParagraph2,
        media,
      },
    });

    res.json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* ======================= */
/* UPDATE */
/* ======================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    const cleanHeading1 = stripHtml(req.body.heading1);
    const cleanHeading2 = stripHtml(req.body.heading2);
    const cleanHeading3 = stripHtml(req.body.heading3);
    const cleanParagraph1 = stripHtml(req.body.paragraph1);
    const cleanParagraph2 = stripHtml(req.body.paragraph2);

    const media = req.file ? ` /${req.file.filename}` : existing.media;

    await prisma.ai_powered.update({
      where: { id },
      data: {
        heading1: cleanHeading1 ?? existing.heading1,
        heading2: cleanHeading2 ?? existing.heading2,
        heading3: cleanHeading3 ?? existing.heading3,
        paragraph1: cleanParagraph1 ?? existing.paragraph1,
        paragraph2: cleanParagraph2 ?? existing.paragraph2,
        media,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* ======================= */
/* DELETE */
/* ======================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.ai_powered.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Record not found" });
    }

    await prisma.ai_powered.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
