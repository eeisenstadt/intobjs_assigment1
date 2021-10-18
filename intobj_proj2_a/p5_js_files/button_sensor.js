
// P5 Prototype for Project 1 : Interactive Objects
// FINAL 
// MANDALA GEOMETRIC EFFECT CONTROLLED BY A POTENTIOMETER 

// SERIAL COMMUNITCATIO FOR MICROCONTROLLER TO PROTOTPYE P5.JS FROM 
// CODE SAMPLE FROM Irene Ye Yuan
// URL https://medium.com/@yyyyyyyuan/ 

// CODE INSPIRATION FROM https://p5js.org/examples/ for Examples

var serial;  
var portName = '/dev/tty.usbmodem14201';    //serial port name here
var inData;   
var outData; 
var minWidth = 600;  
var minHeight = 400;
var width, height;    


// MANDALA VARIABLES
var angle;
var speed = 75;
var red = 255;
var green = 255;
var blue = 255;

function setup() {

if (window.innerWidth > minWidth){
    width = window.innerWidth;
        } else {
    width = minWidth;
  }

  if (window.innerHeight > minHeight) {
    height = window.innerHeight;
        } else {
    height = minHeight;
  }

  createCanvas(width, height);
  stroke(200, 0, 0, 75);

  strokeWeight(0.75);
  fill(255, 255, 255, 10);

  //Communication port
  serial = new p5.SerialPort();      
  serial.on('connected', serverConnected); 
  serial.on('open', portOpen);        
  serial.on('data', serialEvent);    
  serial.on('error', serialError);    
  serial.on('close', portClose);      
  serial.list();                      
  serial.open(portName);             
}


function draw() {

if (inData >= 1) {
    mandala(width/2, height/2);
} else {
    background(255);
  mandala(width/2, height/2);
}
}



function mandala(originX, originY){
  angle = cos(speed*25)*25;
  background(0,25);

  // if (inData <= 100) {
  //   stroke(255, 0, 0, 80);
  //   } else if (inData <= 120){
  //     stroke(255, 96, 0, 80);
  //   } else if (inData <= 140){
  //     stroke(255,255,0,80);
  //   } else if (inData <= 160) {
  //     stroke(0,255,0,80);
  //   } else if (inData <= 180) {
  //     stroke(0,255,255,80); 
  //   } else if (inData <= 190) {
  //     stroke(0,0,255,80); 
  //   } else {
  //     stroke(255,0,255,80); 
  // }
  
  push();
      translate(originX, originY);
      rotate(speed*2);
      for (var j = 0; j < 55; j++){
          rotate(15 / speed*15);
          curve(j, j, 0, angle+j, inData+250, angle-j, j+inData+250, j);
         
      }
  pop();
  // console.log(inData);

    speed += 0.0005;

}


function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
