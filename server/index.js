const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const paymentRoutes = require("./routes/payment.route");
const paypalRoutes = require("./routes/paypal.route");
const articleRoutes = require("./routes/article.route");
const imageRoutes = require("./routes/image.route");
const managementRoutes = require("./routes/management.route");
const donationRoutes = require("./routes/donation.route");
const adminRoutes = require("./routes/admin.route");
const cookieParser = require("cookie-parser");
const MongoDB = require("./utils/mongodb.util");
const decodeToken = require("./middleware/decodeToken");

const app = express();

const cors = require("cors");
const passport = require("passport");

//connect mongodb
MongoDB.connect(process.env.MONGODB_URI);

app.use(express.static("client"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport.js");
app.use(cookieParser());

app.get("/server-status", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/payment", paymentRoutes);
app.use("/paypal", paypalRoutes);
app.use("/article", articleRoutes);
app.use("/image", imageRoutes);
app.use("/manage", managementRoutes);
app.use("/donation", donationRoutes);
app.use("/admin", adminRoutes);

//start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
