'use client'
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Upload: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("nome", "Produto Exemplo");
    formData.append("categoria", "Categoria Exemplo");
    formData.append("tipo", "Tipo Exemplo");
    formData.append("descricaoContent", "Descrição do produto");
    formData.append("armazenContent", "Armazenamento do produto");
    formData.append("vegano", "true");
    formData.append("sustentavel", "false");
    formData.append("semGluten", "true");
    formData.append("semLactose", "false");
    formData.append("organico", "true");
    formData.append("semAcucar", "true");
    formData.append("producaoArtesanal", "false");
    formData.append("proximoAoVencimento", "false");
    formData.append("seloIBD", "false");
    formData.append("agroflorestal", "true");
    formData.append("artesanal", "true");
    formData.append("semAdicaoDeAcucar", "false");
    formData.append("preco", "100");
    formData.append("desconto", "10");

    const response = await fetch("/api/your-upload-endpoint", {
        method: "POST",
        body: formData,
      });

    const data = await response.json();
    setImagePath(data.produto.imagemPath);

    setFile(null);
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <button type="submit">Upload</button>
      </form>
      {imagePath && (
        <Image src={imagePath} width={300} height={400} alt="Uploaded Image" />
      )}
    </>
  );
};

export default Upload;