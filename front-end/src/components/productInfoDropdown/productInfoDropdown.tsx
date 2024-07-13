import "./productInfoDropdown.css"

export default function ProductInfoDropdown ({ title, content }:{
    title: string;
    content: string;
}) {

    return(
        <div className="productInfoDropdown">
            <input type="checkbox" className="productInfoDropdown__input" id={`dropdown-${title}`} />
            <label htmlFor={`dropdown-${title}`} className="productInfoDropdown__label">
                <h2 className="productInfoDropdown__label__title">{title}</h2>
                <span className="productInfoDropdown__label__icon"></span>
            </label>
            <article className="productInfoDropdown__content">{content}
            </article>
        </div>
    )
}
