const express= require("express")
const app= express();
const cors= require("cors");
app.use(express.json());
app.use(cors("*"));
const axios= require("axios")

const jwt= require("jsonwebtoken")
const SECK= require("../authdetails/auth");
function authenticate(key){
    try{
        const validated= jwt.verify(key, SECK);
        return validated;
    }catch(error){
        console.log(error);
    }
}

app.use( async (req,res, next)=>{
    const authkey= req.header("x-token");
    if(authenticate(authkey)){
        console.log("Authenticated!")
        const resdata= await axios.get("http://localhost:7010/services") //registry URL. 
        console.log(resdata.data);
        const action_name= req.path.split("/")[1];
        console.log(action_name);
    
        const servicedata= resdata.data;
        const serviceinfo= servicedata.find((e)=>e.servicename== action_name)
        console.log(serviceinfo);
        if(serviceinfo){
        console.log(serviceinfo);
        const serviceurl = serviceinfo.url+"/"+ req.path.split("/")[2];
        const alldata= await axios.get(serviceurl);
        res.send(alldata.data);
        }
        else{
            res.send("Service info not found")
        }
    }
    else{
        res.send("Authentication failed")
}
})


app.listen(7002, ()=>{
    console.log("API gateway running in port 7002")
})