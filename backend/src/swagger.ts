import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUi  from "swagger-ui-express";




const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HomlyApp API",
      version: "1.0.0",
      description: "Buy Or Rent Assets App Application",
    },
    servers: [
      {
        url: "http://node42.cs.colman.ac.il:4001",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;