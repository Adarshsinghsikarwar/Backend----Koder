import express from "express";

const app = express(); // created server

const notes = [];

app.post("/notes", (req, res) => {
  const note = req.body;
  notes.push(note);
  req.status(201).json({
    message: "Note Created successfully",
  });
});

app.get("/notes", (req, res) => {
  req.status(200).json({
    message: "Fetched all the notes",
  });
});

app.patch("/notes/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  notes[id].description = description;
});

app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;

  delete notes[id];
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
