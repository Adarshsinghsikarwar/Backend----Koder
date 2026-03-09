// server create krna
// server ko config karna

import express from "express";
import morgan from "morgan";
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note created successfully",
  });
});
app.get("/notes", async (req, res) => {
//   const notes = await noteModel.find();
const notes = await noteModel.find({
    title:"Test1"
})
  res.status(200).json({
    notes,
    message: "Note fetched successfully",
  });
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Deleted note successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Note updated successfully",
  });
});

export default app;
