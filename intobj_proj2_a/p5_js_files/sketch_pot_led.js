
// P5 Prototype for Project 1 : Interactive Objects
// The particle system is controlled by a potentiometer; size, colour and shape.
// The final will have a physical LED presence with the particle system on P5

let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.list();
  serial.open('/dev/tty.usbmodem14201');
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
  system = new ParticleSystem(createVector(width / 2, height / 2));
  let valueFill = map(latestData, 0, 1023, 0, 255);
  // colorMode(HSB, 100, 100, 100);
}

function serverConnected() {
  console.log("Connected to Server");
}


function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}


function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine(); 
  trim(currentString);                    
  if (!currentString) return;             
  console.log(currentString);           
  latestData = currentString;          
}

function gotRawData(thedata) {
  print("gotRawData" + thedata);
}

function draw() {

    let valueFill = map(latestData, 0, 1023, 0, 100);
    background(0, 15);
    text(latestData, 10, 10);
    // console.log(valueFill);
    system.addParticle();
    system.run();
}

// Particle System inspired from 
// https://p5js.org/examples/simulate-particle-system.html
// Particle System inspired from 
// https://p5js.org/examples/simulate-particle-system.html

let Particle = function(position) {
  console.log(latestData)
  this.acceleration = createVector(0, 0.05/latestData);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 455;
  
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  let x = map(mouseX, 0, width, 1, 255);
  let i = random(3,30);
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(x, 100, 100, this.lifespan);
  ellipse(this.position.x, this.position.y, 22, 22);
};


Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

