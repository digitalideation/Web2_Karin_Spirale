/**
 * Created by hzuellig on 12.02.20.
 * changed by Karin 13.02.20
 */
var express = require('express');
var app= express();
var socket = require('socket.io');
var path = require('path');

//var server = app.listen(3000);
var server = app.listen(process.env.PORT || 80);


var socketIds=[];


// Variabeln für to next Screen
let totalW=0;
var totalClients=0;


let xspacing = 12; // Distance between each horizontal location
let period = 600.0; // How many pixels before the wave repeats

let yvalues =[]; // Using an array to store height values for the wave
let dx = (Math.PI*2 / period) * xspacing;// Value for incrementing x



let allClientsInfo = []// Array für die verschiednen Clients


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "public", 'index_p5.html'));
});
app.use(express.static(path.join(__dirname, "public")));

console.log("my server is running");

var io = socket(server);
io.sockets.on('connection', newConnection);

let settings={

}
function newConnection(socket){
    //console.log("new connection");
    //console.log(socket.id);
    socket.on('get', startMsg);



        function startMsg(data){
            if (totalClients<19) {


        if(!socketIds.includes(socket.id)) {
            socketIds.push(socket.id);
            totalW+=data.w;

            yvalues = new Array(Math.floor(totalW/xspacing));
           
           
             
            // die bis jetzt für alle gültigen Werte Maxamplitude, yvalues etc werden nun zu individuellen Werten pro Client
            
            let customer = {
                socketid: socket.id,
                id:totalClients,
               
                Maxamplitude:0,
                yvalues : new Array(Math.floor(totalW/xspacing)),
                amplitud: [0],
                oldMaxAmp:0,
                NewoffsetTop: (totalClients+100)+(Math.random()* 700),
                offsetbeginX:totalW - data.w,
                offsetendX:totalW,
                xspacing:xspacing+(Math.random()* 20),
                //xspacing:xspacing,
                dx:dx,
                theta:0,
                
                colg:Math.floor(Math.random()* 255),
                colb:Math.floor((Math.random() * 90) + 205)
                

                 }
            allClientsInfo[totalClients]=customer;


        }


        settings={
            id:totalClients,
            socketid:socket.id,
            offsetbeginX:totalW - data.w,
            offsetendX:totalW,
            xspacing:xspacing,
            dx:dx,
          
           


        }

         totalClients++; //zählen der Clients

        io.to(socket.id).emit('get', settings);//msg geht an client der gesendet hat
    
    
    }//ende startMsg
        socket.on("waveMic",waveMicMsg);

        

        function waveMicMsg (data){
            //console.log("mein Schluessel"+ data.id)
          //  console.log(allClientsInfo[data.id]);

          

            if(!isNaN(data.vol)){

                allClientsInfo[data.id].amplitud.push(data.vol);

               
 
             
                allClientsInfo[data.id].Maxamplitude = getMaxOfArray(allClientsInfo[data.id].amplitud);
 
                if(allClientsInfo[data.id].Maxamplitude < allClientsInfo[data.id].oldMaxAmp){
                   
                    allClientsInfo[data.id].Maxamplitude=allClientsInfo[data.id].oldMaxAmp*0.96;
                }
 
                allClientsInfo[data.id].oldMaxAmp = allClientsInfo[data.id].Maxamplitude;
 
            }
            

        //io.socket.emit ("waveMic", max);
        if(allClientsInfo[data.id].amplitud.length>18){
            allClientsInfo[data.id].amplitud.splice(0,1);
        
        }

        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
          }
       
        }

    }
function scale (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
    setInterval(function(){
       
        for(let n=0;n<allClientsInfo.length;n++){
            calcWave(n);
        }
        io.sockets.emit('update',allClientsInfo ); //msg geht an alle clients
    }, 16); // 1000 ms / 60 -> 16.6666  entspricht ca dem timing in p5.js das 60mal pro sekunde draw aufruft
      


    function calcWave(n) {
        // Increment theta (try different values for
        // 'angular velocity' here)
        //ursprünglich von sketch
        allClientsInfo[n].theta += 0.01;
      
        // For every x value, calculate a y value with sine function
        let x = allClientsInfo[n].theta;
        for (let i = 0; i < allClientsInfo[n].yvalues.length; i++) {
            allClientsInfo[n].yvalues[i] = Math.cos(x) * allClientsInfo[n].Maxamplitude;
            
            x += dx;
            

        }
    }
      //console.log(Maxamplitude);

      //console.log(yvalues);
    


      }
    