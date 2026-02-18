const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query(
    "SELECT * FROM aboutusenterprise ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getOne = (req, res) => {
  db.query(
    "SELECT * FROM aboutusenterprise WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

exports.create = (req, res) => {
  const { heading, paragraph } = req.body;
  const image1 = req.files?.image1?.[0]?.filename || null;
  const image2 = req.files?.image2?.[0]?.filename || null;

  db.query(
    "INSERT INTO aboutusenterprise (heading, paragraph, image1, image2) VALUES (?, ?, ?, ?)",
    [heading, paragraph, image1, image2],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Created Successfully" });
    }
  );
};

exports.update = (req, res) => {
  const { heading, paragraph } = req.body;
  const { id } = req.params;

  const image1 = req.files?.image1?.[0]?.filename;
  const image2 = req.files?.image2?.[0]?.filename;

  db.query(
    `UPDATE aboutusenterprise 
     SET heading=?, paragraph=?, 
     image1=COALESCE(?, image1), 
     image2=COALESCE(?, image2) 
     WHERE id=?`,
    [heading, paragraph, image1, image2, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated Successfully" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM aboutusenterprise WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted Successfully" });
    }
  );
};
