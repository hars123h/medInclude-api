const Note = require("../models/notes");
const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY


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

exports.signleNote = async (req, res) => {
  let note = await Note.findById(req.params.noteId)
    .exec()
  res.json(note)
}

exports.createMessage = (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if(!email) {
    return res.status(400).json({
      message:"Email is Required"
    })
  }
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Contact Message`,
    html: `
     ${message}
`
};

sgMail.send(emailData).then(sent => {
    return res.json("Message is sent Successfully");
});

}