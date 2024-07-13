import { Router, Request, Response } from 'express';
import { request } from 'http';
import { prisma } from '../database/data';

const carro = Router();

// Adicionar produto ao carrinho

carro.post('/carrinho', async (req: Request, res: Response) => {
    const { produtoId, quantidade } = req.body;
  
    try {
      const produto = await prisma.produto.findUnique({ where: { id: produtoId } });
  
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const Produtonocarrinho = await prisma.carrinho.findFirst({where: { produtoId }});

      if(Produtonocarrinho){
        return res.status(400).json({error: "Produto já adicionado"})
      }
  
      const carrinhoItem = await prisma.carrinho.create({
        data: {
          quantidade,
          produto: {
            connect: { id: produtoId }
          }
        }
      });
  
      res.status(201).json(carrinhoItem);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao adicionar produto ao carrinho' });
    }
  });
  
// Buscar itens do carrinho

carro.get('/carrinho', async (req: Request, res: Response) => {
    try {
      const carrinho = await prisma.carrinho.findMany({
        include: {
          produto: {
            select: {
              nome: true,
              preco: true,
              precoNovo: true,
              imagemPath: true,
              promocao: true,
              exclusivo:true
            }
          }
        }
      });
  
      res.json(carrinho);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar itens do carrinho' });
    }
  });
  
// Atualizar quantidade de um item do carrinho

carro.put('/carrinho/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantidade } = req.body;
  
    try {
      const carrinhoItem = await prisma.carrinho.update({
        where: { id: Number(id) },
        data: { quantidade }
      });
  
      res.json(carrinhoItem);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar item do carrinho' });
    }
  });
  
// Remover item do carrinho

carro.delete('/carrinho/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const carrinhoItem = await prisma.carrinho.delete({
        where: { id: Number(id) }
      });
  
      res.json(carrinhoItem);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao remover item do carrinho' });
    }
  });

//Rota para pegar o Total a pagar

carro.get('/carrinho/total', async (req: Request, res: Response) => {
    try {
      const carrinho = await prisma.carrinho.findMany({
        include: {
          produto: {
            select: {
              preco: true,
              desconto: true,
              precoNovo: true,
              promocao: true,
            },
          },
        },
      });
  
      const { totalSemDesconto, totalComDesconto, Desconto } = carrinho.reduce(
        (acc, item) => {
          const preco = item.produto.preco;
          const precoComDesconto = item.produto.precoNovo;
          const desconto = item.produto.desconto;
  
          acc.totalSemDesconto += preco * item.quantidade;
          acc.totalComDesconto += precoComDesconto * item.quantidade;
          acc.Desconto += (preco - precoComDesconto) * item.quantidade;
  
          return acc;
        },
        { totalSemDesconto: 0, totalComDesconto: 0, Desconto: 0 }
      );
  
      res.status(200).json({
        totalSemDesconto,
        totalComDesconto,
        Desconto,
      });

    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular o total do carrinho' });
    }
  });


export default carro;