function BasketItem({item, quantity}) {
    const getImageSrc = (product) => {
        if (!product.tags) return '';
        if (product.tags.includes("HERBATA")) return `/img/tea${product.id % 9 + 1}.png`;
        if (product.tags.includes("KAWA")) return "/img/coffee1.png";
        if (product.tags.includes("ZIOLA")) return `/img/herbs${product.id % 2 + 1}.png`;
        if (product.tags.includes("AKCESORIA")) return `/img/accessory${product.id % 2 + 1}.png`;
    };

    return (
        <div className="row">
            <div className="col-2">
                <img className="img-fluid" src={getImageSrc(item)}/>
            </div>
        </div>
    )
};

export default BasketItem;