const express= require("express")
const mongoose= require("mongoose")
const app= express();
const PORT=8001;
const urlRouter= require("./routes/url")
const {connectToMongo}= require("./connection")
//middlewares
app.use(express.json())
connectToMongo("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("Mongodb connected succesfully")
})

//routes
app.use("/url", urlRouter)
app.listen(PORT, ()=>{
    console.log(`server started at port: ${PORT}`)
})

