import { Router, Request, Response } from 'express';
import { request } from 'http';
import { prisma } from '../database/data';

const carro = Router();

const carrinho: { [produtoId: string]: number } = {};

carro.post('/carrinho', async (req: Request, res: Response) => {
    const { produtoId, quantidade } = req.body;

    if (!produtoId || quantidade == null) {
        return res.status(400).json({ error: 'Produto ID e quantidade são necessários' });
    }

    try {
        const produto = await prisma.produto.findUnique({
            where: { id: Number(produtoId) },
        });

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        if (carrinho[produtoId]) {
            carrinho[produtoId] += Number(quantidade);
        } else {
            carrinho[produtoId] = Number(quantidade);
        }

        res.status(200).json({ message: 'Produto adicionado ao carrinho', carrinho });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar produto' });
    }
});

carro.get('/carrinho', (req: Request, res: Response) => {
    res.status(200).json({ carrinho });
});

carro.put('/carrinho/:produtoId', (req: Request, res: Response) => {
    const { produtoId } = req.params;
    const { quantidade } = req.body;

    if (!produtoId || quantidade == null) {
        return res.status(400).json({ error: 'Produto ID e nova quantidade são necessários' });
    }

    if (carrinho[produtoId]) {
        carrinho[produtoId] = Number(quantidade);
        return res.status(200).json({ message: 'Quantidade atualizada', carrinho });
    } else {
        return res.status(404).json({ error: 'Produto não encontrado no carrinho' });
    }
});

carro.delete('/carrinho/:produtoId', (req: Request, res: Response) => {
    const { produtoId } = req.params;

    if (carrinho[produtoId]) {
        delete carrinho[produtoId];
        return res.status(200).json({ message: 'Produto removido do carrinho', carrinho });
    } else {
        return res.status(404).json({ error: 'Produto não encontrado no carrinho' });
    }
});

carro.delete('/carrinho', (req: Request, res: Response) => {
    for (const produtoId in carrinho) {
        delete carrinho[produtoId];
    }
    res.status(200).json({ message: 'Carrinho limpo', carrinho });
});

export default carro