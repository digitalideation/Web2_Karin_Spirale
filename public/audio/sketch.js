/**
 * Created by hzuellig on 24.03.20.
 */

var listen = 0;
function setup(){
    createCanvas(100,100);
    frameRate(10);
}

function draw(){
    if(listen==1){
        console.log(meter.volume);
    }
}