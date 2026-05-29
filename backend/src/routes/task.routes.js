import express from "express";
import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { taskSchema } from "../validation/task.validation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const validated = taskSchema.parse(req.body);

    await db.insert(tasks).values({
      title: validated.title,
      description: validated.description,
    });

    res.json({ message: "Task created" });
  } catch (err) {
    return res.status(400).json({
      message: "Invalid input",
      error: err.errors || err,
    });
  }
});

router.get("/", async (req, res) => {
  const allTasks = await db.select().from(tasks);
  res.json(allTasks);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  await db.delete(tasks).where(eq(tasks.id, id));

  res.json({ message: "Task deleted" });
});

export default router;