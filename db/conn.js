const mongoose = require("mongoose")

const env = require("dotenv");



env.config();
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URL,{
      
    }
).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Database Not Connected", err);
})



