let socket;

let settings={

};

let allClients=[];


var listen = 0;



function setup() {
    
    createCanvas(windowWidth, windowHeight);
  
    //socket=io.connect("http://localhost:3000/");
     socket=io.connect();
  
    settings.w=width; //übermittele dem server die Devicebreite
    
   
        
    socket.emit("get",settings);// einmalige Anmeldung

    socket.on("get",getSettings);
    
    socket.on("update",updateSettings);
  

}
function getSettings(data){
    settings=data;
    console.log(settings)
    
}
function updateSettings(data){
    
    
    //console.log (data);
    allClients=data;

    background(0);


    for (let i= 0; i < allClients.length; i++){
        renderNewWave(i);

   }
  
}



function draw(){

        if(listen==1){
            //console.log("start listening");
            //console.log(meter.volume);



            if(settings.id!=undefined){

                var volmic = meter.volume;
                //var volmic = mic.getLevel();
               // let amplitudZ = floor(map(meter.volume,0,1,0,400));
               let amplitude = floor(map(volmic,0,1,0,400));
                //let amplitude = floor(map(amplitudZ,0,100,0,300));
               // let amplitude = floor (map(amplitudZ,0,90,0,300));
                var data={
                    vol:amplitude,
                    id:settings.id
                }
                //console.log(settings.id)
                socket.emit("waveMic",data)

            }
    

      console.log("ich sende"+data.vol)



        }
   
 }

    
    function renderNewWave(n){

     let mywave = allClients[n];
     //console.log(mywave)
        let localX=0;
        noFill();
         stroke((mywave.Maxamplitude*3),mywave.colg,mywave.colb);
         
        for (let x = floor(mywave.offsetbeginX/mywave.xspacing); x <= floor(mywave.offsetendX/mywave.xspacing);  x++) {
          
            rect(localX * mywave.xspacing,mywave.NewoffsetTop+mywave.yvalues[x],mywave.Maxamplitude,3+mywave.Maxamplitude*0.5);
     
            localX++;
         
         }
        }
    
  
   