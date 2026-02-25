// controllers/solutionImageController.js

const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

// ================= CREATE =================
exports.createSolutionImage = (req, res) => {
  const { title } = req.body;
  const files = req.files || {};

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  prisma.solution_images
    .create({
      data: {
        title: title,
        image1: files.image1?.[0] ? ` /${files.image1[0].filename}` : null,
        image2: files.image2?.[0] ? ` /${files.image2[0].filename}` : null,
        image3: files.image3?.[0] ? ` /${files.image3[0].filename}` : null,
        image4: files.image4?.[0] ? ` /${files.image4[0].filename}` : null,
      },
    })
    .then((newRecord) => {
      res.status(201).json({
        id: newRecord.id,
        message: "Created Successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// ================= GET ALL =================
exports.getAllSolutionImages = (req, res) => {
  prisma.solution_images
    .findMany({
      orderBy: { id: "desc" },
    })
    .then((records) => {
      res.json(records);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// ================= GET SINGLE =================
exports.getSingleSolutionImage = (req, res) => {
  const id = parseInt(req.params.id);

  prisma.solution_images
    .findUnique({
      where: { id: id },
    })
    .then((record) => {
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
      res.json(record);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// ================= UPDATE =================
exports.updateSolutionImage = (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const files = req.files || {};

  prisma.solution_images
    .findUnique({
      where: { id: id },
    })
    .then((existing) => {
      if (!existing) {
        return res.status(404).json({ message: "Record not found" });
      }

      const image1 = files.image1?.[0]
        ? ` /${files.image1[0].filename}`
        : existing.image1;

      const image2 = files.image2?.[0]
        ? ` /${files.image2[0].filename}`
        : existing.image2;

      const image3 = files.image3?.[0]
        ? ` /${files.image3[0].filename}`
        : existing.image3;

      const image4 = files.image4?.[0]
        ? ` /${files.image4[0].filename}`
        : existing.image4;

      return prisma.solution_images.update({
        where: { id: id },
        data: {
          title: title || existing.title,
          image1,
          image2,
          image3,
          image4,
        },
      });
    })
    .then(() => {
      res.json({ message: "Updated Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// ================= DELETE =================
exports.deleteSolutionImage = (req, res) => {
  const id = parseInt(req.params.id);

  prisma.solution_images
    .findUnique({
      where: { id: id },
    })
    .then((existing) => {
      if (!existing) {
        return res.status(404).json({ message: "Record not found" });
      }

      // Delete images from folder
      [existing.image1, existing.image2, existing.image3, existing.image4]
        .filter(Boolean)
        .forEach((imgPath) => {
          const filePath = path.join(__dirname, "..", imgPath);

          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.error("File delete error:", err.message);
            }
          }
        });

      return prisma.solution_images.delete({
        where: { id: id },
      });
    })
    .then(() => {
      res.json({ message: "Deleted Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
