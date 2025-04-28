import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Devices API Documentation',
    version: '1.0.0',
    description: 'API for managing device data',
    contact: {
      name: 'RDI',
      email: 'test@rdi.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      ThermometerInput: {
        type: 'object',
        required: ['deviceId', 'temperature', 'batteryLevel', 'long', 'lat'],
        properties: {
          deviceId: {
            type: 'string',
            example: 'DEV-1234'
          },
          temperature: {
            type: 'number',
            format: 'float',
            example: 22.5
          },
          humidity: {
            type: 'number',
            format: 'float',
            nullable: true,
            example: 45.0
          },
          batteryLevel: {
            type: 'number',
            format: 'float',
            minimum: 0,
            maximum: 100,
            example: 85.0
          },
          long: {
            type: 'number',
            example: 23.7356
          },
          lat: {
            type: 'number',
            example: 37.9800
          },
          recordedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-04-25T12:00:00Z'
          }
        }
      },
      ThermometerOutput: {
        allOf: [
          { $ref: '#/components/schemas/ThermometerInput' },
          {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '507f1f77bcf86cd799439011'
              }
            },
            required: ['id']
          }
        ]
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/interfaces/*.ts']
};

export default options;