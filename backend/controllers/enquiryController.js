const prisma = require("../config/prisma");

/* =============================== */
/* CREATE ENQUIRY */
/* =============================== */
exports.create = (req, res) => {

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    message: req.body.message
  };

  prisma.enquiry.create({ data })
    .then((result) => {
      res.status(201).json({
        message: "Enquiry submitted successfully",
        data: result
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to submit enquiry"
      });
    });

};