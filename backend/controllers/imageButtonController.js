// controllers/imageButtonSectionController.js

const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

/* =============================== */
/* HELPER: Delete File */
/* =============================== */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  // filePathFromDb example:  /abc.png
  const fullPath = path.join(__dirname, "..", filePathFromDb);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* =============================== */
/* HELPER: Strip HTML */
/* =============================== */
const stripHtml = (html) => {
  if (!html || typeof html !== "string") return html;
  return html.replace(/<[^>]*>/g, "").trim();
};

/* =============================== */
/* GET ALL */
/* =============================== */
exports.getAll = async (req, res) => {
  try {
    const records = await prisma.image_button_section.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

/* =============================== */
/* GET ONE */
/* =============================== */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!record) return res.status(404).json({ message: "Not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

/* =============================== */
/* CREATE */
/* =============================== */
exports.create = async (req, res) => {
  try {
    const data = {
      heading: stripHtml(req.body.heading) ?? null,
      paragraph: stripHtml(req.body.paragraph) ?? null,
      image: req.file ? ` /${req.file.filename}` : null,
    };

    const created = await prisma.image_button_section.create({ data });

    res.status(201).json({
      message: "Created successfully",
      id: created.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create record" });
  }
};

/* =============================== */
/* UPDATE */
/* =============================== */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Not found" });

    let newImage = existing.image;

    // If new image uploaded
    if (req.file) {
      newImage = ` /${req.file.filename}`;
    }

    const data = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,
      paragraph: req.body.paragraph
        ? stripHtml(req.body.paragraph)
        : existing.paragraph,
      image: newImage,
    };

    const updated = await prisma.image_button_section.update({
      where: { id },
      data,
    });

    // Delete old image AFTER successful update
    if (req.file && existing.image) {
      deleteFile(existing.image);
    }

    res.json({
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
};

/* =============================== */
/* DELETE */
/* =============================== */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.image_button_section.findUnique({
      where: { id },
    });

    if (!existing) return res.status(404).json({ message: "Not found" });

    await prisma.image_button_section.delete({
      where: { id },
    });

    if (existing.image) {
      deleteFile(existing.image);
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
};
