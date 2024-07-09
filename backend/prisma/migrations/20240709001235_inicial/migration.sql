-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "imagemPath" TEXT,
    "descricaoId" INTEGER,
    "armazenId" INTEGER,
    "vegano" BOOLEAN NOT NULL DEFAULT false,
    "sustentavel" BOOLEAN NOT NULL DEFAULT false,
    "semGluten" BOOLEAN NOT NULL DEFAULT false,
    "semLactose" BOOLEAN NOT NULL DEFAULT false,
    "organico" BOOLEAN NOT NULL DEFAULT false,
    "semAcucar" BOOLEAN NOT NULL DEFAULT false,
    "producaoArtesanal" BOOLEAN NOT NULL DEFAULT false,
    "proximoAoVencimento" BOOLEAN NOT NULL DEFAULT false,
    "seloIBD" BOOLEAN NOT NULL DEFAULT false,
    "agroflorestal" BOOLEAN NOT NULL DEFAULT false,
    "artesanal" BOOLEAN NOT NULL DEFAULT false,
    "semAdicaoDeAcucar" BOOLEAN NOT NULL DEFAULT false,
    "preco" REAL NOT NULL DEFAULT 0.0,
    "desconto" REAL NOT NULL DEFAULT 0.0,
    "precoNovo" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "Produto_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "Des" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_armazenId_fkey" FOREIGN KEY ("armazenId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Des" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_descricaoId_key" ON "Produto"("descricaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_armazenId_key" ON "Produto"("armazenId");
