const express = require("express");

const app = express();

const notes = [];

app.use(express.json());

app.post("/notes", (req, res) => {
  const note = req.body;
  notes.push(note);
  console.log(notes);
  res.status(201).json  ({
    note,
    message: "Mote created Successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
