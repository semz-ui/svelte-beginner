const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connect.db");
const userRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// If you expect URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/todo", postRoutes);

app.listen(port, () => console.log(`App listening on port ` + port));
