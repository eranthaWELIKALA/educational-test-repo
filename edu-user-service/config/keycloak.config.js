var Keycloak = require('keycloak-connect');

let _keycloak;
let _groups;

var keycloakConfig = {
    clientId: (process.env.IAMSERVER_CLIENT_NAME || 'test-service'),
    bearerOnly: true,
    serverUrl: `${process.env.IAMSERVER_ADDR || 'http://localhost:8080'}/auth`,
    realm: (process.env.IAMSERVER_REALM_NAME || 'test-realm'),
    credentials: {
        secret: (process.env.IAMSERVER_CLIENT_SECRET || '')
    }
};

function initKeycloak(memoryStore) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        if (_keycloak) {
            console.log("Keycloak is successfully initialized...");
        }
        return _keycloak;
    }
    
}

function getKeycloak() {
    if (!_keycloak) {
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};