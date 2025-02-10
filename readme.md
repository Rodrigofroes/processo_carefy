# Desafio Carefy - API de Lista de Desejos de Filmes

## Resumo

Desenvolver uma API em Node.js para gerenciar uma lista de desejos de filmes. A API deve permitir autenticação, integração com a API externa TMDB, gerenciamento de estados dos filmes, um middleware de logs e um histórico completo das ações.

## Endpoints

### 1. Filmes

*   **POST /filme:** Adiciona um filme à lista de desejos.
*   **GET /filme:** Lista todos os filmes na lista de desejos.
*   **GET /filme/:id:** Retorna detalhes de um filme específico.
*   **PUT /filme/:id/estado:** Move o filme para um novo estado (ex: "A assistir, Assistido, Avaliado, Recomendado, Não recomendado").
*   **POST /filme/:id/avaliar:** Avalia o filme com uma nota de 0 a 5.
*   **GET /filme/:id/historico:** Retorna o histórico completo de um filme.

### 2. Autenticação

* **POST /login** Autenticação do usuário (usuario: admin e senha: admin).

### 2. Logs

*   **GET /logs:** Retorna todos os logs registrados (para fins de debug).

### 3. Swagger

*   **GET /docs:** Acessa a documentação da API (Swagger).