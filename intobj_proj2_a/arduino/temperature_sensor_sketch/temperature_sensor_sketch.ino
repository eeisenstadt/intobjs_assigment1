
//TEMPERATURE SENSOR SKETCH / P5.JS 
//#define DHTPIN 3 

#include "Arduino_SensorKit.h"
int tempFloat;

void setup() {
  Serial.begin(9600);
  Environment.begin();
}
 
void loop() {
  
//  Serial.print("Temperature = ");
  tempFloat = round(Environment.readTemperature());
  Serial.write(tempFloat); //print temperature
//  Serial.println(" C");
//  Serial.print("Humidity = ");
//  Serial.print(Environment.readHumidity()); //print humidity
//  Serial.println(" %");
  delay(2000);
}
