 //SOUND SENSOR SKETCH / P5.JS 
//CODE SNIPPET FROM https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/06-the-sound-sensor


int sound_sensor = A2; //assign to pin A2
int soundMap = 0;
 
void setup() {
  Serial.begin(9600); 
}
 
void loop(){
  int soundValue = 0; 
  for (int i = 0; i < 32; i++){ 
      soundValue += analogRead(sound_sensor);  
      } 
 
  soundValue >>= 5; 
// Serial.println(soundValue); 
   soundMap = map(soundValue, 0, 500, 0, 255);  
   Serial.write(soundMap);
   delay(250); 
}
