const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const aboutUsEnterpriseRoutes = require("./routes/aboutUsEnterpriseRoutes");
const aboutUsBenefitsRoutes = require("./routes/aboutUsBenefitsRoutes")
const solutionCatRoutes = require("./routes/solutionCatRoutes");
const solutionSubCatRoutes = require("./routes/solutionSubCatRoutes");
const slidesRoutes = require("./routes/slidesRoutes");
const whatSectionRoutes = require("./routes/whatSectionRoutes");
const imageButton = require("./routes/imageButton")
const embeddedRoutes = require("./routes/embeddedRoutes");
const networkSectionRoutes = require("./routes/networkSectionRoutes");
const cloudSectionRoutes = require("./routes/cloudSectionRoutes");
const managementSectionRoutes = require("./routes/managementSectionRoutes");


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
app.use("/api/what-section" , whatSectionRoutes);


app.use("/api/embeddedsection" , embeddedRoutes);

app.use("/api/networksection" , networkSectionRoutes);

app.use("/api/cloudsection" , cloudSectionRoutes);

app.use("/api/managementsection" , managementSectionRoutes);


app.use("/api/supported-content" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);
app.use("/api/slides" , slidesRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
