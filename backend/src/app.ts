import express from 'express';
import { Request, Response } from 'express';
import router from './rotas/rot';

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use('/', router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ${PORT}`);
});

