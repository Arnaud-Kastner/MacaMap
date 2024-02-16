#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "Redmi Note 8 Pro";
const char* password = "ar47ka59&*";

const int sensorPin = A0; // Définir le pin analogique auquel le capteur est connecté

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password); //initialiser connexion Wi-Fi
  Serial.println("");

  // Attente de la connexion à WiFi
  Serial.print("Connexion au réseau WiFi");
  while (WiFi.status() != WL_CONNECTED) { //constante qui donne l'etat de la connexion
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connecté");

  // Route "/temperature"
  server.on("/temperature", HTTP_GET, [](){ //gestionnaire de route pour le chemin "/temperature" avec la méthode HTTP GET
    float temperature = lireTemperature();
    server.send(200, "text/plain", String(temperature)); //réponse HTTP avec le code de statut 200 (OK), un type de contenu "text/plain", et la valeur de la température
  });

  server.begin();
  Serial.println("Serveur HTTP démarré");
}

void loop() {
  server.handleClient(); //verifier si des clients se connectent
}

float lireTemperature(){
  server.sendHeader("Access-Control-Allow-Origin", "*"); //envoyer reponse à une demande HTTP, toutes les sources sont autorisées à accéder à la temperature
  int sensorValue = analogRead(sensorPin); // Lire la valeur du capteur
  float voltage = sensorValue * (3.3 / 1024.0); // conversion de la valeur du capteur analogique en une tension, nombre de pas de quantification du convertisseur analogique-numérique 
  float temperatureC = (voltage - 0.5) * 100.0; // Convertir la tension en température en degrés Celsius,  corriger le fait que le capteur ne commence pas à 0 volt mais à une certaine tension
  return temperatureC;
}
