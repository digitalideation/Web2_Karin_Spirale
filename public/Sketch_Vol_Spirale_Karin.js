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
    frameRate(40);
    //socket=io.connect("http://localhost:3000/");
    socket=io.connect();
    colorMode(HSB,width,height,100);
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
    //settings.yvalues=data;
    //settings.Newyvalues=data;
    
    //console.log (data);
    allClients=data;

    background(0);


    for (let i= 0; i < allClients.length; i++){
        renderNewWave(i);

   }
    //renderWave();
}



function draw(){

    if(settings.id!=undefined){
        var volmic = mic.getLevel();
        let amplitude = floor(map(volmic,0,1,0,400));
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
    stroke(255)
        
        for (let x = floor(mywave.offsetbeginX/mywave.xspacing); x <= floor(mywave.offsetendX/mywave.xspacing);  x++) {
           
            
            /*var volmic = mic.getLevel();
            let amplitude = floor(map(volmic,0,1,0,400));

            let amplitudesize = map(volmic,0,1,0,200);*/
          

            //stroke(amplitudesize,230,amplitudeNsize);
            rect(localX * mywave.xspacing,mywave.NewoffsetTop+mywave.yvalues[x],mywave.Maxamplitude,10);
           

            localX++;
         
         }
        }
    
  
    // function renderWave() {
    //     noFill();
    

       
        // let localX=0;
        // // A simple way to draw the wave with an ellipse at each location
        // for (let x = floor(settings.offsetbeginX/settings.xspacing); x <= floor(settings.offsetendX/settings.xspacing);  x++) {
           
            
        //     var volmic = mic.getLevel();
        //     let amplitude = floor(map(volmic,0,1,0,400));

        //     let amplitudesize = map(volmic,0,1,0,200);
        //     let amplitudeSsize= map (volmic,0,1,20,400)

        //     //let amplitudeXsize= map (amplitudesize,0,1,0,400)
        //     let amplitudeNsize= map (amplitudesize,0,1,0,600)

        //     stroke(amplitudesize,230,amplitudeNsize);
        //     rect(localX * settings.xspacing,settings.NewoffsetTop + settings.Newyvalues[x],amplitudeSsize,10);
           
        //     stroke(amplitudesize,amplitudeNsize,200);
        //     ellipse(localX * settings.xspacing,settings.offsetTop + settings.yvalues[x],amplitudeSsize,amplitudesize);
           
           
        
        //     localX++;
         
        //  }
       
      
      


