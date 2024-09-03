const express= require("express")
const app= express();
app.use(express.json());
const jwt= require("jsonwebtoken")
const cors = require("cors");

app.use(cors("*"))

const SECK=require("../authdetails/auth");
app.post("/register", (req, res)=>{
    const user= req.body;
    const token= jwt.sign(user, SECK);

    res.send(token);
})

app.listen(7012, ()=>{
    console.log("Register endpoint running in port 7012");
})