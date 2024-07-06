import './AdminPage.css'

export default function AdminPage ({ type, data }: {
    type: "add" | "remove";
    data?: {
        name: string
    }
}) {
    return (
        <div className="modal">
            <h1 className="modal__title">{type === "add" ? "Criação de Produto" : "Edição de Produto"}</h1>
            <form action="" method="post" className="modal__form flexer">
                <div className="form-container">

                <div className="modal__form__left">
                    <div className="modal__form__image-preview">
                        <img id="image-preview" src="" alt="Preview" />
                    </div>
                    <input type="file" className="modal__form__image-button"
                     name="image" id="image-button"/>
                </div>
                <div className="modal__form__right">
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" placeholder="Nome do Produto" />
                    
                    <div className="modal__form__discount-price">
                        <div className="modal__form__discount">
                            <label htmlFor="desconto">Desconto (Opcional):</label>
                            <div className="modal__form__discount-input">
                                <input type="number" id="desconto" name="desconto" min="1" max="100" />
                                <div className="modal__form__discount-sign">%</div>
                            </div>
                        </div>
                        <div className="modal__form__price">
                            <label htmlFor="preco">Preço:</label>
                            <div className="modal__form__price-input">
                                <span className="modal__form__price-currency">R$</span>
                                <input type="number" id="preco" name="preco" step="0.01" />
                            </div>
                        </div>
                    </div>
                    
                    <label htmlFor="categoria">Categoria:</label>
                    <select id="categoria" name="categoria">
                        {/* Options go here */}
                    </select>
    
                    <label htmlFor="tipo">Tipo:</label>
                    <select id="tipo" name="tipo">
                        {/* Options go here */}
                    </select>
    
                    <label htmlFor="descricao">Descrição do Produto:</label>
                    <textarea id="descricao" name="descricao" placeholder="Digite algo"></textarea>
    
                    <label htmlFor="informacoes">Informações de armazenamento (Opcional):</label>
                    <textarea id="informacoes" name="informacoes" placeholder="Digite algo"></textarea>
                </div>
                </div>
                <input type="submit" className="modal__form__submit-button" value="CRIAR PRODUTO" />
            </form>
        </div>
    );
    
    
}