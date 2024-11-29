import { useCookies } from "react-cookie";
import BasketItem from "../components/BasketItem";

function BasketPage() {
    const [cookies] = useCookies(['basket']);

    return (
        <div id="basketPage" className="container mx-auto">
            {cookies.basket && cookies.basket.length > 0 ? 
            (
                cookies.basket.map(item => (
                    <BasketItem key={item.item.id} item={item.item} quantity={item.quantity}></BasketItem>
                ))
            ) : (
                <div className="w-100 text-center m-5">
                    <h3>Twój koszyk jest pusty</h3>
                </div>
            )}
        </div>
    );
}

export default BasketPage;
