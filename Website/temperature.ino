#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Redmi Note 8 Pro";
const char* password = "ar47ka59&*";

const int sensorPin = A0; 

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password); 
  Serial.println("");

  // Attente de la connexion à WiFi
  Serial.print("Connexion au réseau WiFi");
  while (WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connecté");

  // Route "/temperature"
  server.on("/temperature", HTTP_GET, [](){ 
    float temperature = lireTemperature();
    server.send(200, "text/plain", String(temperature)); 
  });

  server.begin();
  Serial.println("Serveur HTTP démarré");
}

void loop() {
  server.handleClient(); //verifier si des clients se connectent
}

float lireTemperature(){
  server.sendHeader("Access-Control-Allow-Origin", "*"); 
  int sensorValue = analogRead(sensorPin); 
  float voltage = sensorValue * (3.3 / 1024.0); 
  float temperatureC = (voltage - 0.5) * 100.0; 
  return temperatureC;
}
