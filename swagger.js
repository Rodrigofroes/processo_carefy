import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Processo Seletivo - Carefy",
        description: "API para gerenciar lista de desejos de filmes",
    },
    host: 'localhost:3001',
}

const outputJson = "./swagger-output.json";
const routes = ['./index.js']

swaggerAutogen({ openapi: '3.0.0' })(outputJson, routes, doc)
    .then(async () => {
        await import('./index.js');
    })