const express=require("express");
const https=require("https");
const parser=require("body-parser");

const app=express();

app.use(parser.urlencoded({extended:true}));
app.get("/",function(req,res){
    // attaches the html file with node
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
 
    // gets the text entered in the form 
    const name=req.body.cityName;
    console.log("form working");

    const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=81d7cdbc9c82f5891f96b6829a923f53&units=metric"
    
    https.get(url,function(response){

        // gives the status code i.e;404,401,200
        console.log(response.statusCode);

        // gets data on response
        response.on("data",function(data){ 
           const w= JSON.parse(data);
           const t=w.main.temp;
           const icon=w.weather[0].icon;
           const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.write("<h1>The temperature in "+name+"  is "+t+"</h1>");
        // res.write("this is another way of sending text on client screen")
           res.write("<img src="+imgurl+">");
           res.send();
    })
        })
    
});
app.listen(9000,function (){
    console.log("server started");
});


    
