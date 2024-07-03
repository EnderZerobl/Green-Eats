import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Request, Response } from 'express';
import router from './rotas/rot';


const app = express();
const cors = require('cors');
const prisma = new PrismaClient();

app.use(cors());

app.use(express.json());

app.use('/', router);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor ${PORT}`);
});

export {prisma}