import { useCookies } from "react-cookie";
import BasketItem from "../components/BasketItem";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BasketPage() {
    const [cookies, setCookies] = useCookies(['basket']);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        let newPrice = 0;
        if(cookies.basket)
        {
            cookies.basket.forEach(element => {
                if (element.item.tags.includes("AKCESORIA")) {
                    newPrice += element.item.price * element.quantity;
                } else {
                    newPrice += element.item.price * element.quantity[0] + element.item.price * element.quantity[1] * 2 + element.item.price * element.quantity[2] * 20;
                }
            });
            setPrice(newPrice.toFixed(2));
        }

    }, [cookies.basket]);

    return (
        <div id="basketPage" className="container mx-auto">
            <div className="alert alert-secondary text-center mx-5 my-4" role="alert">
                Do darmowej dostawy brakuje: {Number(price) > 80 ? "0" : (80 - Number(price)).toFixed(2)} zł
            </div>
            {cookies.basket && cookies.basket.length > 0 ? (
                <div>
                    {cookies.basket.map(item => (
                        <BasketItem key={item.item.id} item={item.item} quantity={item.quantity}></BasketItem>
                    ))}
                    <div id="basketSummary" className="col-12 col-xl-4 row d-flex justify-content-end ms-auto m-5 p-3 rounded">
                        <h4 className="col-6">Produkty:</h4>
                        <h4 className="col-6 text-end">{price}&nbsp;zł</h4>
                        <h4 className="col-6">Dostawa:</h4>
                        <h4 className="col-6 text-end">{price > 80 ? "Darmowa" : "11.00 zł"}</h4>
                        <h1 className="col-6">Razem:</h1>
                        <h1 className="col-6 text-end">{price > 80 ? price : (Number(price) + 11).toFixed(2)}&nbsp;zł</h1>
                        <Link to={"/summary"} className="Link col-12 m-2 text-middle">
                            <button className="btn w-100 fw-semibold p-2">
                                <h5 className="m-1">PRZEJDŹ DO PODSUMOWANIA</h5>
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center m-5">
                    <h3>Twój koszyk jest pusty</h3>
                </div>
            )}
        </div>
    );
}

export default BasketPage;
