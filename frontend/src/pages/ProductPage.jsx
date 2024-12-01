import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [cookies, setCookie] = useCookies(['basket']);

    useEffect(() => {
        axios.get('http://localhost:5000/tea')
            .then(res => setProduct(res.data.find((item) => item.id == id)))
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product.tags.includes("AKCESORIA")) {
            if (e.target.items1.value > 0) {
                let order = {
                    item: product,
                    quantity: Number(e.target.items1.value)
                };

                if (cookies.basket) {
                    //only increase quantity for duplicates
                    let dupeIndex = cookies.basket.findIndex(item => { return item.item.id == id });
                    console.log(dupeIndex);
                    if (dupeIndex == -1) {
                        setCookie('basket', JSON.stringify([...cookies.basket, order]));
                    }
                    else {
                        let newCookies = cookies.basket;
                        newCookies[dupeIndex].quantity = Number(newCookies[dupeIndex].quantity) + Number(order.quantity);
                        setCookie('basket', JSON.stringify(newCookies));
                    }
                }
                else
                    setCookie('basket', JSON.stringify([order]));
            }
        }
        else {
            if (e.target.items1.value > 0 || e.target.items2.value > 0 || e.target.items3.value > 0) {
                let order = {
                    item: product,
                    quantity: [
                        Number(e.target.items1.value),
                        Number(e.target.items2.value),
                        Number(e.target.items3.value)
                    ]
                };
                if (cookies.basket) {
                    //only increase quantity for duplicates
                    let dupeIndex = cookies.basket.findIndex(item => { return item.item.id == id });
                    console.log(dupeIndex);
                    if (dupeIndex == -1) {
                        setCookie('basket', JSON.stringify([...cookies.basket, order]));
                    }
                    else {
                        let newCookies = cookies.basket;
                        newCookies[dupeIndex].quantity[0] = Number(newCookies[dupeIndex].quantity[0]) + Number(order.quantity[0]);
                        newCookies[dupeIndex].quantity[1] = Number(newCookies[dupeIndex].quantity[1]) + Number(order.quantity[1]);
                        newCookies[dupeIndex].quantity[2] = Number(newCookies[dupeIndex].quantity[2]) + Number(order.quantity[2]);
                        setCookie('basket', JSON.stringify(newCookies));
                    }
                }
                else
                    setCookie('basket', JSON.stringify([order]));
            }
        }
        console.log(cookies)
    };

    const handleInput = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 1) {
            value = value.replace(/^0+/, '');
        }
        e.target.value = value;
    };

    const getImageSrc = () => {
        if (!product.tags) return '';
        if (product.tags.includes("HERBATA")) return `/img/tea${product.id % 9 + 1}.png`;
        if (product.tags.includes("KAWA")) return "/img/coffee1.png";
        if (product.tags.includes("ZIOLA")) return `/img/herbs${product.id % 2 + 1}.png`;
        if (product.tags.includes("AKCESORIA")) return `/img/accessory${product.id % 2 + 1}.png`;
    };

    return (
        <div id="productPage" className="container-fluid mx-auto my-5">
            <div className="row m-5">
                <div className="col-12 col-xl-4 mx-auto text-center">
                    <h2>{product.name}</h2>
                    <img className="img-fluid" src={getImageSrc()} alt="product" />
                </div>
                <div className="col-12 col-xl-7 m-xl-4 p-xl-5">
                    <form onSubmit={handleSubmit}>
                        {product.tags && !product.tags.includes("AKCESORIA") ?
                            (
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
                                            <td><input className="form-control" defaultValue={0} name="items1" type="number" min={0} onInput={handleInput} /></td>
                                        </tr>
                                        <tr>
                                            <td>100g</td>
                                            <td>{product.price ? (product.price * 2).toFixed(2) + " zł" : ""}</td>
                                            <td><input className="form-control" defaultValue={0} name="items2" type="number" min={0} onInput={handleInput} /></td>
                                        </tr>
                                        <tr>
                                            <td>1kg</td>
                                            <td>{product.price ? (product.price * 20).toFixed(2) + " zł" : ""}</td>
                                            <td><input className="form-control" defaultValue={0} name="items3" type="number" min={0} onInput={handleInput} /></td>
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
                            ) : (
                                <table className="w-100 table table-striped rounded-4 overflow-hidden text-center">
                                    <thead>
                                        <tr>
                                            <th width="50%">Cena</th>
                                            <th>Ilość</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        <tr>
                                            <td>{product.price ? product.price.toFixed(2) + " zł" : ""}</td>
                                            <td><input className="form-control" defaultValue={0} name="items1" type="number" min={0} onInput={handleInput} /></td>
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
                            )
                        }
                    </form>
                    <p><b>{product.description}</b></p>
                    {product.tags && !product.tags.includes("AKCESORIA") && <p><b>Składniki: </b>{product.ingredients}</p>}
                    {product.tags && product.tags.includes("HERBATA") && <p><b>Temperatura parzenia: </b>{product.temperature}℃</p>}
                    <p><b>Kraj pochodzenia: </b>{product.country}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
