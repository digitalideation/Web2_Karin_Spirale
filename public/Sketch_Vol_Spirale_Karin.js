let socket;

let settings={

};

let allClients=[];

function preload(){
 
   
    mic= new p5.AudioIn();
    mic.start();
}




function setup() {
    
    createCanvas(windowWidth, windowHeight);
    //frameRate(40);
   //socket=io.connect("http://localhost:3000/");
     socket=io.connect();
  
    amp =new p5.Amplitude();
    mic= new p5.AudioIn();
    mic.start();
  
    settings.w=width; //übermittele dem server die Devicebreite
    
   
        
    socket.emit("get",settings);// einmalige Anmeldung

    socket.on("get",getSettings);
    
    socket.on("update",updateSettings);
  

}
   function getSettings(data){
    settings=data;
    //console.log(settings)
    
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

    if(settings.id!=undefined){
        var volmic = mic.getLevel();
       let amplitudZ = floor(map(volmic,0,1,0,400));
        //let amplitude = floor(map(amplitudZ,0,100,0,300));
        let amplitude = floor(map(amplitudZ,0,90,0,400));
        var data={
            vol:amplitude,
            id:settings.id
        }
        //console.log(settings.id)
        socket.emit("waveMic",data)

    }
    //if(frameCount%20==0){

        //console.log("ich sende"+data.vol)
    //}
    
   
 
   
 }

    
    function renderNewWave(n){

     let mywave = allClients[n];
     //console.log(mywave)
        let localX=0;
        noFill();
        //stroke(mywave.colr,mywave.colg,mywave.colb,200);
        //stroke((mywave.Maxamplitude*15),mywave.colg,(mywave.Maxamplitude+100));
        stroke((mywave.Maxamplitude*3),mywave.colg,mywave.colb);
         
        // for (let x = floor(mywave.offsetbeginX/mywave.xspacing); x <= floor(mywave.offsetendX/mywave.xspacing);  x++) {
        for (let x = floor(mywave.offsetbeginX/mywave.xspacing); x <= floor(mywave.offsetendX/mywave.xspacing);  x++) {
          
            //rect(localX * mywave.xspacing,mywave.NewoffsetTop+mywave.yvalues[x],mywave.Maxamplitude,mywave.r);
            rect(localX * mywave.xspacing,mywave.NewoffsetTop+mywave.yvalues[x],mywave.Maxamplitude,2+mywave.Maxamplitude*0.5);
           // ellipse(localX * mywave.xspacing,mywave.NewoffsetTop+mywave.yvalues[x]+mywave.Maxamplitude,mywave.Maxamplitude,5+mywave.Maxamplitude*0.5);

            localX++;
         
         }
        }
    
  
   