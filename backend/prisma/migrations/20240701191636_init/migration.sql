-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "imagemPath" TEXT,
    "descricaoId" INTEGER,
    "armazenId" INTEGER,
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

-- CreateIndex
CREATE UNIQUE INDEX "Produto_descricaoId_key" ON "Produto"("descricaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_armazenId_key" ON "Produto"("armazenId");
