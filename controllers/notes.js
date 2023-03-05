const Note = require("../models/notes");


exports.notes = (req, res) => {
  const { title, text } = req.body;
  const userId = req.user._id
  const newNote = new Note({ title, text, userId });


  newNote.save((err, note) => {
    if (err) {
      console.log('SAVE Note IN ACCOUNT  ERROR', err);
      return res.status(401).json({
        error: 'Error saving user in database. Try signup again'
      });
    }
    return res.json({
      message: 'Saved Successfully.'
    });
  });
}

// exports.allNote = (req,res) => {
//     Note.find({})
//     .exec((error, note) => {
//         if(error) return res.status(400).json({error});
//         if(note) {
//             const noteList = createCategories(categories);
//             res.status(200).json({categoryList})  
//         }
//     });
// }

exports.allNote = async (req, res) => {
  try {
    const allNote = await Note.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json({ allNote });
  } catch (err) {
    console.log(err.message);
    res.status(501).json({
      success: false,
      message: "internal Server error please try again after some time",
      err,
    });
  }
};

exports.signleNote = async(req, res) => {
  let note = await Note.findById(req.params.noteId)
  
  .exec()
  res.json(note)
}