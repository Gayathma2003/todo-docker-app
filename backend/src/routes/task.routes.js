import express from "express";
import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description } = req.body;

  await db.insert(tasks).values({
    title,
    description,
  });

  res.json({ message: "Task created" });
});

router.get("/", async (req, res) => {
  const allTasks = await db.select().from(tasks);
  res.json(allTasks);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await db.delete(tasks).where(eq(tasks.id, id));

  res.json({ message: "Task deleted" });
});

export default router;