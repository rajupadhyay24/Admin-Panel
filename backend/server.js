const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const aboutUsEnterpriseRoutes = require("./routes/aboutUsEnterpriseRoutes");
const aboutUsBenefitsRoutes = require("./routes/aboutUsBenefitsRoutes")
const solutionCatRoutes = require("./routes/solutionCatRoutes");
const solutionSubCatRoutes = require("./routes/solutionSubCatRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/about", aboutRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/aboutusenterprise", aboutUsEnterpriseRoutes);
app.use("/api/aboutusbenefits", aboutUsBenefitsRoutes);
app.use("/api/solution-cat", solutionCatRoutes);
app.use("/api/solution-sub-cat", solutionSubCatRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
