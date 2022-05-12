const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TEDdy Bear Server API',
      version: '1.0.0',
      description: 'A REST API using swagger and express.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
      {
        url: 'http://localhost:5001',
      },
    ],
  },
  apis: ['./src/db/schemas/*.js', './src/routers/*.js'],
};
const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
