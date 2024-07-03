import { Router, Request, Response } from 'express';
import { request } from 'http';
import { prisma } from '../app';

const router = Router();

// Criar produto

router.post('/produtos', async (req: Request, res: Response) => {
    const {
      nome, categoria, tipo, imagemPath, descricaoContent, armazenContent,
      vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
      producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
      preco, desconto
    } = req.body;

    try {
      const precoNovo = preco - (preco * (desconto / 100))
      const novaDescricao = await prisma.des.create({
        data: {
          content: descricaoContent
        }
      });
  
      const novoArmazen = await prisma.post.create({
        data: {
          content: armazenContent
        }
      });

      const novoProduto = await prisma.produto.create({
        data: {
          nome,
          categoria,
          tipo,
          imagemPath,
          descricao: { connect: { id: novaDescricao.id } },
          armazen: { connect: { id: novoArmazen.id } },
          vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
          producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
          preco, desconto, 
          precoNovo
        }
      });
        res.status(201).json({
            message: 'Produto cadastrado com sucesso',
            usuario: novoProduto
        });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar produto' });
    }
});

//Buscar produto por tipo

router.get('/produtos/tipo/:tipo',  async (req: Request, res: Response)=> {
    const { tipo } = req.params;

    const us = await prisma.produto.findMany({where: {tipo}});

    try {
        if (us) {
            return res.json(us);
        } else {
            res.status(400).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Erro para achar Produto' });
    }
});

//Buscar produto por Id

router.get('/produtos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const Produt = await prisma.produto.findUnique({ where: { id: Number(id) } });

        if (Produt) {
            return res.json(Produt);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' }); 
    }
});

//Deletar produto por Id

router.delete('/produtos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const Product = await prisma.produto.findUnique({ where: { id: Number(id) } });
        if (Product) {
            const deletado = await prisma.produto.delete({ where: { id: Number(req.params.id) } })
             return res.json({
                message: 'Sucesso: Produto Retirado',
                deletado
            });
        } else {
            res.status(404).json({ error: 'Quer terminar com o que nem começou?' }); 
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto' }); 
    }
});

//Atualizar produto por Id

router.put('/produtos/:id', async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { 
      nome, categoria, tipo, imagemPath, descricaoContent, armazenContent,
      vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
      producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
      preco, desconto
    } = req.body;
  
    try {
      
      const precoNovo = preco - (preco * (desconto / 100))
      let descricaoAtualizada = undefined;
      if (descricaoContent) {
        descricaoAtualizada = await prisma.des.upsert({
          where: { id: Number(id) },
          update: { content: descricaoContent },
          create: { content: descricaoContent }
        });
      }

      let armazenAtualizado = undefined;
      if (armazenContent) {
        armazenAtualizado = await prisma.post.upsert({
          where: { id: Number(id) },
          update: { content: armazenContent },
          create: { content: armazenContent }
        });
      }

      const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(id) },
        data: {
          nome,
          categoria,
          tipo,
          imagemPath,
          descricao: descricaoAtualizada ? { connect: { id: descricaoAtualizada.id } } : undefined,
          armazen: armazenAtualizado ? { connect: { id: armazenAtualizado.id } } : undefined,
          vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
          producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
          preco, desconto, precoNovo
        }
      });
      return res.json({
        message: 'Sucesso: Produto Atualizado',
        produtoAtualizado
    });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
  });

//Buscar Produtos por categoria

router.get('/produtos/categorias/:categoria', async(req:Request, res:Response) => {
    const {categoria} = req.params;
    const us = await prisma.produto.findMany({where: { categoria }});
    try{
        if (us.length > 0){
            return res.json(us)
        }
        else{
            return res.status(404).json("Nada salvo aqui")
        }
    }
    catch(error){
        res.status(500).json("Erro ao procurar nome")
    }
});


//Mostra o Banco existente

router.get('/banco', async(req:Request, res:Response) => {

    try {
        const produtos = await prisma.produto.findMany()
        res.json(produtos)
    } catch (error) {
        res.status(500).json("Sem nada no banco")
    }

})

//Busca por booleano ex: Vegano, semgluten

router.get('/produtos/busca/filtrados', async (req:Request, res:Response) =>{
  const {
    vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
    producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar
  } = req.query;
  
  try{
    const filtrados : { [key: string]: boolean } = {};

    if (vegano !== undefined) filtrados.vegano = vegano === 'true';
    if (sustentavel !== undefined) filtrados.sustentavel = sustentavel === 'true';
    if (semGluten !== undefined) filtrados.semGluten = semGluten === 'true';
    if (semLactose !== undefined) filtrados.semLactose = semLactose === 'true';
    if (organico !== undefined) filtrados.organico = organico === 'true';
    if (semAcucar !== undefined) filtrados.semAcucar = semAcucar === 'true';
    if (producaoArtesanal !== undefined) filtrados.producaoArtesanal = producaoArtesanal === 'true';
    if (proximoAoVencimento !== undefined) filtrados.proximoAoVencimento = proximoAoVencimento === 'true';
    if (seloIBD !== undefined) filtrados.seloIBD = seloIBD === 'true';
    if (agroflorestal !== undefined) filtrados.agroflorestal = agroflorestal === 'true';
    if (artesanal !== undefined) filtrados.artesanal = artesanal === 'true';
    if (semAdicaoDeAcucar !== undefined) filtrados.semAdicaoDeAcucar = semAdicaoDeAcucar === 'true';

    const produtos = await prisma.produto.findMany({where:filtrados})
    if(produtos.length > 0){
      return res.json(produtos)
    }
    else{
      return res.status(404).json("Sem produto com esse filtro")
    }
  }
  catch(error) {
    res.status(500).json("Sem nada no filtro")
  }
})
export default router;