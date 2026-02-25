const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const Dir = path.join(__dirname, "../ ");

/* STRIP HTML */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  const clean = value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length ? clean : null;
};

/* DELETE FILE */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  const filename = filePathFromDb.replace(" /", "");
  const fullPath = path.join(Dir, filename);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.our_team.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.our_team.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const file = req.files?.image?.[0];

    const data = {
      heading: stripHtml(req.body.heading),
      paragraph: stripHtml(req.body.paragraph),
      image: file ? ` /${file.filename}` : null,
    };

    const created = await prisma.our_team.create({ data });

    res.status(201).json({ message: "Created", id: created.id });
  } catch (error) {
    res.status(500).json({ error: "Create failed" });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Not found" });

    const file = req.files?.image?.[0];

    let updatedData = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,
      paragraph: req.body.paragraph
        ? stripHtml(req.body.paragraph)
        : existing.paragraph,
      image: existing.image,
    };

    if (file) {
      deleteFile(existing.image);
      updatedData.image = ` /${file.filename}`;
    }

    const updated = await prisma.our_team.update({
      where: { id },
      data: updatedData,
    });

    res.json({ message: "Updated", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Not found" });

    deleteFile(existing.image);

    await prisma.our_team.delete({ where: { id } });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};
