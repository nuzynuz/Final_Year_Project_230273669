#include <ESP8266WiFi.h>         // Include ESP8266 WiFi library
#include <ESPAsyncWebServer.h>   // Include ESPAsyncWebServer library for handling HTTP server
/* For RFID */
#include <SPI.h>                 // Include SPI library for communication with RFID reader
#include <MFRC522.h>             // Include MFRC522 library for RFID reader functionality

#define SS_PIN D4                // Define RFID module's Slave Select pin
#define RST_PIN D3               // Define RFID module's Reset pin

int LED_Red = D1;                // Define the red LED pin

AsyncWebServer server(80);       // Create an AsyncWebServer object on port 80

const char* ssid = "RFID-Reader";  // Define WiFi SSID for Access Point
IPAddress IPaddr(192, 168, 4, 1);  // Define static IP address for Access Point
IPAddress IPmask(255, 255, 255, 0); // Define subnet mask for Access Point
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create an instance of the MFRC522 class for the RFID reader
String rfid_val = "";             // Initialize a variable to store the RFID card value

// Function to handle requests for undefined routes
void notFound(AsyncWebServerRequest *request) {
  request->send(404, "text/plain", "Not found");  // Send a 404 Not Found response
}

// Function to read RFID card data
void readRFID() {
  // Check if a new RFID card is present
  if (!mfrc522.PICC_IsNewCardPresent()) {
    rfid_val = "";  // Clear the RFID value if no card is present
    return;
  }

  // Check if a valid RFID card can be selected
  if (!mfrc522.PICC_ReadCardSerial()) {
    rfid_val = "";  // Clear the RFID value if card cannot be read
    return;
  }
  
  // Read the RFID UID (unique identifier) and convert it to a hexadecimal string
  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content += String(mfrc522.uid.uidByte[i], HEX);
  }
  
  // Debug output to Serial Monitor
  Serial.print("RFID UID: ");
  Serial.println(content);
  
  // Store the RFID UID in a global variable
  rfid_val = content;
  
  // Blink the red LED to indicate successful card read
  digitalWrite(LED_Red, LOW);  // Turn LED on
  delay(200);                  // Short delay
  digitalWrite(LED_Red, HIGH); // Turn LED off
}

void setup() {
  Serial.begin(115200);         // Initialize Serial communication at 115200 baud rate
  pinMode(LED_Red, OUTPUT);     // Set red LED pin as output
  digitalWrite(LED_Red, HIGH);  // Start with the LED turned off
  
  Serial.println();
  Serial.println("Configuring access point...");
  
  // Configure WiFi in Access Point mode with a static IP address
  WiFi.softAPConfig(IPaddr, IPaddr, IPmask);
  WiFi.softAP(ssid);            // Set up WiFi Access Point with the defined SSID
  
  // Print Access Point IP address
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);

  // Define route to serve RFID information via an HTML page. (Returns RFID value in an HTML page)
  server.on("/rfid", HTTP_GET, [](AsyncWebServerRequest * request) {
    // HTML content for the RFID page 
    String html = R"***(
      <!DOCTYPE html>
      <html>
        <head>    
          <title>RFID reading</title>
        </head>
        <body>
          <h1 style='color:green;'>It's ready! Get your RFID</h1>
          <p>ID: )***" + rfid_val + R"***(</p>     
        </body>
      </html>
    )***";

    // Prepare the response
    AsyncWebServerResponse *response;
    if (rfid_val.length() != 0) {
      // If RFID value is available, send it as an HTML response
      response = request->beginResponse(200, "text/html", html);
    } else {
      // If RFID value is not available, send an error message with a retry button
      response = request->beginResponse(400, "text/html", "<html> <h1 style='color:red;'>RFID not read, try again!</h1><button onclick=\"location.href='http://192.168.4.1/rfid';\"> Re-try</button></html>");
    }

    // Add HTTP headers to the response
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Content-Type", "text/html");
    request->send(response); // Send the response to the client
  });

  // Define route to serve RFID information as JSON (Returns RFID value in JSON format)
  server.on("/get-rfid", HTTP_GET, [](AsyncWebServerRequest * request) {
    String jsonO = "{\"id\":\"" + rfid_val + "\"}";  // Create JSON object with RFID value
    AsyncWebServerResponse *response;

    if (rfid_val.length() != 0) {
       // If RFID is available, return the JSON object
      response = request->beginResponse(200, "application/json", jsonO);
    } else {
      // If RFID value is not available, send an error message in JSON format
      response = request->beginResponse(400, "application/json", "{\"error\":\"not found\"}");
    }

    // Add necessary headers for the response
    response->addHeader("Access-Control-Allow-Origin", "*");
    response->addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    response->addHeader("Content-Type", "application/json");
    request->send(response);
  });

  server.onNotFound(notFound); // Handle undefined routes (404)
  server.begin();              // Start the web server
  Serial.println("HTTP Async server started");

  // Initialize RFID reader
  SPI.begin();              // Start SPI communication
  mfrc522.PCD_Init();       // Initialize the MFRC522 RFID module
  Serial.println("RFID reader initialized");
}

// Main loop (runs continuously)
void loop() {
  readRFID();  // Continuously try to read an RFID card
  delay(500);  // A short delay to avoid excessive processing
}
