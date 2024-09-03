//ServiceRegistry
const express= require("express");
const cors= require("cors");
const app= express();
app.use(cors("*"));
app.use(express.json());

const axois= require('axios');
let services=[];

app.get("/services", (req, res)=>{
    res.send(services)
})

app.get("/getservice/:servicename", (req, res)=>{
    const servicedata= services.find((e)=>e.servicename==req.params.servicename)
    if(servicedata){
        res.send(servicedata)
    }else{
        res.send("Service not found");
    }
})

app.post("/register", (req,res)=>{
    const servicename= req.body.servicename;
    const url= req.body.url;
    const servicedata={
        servicename: servicename,
        url: url,
    }
    services.push(servicedata);
    res.send(`Service with name: ${servicename} and url: ${url} registered.`)
});

//middleware to check the ports running 
app.use(async (req,res)=>{
    services=[];
    for(i=7001; i<7009; i++ ){
        try{
        const response= await axois.get(`http://localhost:${i}/healthcheck`)
        if(response.status==200){
            console.log(response.data.servicename);
            console.log(`http://localhost:${i}/healthcheck`)
            servicename= response.data.servicename;
            url = `http://localhost:${i}`;
            let servobj= {
                servicename: servicename,
                url: url,
            };
            //here it will register the services and hence it is visible on the react app as well. 
            services.push(servobj);
        }
    }catch(error){
        console.log(`Service not found on port ${i}`);
    }  
}
res.send("All port scanned.")
})

app.listen(7010, ()=>{
    console.log("Registry up and running in 7010")
})