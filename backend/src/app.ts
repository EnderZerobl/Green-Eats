import express from 'express';
import { Request, Response } from 'express';
import router from './rotas/rot';
import carro from './rotas/carrinho';
import path from 'path';

const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use(express.json());

app.use('/', router);

app.use('/', carro)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ${PORT}`);
});

