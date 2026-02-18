const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createSubCat,
  getAllSubCats,
  getSingleSubCat,
  updateSubCat,
  deleteSubCat,
} = require("../controllers/solutionSubCatController");

// =============================
// Multer Config
// =============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// =============================
// Routes
// =============================
router.post(
  "/",
  upload.fields([{ name: "image2", maxCount: 20 }]),
  createSubCat
);

router.put(
  "/:id",
  upload.fields([{ name: "image2", maxCount: 20 }]),
  updateSubCat
);

router.get("/", getAllSubCats);
router.get("/:id", getSingleSubCat);
router.delete("/:id", deleteSubCat);

module.exports = router;
