const prisma = require("../config/prisma");
const fs = require("fs");
const path = require("path");

const stripHtml = (value) => {
  if (!value || typeof value !== "string") return value;
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
};

const buildImagePaths = (files) => {
  if (!files || files.length === 0) return null;

  const paths = files.map((file) => "uploads/" + file.filename);

  return JSON.stringify(paths);
};



const deleteImages = (imageString) => {

  if (!imageString) return;

  let imageArray = [];

  try {
    imageArray = JSON.parse(imageString);
  } catch {
    return;
  }

  imageArray.forEach((img) => {

    const fullPath = path.join(__dirname, "../", img);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

  });

};

exports.create = async (req, res) => {

  try {

    const files = req.files || [];

    const data = {

      solutionCatId: req.body.solutionCatId
        ? parseInt(req.body.solutionCatId)
        : null,

      para1: stripHtml(req.body.para1) || null,
      para2: stripHtml(req.body.para2) || null,
      para3: stripHtml(req.body.para3) || null,
      para4: stripHtml(req.body.para4) || null,
      para5: stripHtml(req.body.para5) || null,
      para6: stripHtml(req.body.para6) || null,

      image2: buildImagePaths(files),

    };

    const result = await prisma.solution_sub_categories.create({
      data,
    });

    res.status(201).json({
      message: "Created successfully",
      data: result,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Create failed" });

  }

};

exports.getAll = async (req, res) => {

  try {

    const data = await prisma.solution_sub_categories.findMany({

      include: {
        solution_cat: true,
      },

      orderBy: {
        id: "desc",
      },

    });

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Fetch failed" });

  }

};

exports.getOne = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const data = await prisma.solution_sub_categories.findUnique({

      where: { id },

      include: {
        solution_cat: true,
      },

    });

    if (!data) {

      return res.status(404).json({
        message: "Not found",
      });

    }

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Fetch failed" });

  }

};

exports.update = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const files = req.files || [];

    const existing = await prisma.solution_sub_categories.findUnique({
      where: { id },
    });

    if (!existing) {

      return res.status(404).json({
        message: "Not found",
      });

    }

    let image2 = existing.image2;

    if (files.length > 0) {

      deleteImages(existing.image2);

      image2 = buildImagePaths(files);

    }

    const updated = await prisma.solution_sub_categories.update({

      where: { id },

      data: {

        solutionCatId: req.body.solutionCatId
          ? parseInt(req.body.solutionCatId)
          : existing.solutionCatId,

        para1: req.body.para1 !== undefined
          ? stripHtml(req.body.para1)
          : existing.para1,

        para2: req.body.para2 !== undefined
          ? stripHtml(req.body.para2)
          : existing.para2,

        para3: req.body.para3 !== undefined
          ? stripHtml(req.body.para3)
          : existing.para3,

        para4: req.body.para4 !== undefined
          ? stripHtml(req.body.para4)
          : existing.para4,

        para5: req.body.para5 !== undefined
          ? stripHtml(req.body.para5)
          : existing.para5,

        para6: req.body.para6 !== undefined
          ? stripHtml(req.body.para6)
          : existing.para6,

        image2,

      },

    });

    res.json({
      message: "Updated successfully",
      data: updated,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Update failed" });

  }

};

exports.remove = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existing = await prisma.solution_sub_categories.findUnique({
      where: { id },
    });

    if (!existing) {

      return res.status(404).json({
        message: "Not found",
      });

    }

    deleteImages(existing.image2);

    await prisma.solution_sub_categories.delete({
      where: { id },
    });

    res.json({
      message: "Deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: "Delete failed" });

  }

};