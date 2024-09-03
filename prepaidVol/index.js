const express= require("express");
const cors= require("cors");
const {PrismaClient}= require("@prisma/client");
const { all } = require("axios");
const app= express();
const prisma = new PrismaClient;
app.use(cors("*"));
app.use(express.json());

app.get("/healthcheck", (req,res)=>{
    const healthjob= {
        "request_time": new Date().toString(),
        "connectivity": prisma.$connect?"Connected": "Not Connected", status: "working", servicename: "voucher",
    }
    res.send(healthjob);
})


app.get("/vouchers", async (req, res)=>{
    const allplans= await prisma.prepaidVoucher.findMany();
    res.send(allplans);
})

app.listen(7004, (req, res)=>{
    console.log("Plan service started on port 7004.");
})


