const express= require("express");
const http= require("http");
const httpProxy= require("http-proxy");

const app= express();

const targets =[
    {target: "http://localhost:7001"},
    {target: "http://localhost:7002"},
];

let currentTargetIndex=0;

const proxy= httpProxy.createProxyServer();

app.use((req, res)=>{
    const target= targets[currentTargetIndex];
    currentTargetIndex= (currentTargetIndex+1)%targets.length;
    console.log(target);
    proxy.web(req, res, target);
})

const server= http.createServer(app);
server.listen(8000, ()=>{
    console.log("Load Balancer listening on 8000");
});