const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM about_us", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getOne = (req, res) => {
  db.query(
    "SELECT * FROM about_us WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

exports.create = (req, res) => {
  const { title, heading, paragraph } = req.body;

  const image1 =
    req.files?.image1?.[0]?.filename || null;
  const image2 =
    req.files?.image2?.[0]?.filename || null;

  const sql = `
    INSERT INTO about_us 
    (title, heading, paragraph, image1, image2)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, heading, paragraph, image1, image2],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Created Successfully" });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { title, heading, paragraph } = req.body;

  const image1 =
    req.files?.image1?.[0]?.filename || null;
  const image2 =
    req.files?.image2?.[0]?.filename || null;

  const sql = `
    UPDATE about_us SET
      title = ?,
      heading = ?,
      paragraph = ?,
      image1 = COALESCE(?, image1),
      image2 = COALESCE(?, image2)
    WHERE id = ?
  `;

  db.query(
    sql,
    [title, heading, paragraph, image1, image2, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated Successfully" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM about_us WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted Successfully" });
    }
  );
};
