const express = require("express");

const app = express(); // here created server
app.use(express.json()); // by default express can'nt read the data in json sended by fronted but . with th of this middleware it is possible
const notes = [];

app.post("/notes", (req, res) => {
  // program the server
  const note = req.body;
  console.log(note);
  notes.push(note);
  res.status(201).json({
    notes,
    message: " Note created successfully ",
  });
});



app.listen(3000, () => {
  console.log("Server is running on port 3000"); // start the server
});
