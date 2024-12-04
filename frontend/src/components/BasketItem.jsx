import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function BasketItem({ item, quantity }) {
    const [cookies, setCookies] = useCookies(['basket']);
    const [price, setPrice] = useState(0);

    const getImageSrc = (product) => {
        if (!product.tags) return '';
        if (product.tags.includes("HERBATA")) return `/img/tea${product.id % 9 + 1}.png`;
        if (product.tags.includes("KAWA")) return "/img/coffee1.png";
        if (product.tags.includes("ZIOLA")) return `/img/herbs${product.id % 2 + 1}.png`;
        if (product.tags.includes("AKCESORIA")) return `/img/accessory${product.id % 2 + 1}.png`;
    };

    useEffect(() => {
        if (item.tags.includes("AKCESORIA")) {
            setPrice((item.price * cookies.basket.find(e => e.item.id == item.id).quantity).toFixed(2));
        }
        else {
            let tempQuantity = cookies.basket.find(e => e.item.id == item.id).quantity;
            setPrice((item.price * tempQuantity[0] + item.price * tempQuantity[1] * 2 + item.price * tempQuantity[2] * 20).toFixed(2))
        }
    }, [cookies.basket])

    const handleInput = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 1) {
            value = value.replace(/^0+/, '');
        }
        e.target.value = value;

        if(e.target.value > 100)
            e.target.value = 100;
    };

    const handleBlur = (e) => {
        if (e.relatedTarget === null || !e.currentTarget.parentElement.parentElement.contains(e.relatedTarget)) {
            let index = cookies.basket.findIndex(element => { return element.item.id == item.id });
            let newCookies = cookies.basket;

            if (item.tags.includes("AKCESORIA")) {
                if (Number(e.target.value) > 0 && e.target.value.length > 0) {
                    newCookies[index].quantity = Number(e.target.value);
                    setCookies('basket', JSON.stringify(newCookies));
                }
                else {
                    newCookies.splice(index, 1);
                    setCookies('basket', JSON.stringify(newCookies));
                }
            }
            else {
                let tempQuantity = [
                    Number(e.currentTarget.parentElement.parentElement.items1.value),
                    Number(e.currentTarget.parentElement.parentElement.items2.value),
                    Number(e.currentTarget.parentElement.parentElement.items3.value)
                ]

                if (tempQuantity[0] + tempQuantity[1] + tempQuantity[2] > 0) {
                    newCookies[index].quantity = tempQuantity;
                    setCookies('basket', JSON.stringify(newCookies));
                }
                else {
                    newCookies.splice(index, 1);
                    setCookies('basket', JSON.stringify(newCookies));
                }
            }
        }

    };

    const handleDelete = () => {
        let index = cookies.basket.findIndex(element => { return element.item.id == item.id });
        let newCookies = cookies.basket;

        newCookies.splice(index, 1);
        setCookies('basket', JSON.stringify(newCookies));
    }

    return (
        <div className="row m-5 p-3 rounded basketItem">
            <div className="col-4 col-xl-2">
                <img className="img-fluid" src={getImageSrc(item)} />
            </div>
            <div className="col-8 col-xl-3 my-3">
                <Link className="Link" to={"/product/" + item.id}><h4>{item.name}</h4></Link>
                <h5>{item.price.toFixed(2)} zł</h5>
            </div>
            <div className="col-12 col-xl-4">
                <form name="basketForm">
                    <div className="input-group m-3">
                        <span className="input-group-text w-50">{item.tags.includes("AKCESORIA") ? "Sztuki" : "Opakowania 50g"}</span>
                        <input
                            className="form-control text-end"
                            defaultValue={item.tags.includes("AKCESORIA") ? quantity : quantity[0]}
                            name="items1"
                            type="number"
                            min={0}
                            max={100}
                            onInput={handleInput}
                            onBlur={handleBlur}
                        />
                    </div>

                    {item.tags.includes("AKCESORIA") ? "" : (
                        <div className="input-group m-3">
                            <span className="input-group-text w-50">Opakowania 100g</span>
                            <input
                                className="form-control text-end"
                                defaultValue={quantity[1]}
                                name="items2"
                                type="number"
                                min={0}
                                max={100}
                                onInput={handleInput}
                                onBlur={handleBlur}
                            />
                        </div>
                    )
                    }
                    {item.tags.includes("AKCESORIA") ? "" : (
                        <div className="input-group m-3">
                            <span className="input-group-text w-50">Opakowania 1kg</span>
                            <input
                                className="form-control text-end"
                                defaultValue={quantity[2]}
                                name="items3"
                                type="number"
                                min={0}
                                max={100}
                                onInput={handleInput}
                                onBlur={handleBlur}
                            />
                        </div>
                    )
                    }
                </form>
            </div>
            <div className="col row m-3">
                <div className="col-6 col-xl-12 text-xl-center">
                    <h4>Cena: {price}&nbsp;zł</h4>
                </div>
                <div className="col-6 col-xl-12 text-end text-xl-center">
                    <a type="button" onClick={handleDelete}>
                        <h1 className="my-xl-4">
                            <i className="bi bi-trash rounded" />
                        </h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BasketItem;