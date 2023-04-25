import Express from "express";
const app = Express();
import GetTKBroutes from "./routes/GetTKBroutes.js";

import cors from "cors";
import bodyParser from "body-parser";

// const cors = require("cors");
// app.use(cors({ origin: "http://127.0.0.1:5173", optionsSuccessStatus: 200 }));
app.use(cors())

app.use(Express.json());

// const bodyParser = require("body-parser");

// const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", GetTKBroutes);

app.listen(8080, () => {
  console.log("Working");
});
