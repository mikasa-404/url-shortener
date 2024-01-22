const express = require("express");
const app = express();
const PORT = 8001;
const urlRouter = require("./routes/url");
const staticRoute= require("./routes/staticRouter")
const path = require("path");
const { connectToMongo } = require("./connection");
const URL= require("./models/url")


connectToMongo("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("Mongodb connected succesfully");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}))


//routes

app.use("/url", urlRouter);
app.use("/",staticRoute);


app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
