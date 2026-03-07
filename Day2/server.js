import express from "express";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(morgan("dev")); // this is a logger

const notes = [];
app.post("/notes", (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json({
    note,
    message: "Note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "notes fetched successfully",
    notes,
  });
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  //notes.remove(id);
  delete notes[id];
  console.log(notes);
  res.status(200).json({
    message: "Note deleted successfully",
  });
});

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
 console.log(description)
  notes[id].description = description;
  res.status(200).json({
    message: "Note updated successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
