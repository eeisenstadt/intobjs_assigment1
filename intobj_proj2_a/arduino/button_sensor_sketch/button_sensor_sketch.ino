
//BUTTON SENSOR SKETCH / P5.JS
//CODE SNIPPET FROM https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/06-the-sound-sensor
  

#define button 4     // connect button to D4
 
int button_state = 0; 
int close_state = 0;

 
void setup() {
    Serial.begin(9600);
    pinMode(button, INPUT);
}
 
void loop(){
    button_state = digitalRead(button);
 
    if (button_state == HIGH) {
        Serial.write(button_state);
        } else {
        Serial.write(close_state);
    }
    
delay(50);
}
