const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// =============================
// CREATE
// =============================
exports.createSubCat = (req, res) => {
  const { solutionCatId, para1, para2 } = req.body;
  console.log("🔥 CREATE SUB CATEGORY API HIT");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  if (!solutionCatId) {
    return res.status(400).json({
      message: "Solution Category required",
    });
  }

  const imageFiles = req.files?.image2 || [];
  const images = imageFiles.map(file => file.filename);

  const sql = `
    INSERT INTO solution_sub_categories
    (solutionCatId, para1, para2, image2)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [solutionCatId, para1, para2, JSON.stringify(images)],
    (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Inserted Successfully",
      });
    }
  );
};

// =============================
// GET ALL (JOIN WITH solution_cat)
// =============================
exports.getAllSubCats = (req, res) => {
  const sql = `
    SELECT 
      ssc.id,
      ssc.solutionCatId,
      ssc.para1,
      ssc.para2,
      ssc.image2,
      sc.title,
      sc.image
    FROM solution_sub_categories ssc
    JOIN solution_cat sc
      ON ssc.solutionCatId = sc.id
    ORDER BY ssc.id DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log("GET ALL ERROR:", err);
      return res.status(500).json(err);
    }

    rows.forEach((row) => {
      try {
        row.image2 = row.image2 ? JSON.parse(row.image2) : [];
      } catch {
        row.image2 = [];
      }
    });

    res.json(rows);
  });
};

// =============================
// GET SINGLE
// =============================
exports.getSingleSubCat = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT *
    FROM solution_sub_categories
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("GET SINGLE ERROR:", err);
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Not Found" });
    }

    const data = result[0];

    try {
      data.image2 = data.image2 ? JSON.parse(data.image2) : [];
    } catch {
      data.image2 = [];
    }

    res.json(data);
  });
};

// =============================
// UPDATE (ONLY para1, para2, image2)
// =============================
exports.updateSubCat = (req, res) => {
  const { solutionCatId, para1, para2 } = req.body;

  let newImages = req.files?.image2
    ? req.files.image2.map(file => file.filename)
    : null;

  // First get existing images
  db.query(
    "SELECT image2 FROM solution_sub_categories WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      const existingImages = rows[0]?.image2
        ? JSON.parse(rows[0].image2)
        : [];

      const finalImages = newImages
        ? [...existingImages, ...newImages]
        : existingImages;

      const sql = `
        UPDATE solution_sub_categories 
        SET solutionCatId = ?, para1 = ?, para2 = ?, image2 = ?
        WHERE id = ?
      `;

      db.query(
        sql,
        [
          solutionCatId,
          para1,
          para2,
          JSON.stringify(finalImages),
          req.params.id
        ],
        (err, result) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Updated successfully" });
        }
      );
    }
  );
};

// =============================
// DELETE
// =============================
exports.deleteSubCat = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT image2 FROM solution_sub_categories WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      let images = [];

      if (result.length > 0 && result[0].image2) {
        try {
          images = JSON.parse(result[0].image2);
        } catch {
          images = [];
        }
      }

      images.forEach((img) => {
        const filePath = path.join(
          __dirname,
          "../uploads",
          img
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      db.query(
        "DELETE FROM solution_sub_categories WHERE id = ?",
        [id],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "Deleted Successfully" });
        }
      );
    }
  );
};
