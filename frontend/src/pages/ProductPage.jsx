import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie'
import data from "../assets/json.json"

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [cookies, setCookie] = useCookies(['basket']);

    useEffect(() => {
        /*axios.get('http://localhost:5000/tea')
            .then(res => setProduct(res.data.find((item) => { return item.id == id })))
            .catch(err => console.log(err))*/
        setProduct(data.find((item) => { return item.id == id }))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.items1.value > 0 || e.target.items2.value > 0 || e.target.items3.value > 0)
        {
            let order = {
                item: product,
                quantity: [
                    e.target.items1.value,
                    e.target.items2.value,
                    e.target.items3.value
                ]
            }
            if(cookies.basket)
                setCookie('basket', JSON.stringify([...cookies.basket, order]));
            else
                setCookie('basket', JSON.stringify([order]));

            
        }
        console.log(cookies.basket);
        
    }


    const getImageSrc = () => {
        if (!product.tags)
            return '';
        if (product.tags.includes("HERBATA"))
            return `/img/tea${product.id % 9 + 1}.png`;
        if (product.tags.includes("KAWA"))
            return "/img/coffee1.png";
        if (product.tags.includes("ZIOLA"))
            return `/img/herbs${product.id % 2 + 1}.png`;
        if (product.tags.includes("AKCESORIA"))
            return `/img/accessory${product.id % 2 + 1}.png`;
    }

    return (
        <div id="productPage" className="container mx-auto my-5">
            <div className="row">
                <div className="col-12 col-lg-4 mx-auto">
                    <h2 className="text-center">{product.name}</h2>
                    <img className="img-fluid" src={getImageSrc()} />
                </div>
                <div className="col-12 col-lg-7 m-5">
                    <h3>Cena: {product.price ? product.price.toFixed(2) : ""} zł</h3>
                    <form onSubmit={handleSubmit}>
                        <table className="w-100 table table-striped rounded-4 overflow-hidden text-center">
                        <thead>
                            <tr>
                                <th width="30%">Rozmiar</th>
                                <th width="30%">Cena</th>
                                <th>Ilość</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr>
                                <td>50g</td>
                                <td>{product.price ? product.price.toFixed(2) + " zł" : ""}</td>
                                <td><input className="form-control" defaultValue={0} name="items1" type="number" min={0} /></td>
                            </tr>
                            <tr>
                                <td>100g</td>
                                <td>{product.price ? (product.price * 2).toFixed(2) + " zł" : ""}</td>
                                <td><input className="form-control" defaultValue={0} name="items2" type="number" min={0} /></td>
                            </tr>
                            <tr>
                                <td>1kg</td>
                                <td>{product.price ? (product.price * 20).toFixed(2) + " zł" : ""}</td>
                                <td><input className="form-control" defaultValue={0} name="items3" type="number" min={0} /></td>
                            </tr>
                            <tr>
                                <td className="text-center" colSpan={3}>
                                    <button type="submit" className="btn btn-lg btn-success w-50">
                                        Dodaj do koszyka <i className="bi bi-basket2" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                    
                    <p><b>{product.description}</b></p>
                    {product.tags ? (product.tags.includes("AKCESORIA") ? '' : <p><b>Składniki: </b>{product.ingredients}</p>) : ""}
                    {product.tags ? (product.tags.includes("HERBATA") ? <p><b>Temperatura parzenia: </b>{product.temperature}℃</p> : '') : ""}
                    <p><b>Kraj pochodzenia: </b>{product.country}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;