// controllers/testimonialController.js
const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const Dir = path.join(__dirname, "../ ");

/* ======================= */
/* HELPER: STRIP HTML */
/* ======================= */
const stripHtml = (value) => {
  if (!value || typeof value !== "string") return null;

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/* ======================= */
/* HELPER: Delete File */
/* ======================= */
const deleteFile = (filePathFromDb) => {
  if (!filePathFromDb) return;

  // Remove " /" from DB path
  const filename = filePathFromDb.replace(" /", "");
  const fullPath = path.join(Dir, filename);

  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("Error deleting file:", err.message);
    }
  }
};

/* ================= CREATE ================= */
exports.createTestimonial = async (req, res) => {
  try {
    const files = req.files || {};

    if (!req.body.heading)
      return res.status(400).json({ message: "Heading is required" });

    const created = await prisma.testimonials.create({
      data: {
        heading: stripHtml(req.body.heading),
        para1: stripHtml(req.body.para1),
        para2: stripHtml(req.body.para2),

        image1: files.image1?.[0] ? ` /${files.image1[0].filename}` : null,
        image2: files.image2?.[0] ? ` /${files.image2[0].filename}` : null,
        image3: files.image3?.[0] ? ` /${files.image3[0].filename}` : null,
      },
    });

    res.status(201).json({ id: created.id, message: "Created Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create testimonial" });
  }
};

/* ================= GET ALL ================= */
exports.getAllTestimonials = async (req, res) => {
  try {
    const records = await prisma.testimonials.findMany({
      orderBy: { id: "desc" },
    });

    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

/* ================= GET SINGLE ================= */
exports.getSingleTestimonial = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const record = await prisma.testimonials.findUnique({ where: { id } });
    if (!record) return res.status(404).json({ message: "Record not found" });

    res.json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
};

/* ================= UPDATE ================= */
exports.updateTestimonial = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const files = req.files || {};

    const existing = await prisma.testimonials.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Record not found" });

    const data = {
      heading: req.body.heading
        ? stripHtml(req.body.heading)
        : existing.heading,
      para1: req.body.para1 ? stripHtml(req.body.para1) : existing.para1,
      para2: req.body.para2 ? stripHtml(req.body.para2) : existing.para2,

      image1: existing.image1,
      image2: existing.image2,
      image3: existing.image3,
    };

    ["image1", "image2", "image3"].forEach((img) => {
      if (files[img]?.[0]) {
        deleteFile(existing[img]); // delete old image
        data[img] = ` /${files[img][0].filename}`;
      }
    });

    const updated = await prisma.testimonials.update({
      where: { id },
      data,
    });

    res.json({ message: "Updated Successfully", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

/* ================= DELETE ================= */
exports.deleteTestimonial = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existing = await prisma.testimonials.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Record not found" });

    ["image1", "image2", "image3"].forEach((img) => deleteFile(existing[img]));

    await prisma.testimonials.delete({ where: { id } });

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};
