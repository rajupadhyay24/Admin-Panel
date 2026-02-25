const prisma = require("../config/prisma");

/* =============================== */
/* HELPER: Strip HTML */
/* =============================== */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

// ================= GET ALL =================
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.managementsection.findMany({
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
    const record = await prisma.managementsection.findUnique({
      where: { id: parseInt(id) },
    });
    if (!record) return res.status(404).json({ message: "Not found" });
    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// ================= CREATE =================
exports.create = async (req, res) => {
  try {
    const files = req.files || {};

    const buildImagePath = (fileArray) =>
      fileArray?.[0] ? ` /${fileArray[0].filename}` : null;

    const data = {
      heading: stripHtml(req.body.heading) ?? null,
      paragraph1: stripHtml(req.body.paragraph1) ?? null,
      paragraph2: stripHtml(req.body.paragraph2) ?? null,
      image1: buildImagePath(files.image1),
      image2: buildImagePath(files.image2),
      image3: buildImagePath(files.image3),
      image4: buildImagePath(files.image4),
    };

    await prisma.managementsection.create({ data });
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
    const files = req.files || {};

    const existing = await prisma.managementsection.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) return res.status(404).json({ message: "Not found" });

    const buildImagePath = (fileArray, existingImage) =>
      fileArray?.[0] ? ` /${fileArray[0].filename}` : existingImage;

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
      image1: buildImagePath(files.image1, existing.image1),
      image2: buildImagePath(files.image2, existing.image2),
      image3: buildImagePath(files.image3, existing.image3),
      image4: buildImagePath(files.image4, existing.image4),
    };

    await prisma.managementsection.update({
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
    const existing = await prisma.managementsection.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existing) return res.status(404).json({ message: "Not found" });

    await prisma.managementsection.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
