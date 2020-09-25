const notesController = {};
const NoteModel = require("../models/Note");

notesController.getNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.json(notes);
};

notesController.createNote = async (req, res) => {
  const { title, content, author, date } = req.body;
  const newNota = new NoteModel({
    title,
    content,
    author,
    date,
  });
  await newNota.save();
  res.json({ message: "POST - Note saved" });
};

notesController.getNote = async (req, res) => {
  const getNotaObject = await NoteModel.findById(req.params.id);
  res.json(getNotaObject);
};

notesController.updateNote = async (req, res) => {
  const { title, content, author, date } = req.body;
  const noteUpdate = await NoteModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      content,
      author,
      date,
    }
  );
  res.json({ message: "PUT - Note updated" });
};

notesController.deleteNote = async (req, res) => {
  const deleteNoteObject = await NoteModel.findOneAndDelete(req.params.id);

  res.json({ message: "Delete - Note delete" });
};

module.exports = notesController;
