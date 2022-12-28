import pg from "pg";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const { Pool } = pg;
const PORT = process.env.PG_PORT;

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.send("Welcome to postgresql-rest-api");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const data = await conn.query("SELECT * FROM todo");
    res.send(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const data = await conn.query("SELECT * FROM todo WHERE id=$1", [req.params.id]);
    res.send(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/post", async (req, res) => {
  try {
    const data = await conn.query("INSERT INTO todo(description) VALUES ($1) RETURNING *", [
      req.body.description,
    ]);
    res.send(data.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.patch("/post/:id", async (req, res) => {
  try {
    const data = await conn.query("UPDATE todo SET description=$1 WHERE id=$2 RETURNING *", [
      req.body.description,
      req.params.id,
    ]);
    res.send(data.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await conn.query("DELETE FROM todo WHERE id=$1", [req.params.id]);
    res.send(`Post[id=${id}] deleted successfully`);
  } catch (error) {
    console.error(error.message);
  }
});

// Database connection
const conn = new Pool({
  host: "localhost",
  port: "5432",
  user: "postgres",
  password: "example",
  database: "todos",
});

app.listen(PORT, () => console.log(`POSTGRESQL REST API started running on PORT=${PORT}`));
