//POT SENSOR SKETCH / P5.JS
//CODE SNIPPET FROM https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/06-the-sound-sensor

const int analogPin = A0;   
const int ledCount = 10;  
const int led1Pin =  9;   
const int led2Pin = 12;  

int brightness = 0;   
int led2brightness = 0;  
int incomingByte;   

int ledPins[] = {
 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
};   


void setup() {
  Serial.begin(9600); 
    for (int thisLed = 0; thisLed < ledCount; thisLed++) {
    pinMode(ledPins[thisLed], OUTPUT);
  }
}

void loop() {
   int sensorValue;
   sensorValue = analogRead(analogPin); 
   int ledLevel = map(sensorValue, 0, 1023, 0, ledCount);
   brightness = map(sensorValue, 0, 1023, 0, 255);  
   Serial.write(brightness);

if (sensorValue >= 0) {
  for (int thisLed = 0; thisLed < ledCount; thisLed++) {
    if (thisLed < ledLevel) {
      digitalWrite(ledPins[thisLed], HIGH);
        } else {
      digitalWrite(ledPins[thisLed], LOW);
    }
  }
  }
   
 if (Serial.available() > 0) {   
    incomingByte = Serial.read();
    led2brightness = map(incomingByte, 0, 255, 0, 255); 
    } else { }
      analogWrite(led2Pin, led2brightness); 
 
}
