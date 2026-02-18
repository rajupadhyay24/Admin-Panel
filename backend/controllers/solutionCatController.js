const db = require("../config/db");

// CREATE
exports.createSolutionCat = (req, res) => {
  const { title } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !image) {
    return res.status(400).json({ message: "Title and Image required" });
  }

  const sql = "INSERT INTO solution_cat (title, image) VALUES (?, ?)";

  db.query(sql, [title, image], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      id: result.insertId,
      title,
      image,
    });
  });
};

// GET ALL
exports.getAllSolutionCat = (req, res) => {
  db.query("SELECT * FROM solution_cat ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

// GET SINGLE
exports.getSingleSolutionCat = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM solution_cat WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// UPDATE
exports.updateSolutionCat = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (image) {
    sql =
      "UPDATE solution_cat SET title = ?, image = ? WHERE id = ?";
    values = [title, image, id];
  } else {
    sql =
      "UPDATE solution_cat SET title = ? WHERE id = ?";
    values = [title, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated successfully" });
  });
};

// DELETE
exports.deleteSolutionCat = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM solution_cat WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted successfully" });
    }
  );
};
