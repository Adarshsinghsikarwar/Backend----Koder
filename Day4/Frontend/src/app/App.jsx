import { useEffect, useState } from "react";
import "./styles/global.scss";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  async function getNotes() {
    axios
      .get("http://localhost:3000/notes")
      .then((res) => setNotes(res.data.notes))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getNotes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      axios
        .patch(`http://localhost:3000/notes/${editId}`, { title, description })
        .then((res) => {
          console.log(res.data.message);
          getNotes();
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:3000/notes", { title, description })
        .then((res) => {
          console.log(res.data.message);
          getNotes();
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  return (
    <main className="main-page">
      <form onSubmit={handleSubmit} className="note-form">
        
        <div className="form-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editId ? "Update Note" : "Create Note"}
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <div className="button1">
              <h3>{note.title}</h3>
              <div className="button2">
                <button
                  onClick={() => {
                    axios
                      .delete(`http://localhost:3000/notes/${note._id}`)
                      .then(() => {
                        getNotes();
                      });
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditId(note._id);
                    setTitle(note.title);
                    setDescription(note.description);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Update
                </button>
              </div>
            </div>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
