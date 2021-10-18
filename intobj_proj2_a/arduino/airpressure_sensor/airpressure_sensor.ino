//AIR PRESSURE SENSOR SKETCH / P5.JS
//CODE SNIPPET FROM https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/06-the-sound-sensor  

#include "Arduino_SensorKit.h"
 
int pressure;
 
void setup() {
  Serial.begin(9600);
  Pressure.begin();
}
 
void loop() {
  pressure = round(Pressure.readPressure());
//  Serial.println(pressure);
//  delay(1000);
  Serial.print(Pressure.readPressure());
  delay(1000);
}
