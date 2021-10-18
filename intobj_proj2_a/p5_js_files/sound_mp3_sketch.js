let song;
var minWidth = 600;  
var minHeight = 400;
var width, height;  


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

  song = loadSound('heartbeat.mp3');
  createCanvas(width, height);
  background(255, 0, 0);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
      } else {
    song.play();
    background(0);
  }
}