# Green-Eats

const atualizar =  multer({ dest: 'uploads/' });


// Criar produto

router.post('/produtos',atualizar.single('image'),  async (req: Request, res: Response) => {
  const {
    nome, categoria, tipo, descricaoContent, armazenContent,
    vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
    producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
    preco, desconto
} = req.body;

try {
    let imagemPath = null;

    if (req.file) {
        const fileContent = fs.readFileSync(req.file.path);
        const imagemBase64 = `data:${req.file.mimetype};base64,${fileContent.toString('base64')}`;
        imagemPath = imagemBase64;
        const targetPath = path.join(__dirname, 'images', req.file.originalname);
        fs.renameSync(req.file.path, targetPath);
    }

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

// Atualizar

router.put('/produtos/:id', atualizar.single('image'), async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { 
      nome, categoria, tipo, descricaoContent, armazenContent,
      vegano, sustentavel, semGluten, semLactose, organico, semAcucar,
      producaoArtesanal, proximoAoVencimento, seloIBD, agroflorestal, artesanal, semAdicaoDeAcucar,
      preco, desconto
    } = req.body;
  
    try {
      const produtoExistente = await prisma.produto.findUnique({ where: { id: Number(id) } });

      if (!produtoExistente) {
          return res.status(404).json({ error: 'Produto não encontrado' });
      }
      let imagemPath = produtoExistente.imagemPath; 

      const documento = req.file;

      if (documento) {
          const fileContent = fs.readFileSync(documento.path);
          imagemPath = `data:${documento.mimetype};base64,${fileContent.toString('base64')}`;
          fs.unlinkSync(documento.path);
      }
      
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