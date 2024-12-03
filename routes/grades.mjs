import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("grades");

  let results = await collection.find({}).limit(50).toArray();

  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query;
  try {
    query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("nof found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    res.send("not an id").status(400);
  }
});

export default router;
