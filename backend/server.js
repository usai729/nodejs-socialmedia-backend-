/*
socket.io can be used for real-time messaging
*/

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();

const dbconn = require("./Config/db");
const AuthRoute = require("./Routes/AuthRoute");
const PostRoute = require("./Routes/PostRoute");
const ActionsRoute = require("./Routes/Actions");

const { body } = require("express-validator");

const app = express();
app.use(express.json({ limit: "30mb" }));const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();

const dbconn = require("./Config/db");
const AuthRoute = require("./Routes/AuthRoute");
const PostRoute = require("./Routes/PostRoute");
const ActionsRoute = require("./Routes/Actions");
const MessagesRoute = require("./Routes/MessagesRoute");

const { body } = require("express-validator");

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.use("/api/auth", AuthRoute);
app.use("/api/post", PostRoute);
app.use("/api/action", ActionsRoute);
app.use("/api/message", MessagesRoute);

app.listen(port, () => {
  console.log(`Listning to port ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.use("/api/auth", AuthRoute);
app.use("/api/post/", PostRoute);
app.use("/api/action", ActionsRoute);

app.listen(port, () => {
  console.log(`Listning to port ${port}`);
});
