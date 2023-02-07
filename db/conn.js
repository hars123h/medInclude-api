const mongoose = require("mongoose")

const env = require("dotenv");



env.config();
mongoose.set("strictQuery", false);
mongoose.connect(
    'mongodb://localhost:27017/medincludes',{
      
    }
).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Database Not Connected", err);
})



