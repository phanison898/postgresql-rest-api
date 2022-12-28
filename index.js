import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PG_PORT;

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to POSTGRESQL-API created using express.js");
});

app.listen(PORT, () => console.log(`POSTGRESQL REST API started running on PORT=${PORT}`));
