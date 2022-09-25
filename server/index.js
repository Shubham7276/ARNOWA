const mongoose = require('mongoose')
const express = require("express");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routes/users")


const dbUrl = "mongodb+srv://shubham7276:shubham7276@cluster0.3jerenb.mongodb.net/userlogins?retryWrites=true&w=majority";
// const dbUrl = "mongodb://localhost:27017/mydb";

const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams).then(()=>{
    console.log("Database are connected")
}).catch((error)=>{
    console.log("Error", error)
})

app.use(express.json());
app.use(cors());

app.use("/user",usersRoutes)

const PORT = 8080;
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


