-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
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
    "promocao" BOOLEAN NOT NULL DEFAULT false,
    "exclusivo" BOOLEAN NOT NULL DEFAULT false,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "preco" REAL NOT NULL DEFAULT 0.0,
    "desconto" REAL NOT NULL DEFAULT 0.0,
    "precoNovo" REAL NOT NULL DEFAULT 0.0,
    CONSTRAINT "Produto_descricaoId_fkey" FOREIGN KEY ("descricaoId") REFERENCES "Des" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Produto_armazenId_fkey" FOREIGN KEY ("armazenId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("agroflorestal", "armazenId", "artesanal", "categoria", "desconto", "descricaoId", "id", "imagemPath", "nome", "organico", "preco", "precoNovo", "producaoArtesanal", "proximoAoVencimento", "seloIBD", "semAcucar", "semAdicaoDeAcucar", "semGluten", "semLactose", "sustentavel", "tipo", "vegano") SELECT "agroflorestal", "armazenId", "artesanal", "categoria", "desconto", "descricaoId", "id", "imagemPath", "nome", "organico", "preco", "precoNovo", "producaoArtesanal", "proximoAoVencimento", "seloIBD", "semAcucar", "semAdicaoDeAcucar", "semGluten", "semLactose", "sustentavel", "tipo", "vegano" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_descricaoId_key" ON "Produto"("descricaoId");
CREATE UNIQUE INDEX "Produto_armazenId_key" ON "Produto"("armazenId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
