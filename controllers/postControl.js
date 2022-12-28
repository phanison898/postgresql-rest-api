import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const conn = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_DB_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PSWD,
  database: process.env.PG_DB,
});

// GET all posts
export const getPosts = async (req, res) => {
  try {
    const returnedData = await conn.query("SELECT * FROM todo");
    res.status(200).send(returnedData.rows);
  } catch (error) {
    console.error(error.message);
  }
};

// GET post by id
export const getPostById = async (req, res) => {
  const id = req.params?.id;
  try {
    const returnedData = await conn.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.status(200).send(returnedData.rows);
  } catch (error) {
    console.error(error.message);
  }
};

// CREATE/UPLOAD post
export const uploadPost = async (req, res) => {
  const { description } = req.body;
  try {
    await conn.query("INSERT INTO todo(description) VALUES($1) RETURNING *", [description]);
    res.status(200).send({ message: "Data uploaded to database successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

// UPDATE post by id
export const updatePost = async (req, res) => {
  const id = req.params?.id;
  const { description } = req?.body;
  try {
    await conn.query("UPDATE todo SET description=$1 WHERE id=$2  RETURNING *", [description, id]);
    res.status(200).send({ message: "Data updated successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  const id = req.params?.id;
  try {
    await conn.query("DELETE FROM todo WHERE id=$1", [id]);
    res.status(200).send(`Post [id:${id}] deleted successfully`);
  } catch (error) {
    console.error(error.message);
  }
};
