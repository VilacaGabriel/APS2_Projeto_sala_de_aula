import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Postagens',
            version: '1.0.0',
            description: 'Documentação da API com autenticação JWT'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
