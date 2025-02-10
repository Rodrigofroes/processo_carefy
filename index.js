import express from 'express';
import FilmeRoute from './routes/filmeRoute.js';
import AuthRoute from './routes/authRoute.js';
import Migrations from './db/migrations/migrations.js';
import LogRoute from './routes/logRoute.js';
import swaggerUi from 'swagger-ui-express'
import { createRequire } from "module";
import cookieParser from 'cookie-parser';
const require = createRequire(import.meta.url);
const outputJson = require("./swagger-output.json");

Migrations();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));

app.use(FilmeRoute);
app.use(AuthRoute);
app.use(LogRoute);

app.listen(3000, "0.0.0.0", () => {
    console.log(`Server is running on port 3000`);
});
