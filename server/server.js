require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const taskRoutes = require("./routes/task");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
