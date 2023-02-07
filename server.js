const express = require("express");
const env = require("dotenv");
const app = express();
const cors = require("cors");
require("./db/conn")



//Routes

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");



//Environment Variables
env.config();

// MiddleWares
app.use(cors())
app.use(express.json())
app.use('/api', authRoutes);
app.use('/api', noteRoutes);




const port = 5001 || process.env.PORT
app.listen(port, (req, res) => {
    console.log(`server is running on ${port}`);
})