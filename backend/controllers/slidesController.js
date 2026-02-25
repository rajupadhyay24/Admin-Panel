// controllers/slidesController.js
const prisma = require("../config/prisma");

const fs = require("fs");
/* ================= GET ALL ================= */
const path = require("path"); // ✅ MUST include this

const Dir = path.join(__dirname, "../ "); // uploa

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const slides = await prisma.slides.findMany({
      orderBy: { id: "desc" },
    });

    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch slides" });
  }
};

/* ================= GET ONE ================= */
exports.getOne = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const slide = await prisma.slides.findUnique({
      where: { id },
    });

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    res.json(slide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch slide" });
  }
};

/* ================= CREATE ================= */
exports.create = async (req, res) => {
  try {
    const { title } = req.body;
    const media = req.file ? ` /${req.file.filename}` : null;

    const slide = await prisma.slides.create({
      data: {
        title: title || null,
        media,
      },
    });

    res.status(201).json({ message: "Slide Created", slide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create slide" });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body;

    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.slides.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ message: "Slide not found" });
    }

    let newMedia = existing.media;

    // Handle file upload
    if (req.file?.filename) {
      if (existing.media) {
        const oldPath = path.join(__dirname, "..", existing.media);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      newMedia = ` /${req.file.filename}`;
    }

    const updatedSlide = await prisma.slides.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        media: newMedia,
      },
    });

    res.json({ message: "Slide Updated", slide: updatedSlide });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update slide" });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const slide = await prisma.slides.findUnique({
      where: { id },
    });

    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }

    // Delete file from
    if (slide.media) {
      const filePath = path.join(__dirname, "..", slide.media);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await prisma.slides.delete({
      where: { id },
    });

    res.json({ message: "Slide Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete slide" });
  }
};
