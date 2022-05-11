This project was created to test keycloak features and the keycloak rest-api


How to Setup


1. Install the Keycloak server and run it on http://localhost:8080/


Link to Keycloak Downloads - https://www.keycloak.org/downloads

Link to Keycloak Documentation - https://www.keycloak.org/documentation


2. Create a realm called "edu-realm"

3. Create clients corresponding for the backend and fronend as "edu-user-service" and "edu-frontend" respectively.


edu-frontend - http://localhost:4200

edu-user-service - http://localhost:3000


(Update the client-secret of the edu-user-service in "edu-user-service\.env")

Create groups as below
1. admin
2. student
3. teacher

Create a client scope called 'edu-user-management'

4. Run the frontend and backend using the corresponding commands,

edu-frontend - ng serve

edu-user-service - npm start 
