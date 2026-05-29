import request from "supertest";
import app from "../src/app.js";

describe("Task API", () => {

  it("GET /tasks should return 200", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /tasks should create task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "Test Description"
      });

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /tasks should work", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Temp Task",
        description: "Temp Desc"
      });

    const taskId = res.body?.id;

    if (taskId) {
      const delRes = await request(app).delete(`/tasks/${taskId}`);
      expect(delRes.statusCode).toBe(200);
    }
  });

});