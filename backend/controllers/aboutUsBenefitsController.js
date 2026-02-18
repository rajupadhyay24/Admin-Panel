const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query(
    "SELECT * FROM aboutusbenefits ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getOne = (req, res) => {
  db.query(
    "SELECT * FROM aboutusbenefits WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

exports.create = (req, res) => {
  const data = req.body;
  const image1 = req.files?.image1?.[0]?.filename || null;
  const image2 = req.files?.image2?.[0]?.filename || null;

  const query = `
    INSERT INTO aboutusbenefits 
    (${[...Array(8)].map((_,i)=>`heading${i+1}`).join(",")},
     ${[...Array(4)].map((_,i)=>`paragraph${i+1}`).join(",")},
     image1,image2)
    VALUES (${Array(14).fill("?").join(",")})
  `;

  const values = [
    ...[...Array(8)].map((_,i)=>data[`heading${i+1}`]),
    ...[...Array(4)].map((_,i)=>data[`paragraph${i+1}`]),
    image1,
    image2,
  ];

  db.query(query, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Created Successfully" });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const image1 = req.files?.image1?.[0]?.filename;
  const image2 = req.files?.image2?.[0]?.filename;

  let fields = [];
  let values = [];

  for (let i = 1; i <= 8; i++) {
    fields.push(`heading${i}=?`);
    values.push(data[`heading${i}`]);
  }

  for (let i = 1; i <= 4; i++) {
    fields.push(`paragraph${i}=?`);
    values.push(data[`paragraph${i}`]);
  }

  fields.push(`image1=COALESCE(?, image1)`);
  fields.push(`image2=COALESCE(?, image2)`);

  values.push(image1);
  values.push(image2);
  values.push(id);

  db.query(
    `UPDATE aboutusbenefits SET ${fields.join(",")} WHERE id=?`,
    values,
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated Successfully" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM aboutusbenefits WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted Successfully" });
    }
  );
};
