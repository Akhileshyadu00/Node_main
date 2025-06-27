import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;


//// Middleware --convert req.body in json 
app.use(express.json()); 



//Database connect
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("DB is Conneted");
    app.listen(5001, () => {
    console.log("Server is running at port 5001");  
})
})
.catch((err) => {
    console.log("DB is not connected", err);   
})

