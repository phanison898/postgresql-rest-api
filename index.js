import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import postsRoute from "./routes/postsRoute.js";

const PORT = process.env.PG_API_PORT;

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Default home page
app.get("/", async (req, res) => {
  try {
    res.send("Welcome to postgresql-rest-api");
  } catch (error) {
    console.error(error.message);
  }
});

// Post routes
app.use("/posts", postsRoute);

app.listen(PORT, () => console.log(`POSTGRESQL REST API started running on PORT=${PORT}`));
