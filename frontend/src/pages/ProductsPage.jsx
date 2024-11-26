import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import axios from 'axios'
import data from "../assets/json.json"

function ProductsPage() {
    const tag = useSelector((state) => state.search.tag);
    const tagName = useSelector((state) => state.search.tagName);
    const query = useSelector((state) => state.search.query);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tea')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setFiltered(
            products.filter((item) => {
                if (tag == "" && query == "")
                    return true;
                if (tag == "")
                    return item.name.toLowerCase().includes(query.toLowerCase())
                        || item.description.toLowerCase().includes(query.toLowerCase())
                        || item.ingredients.toLowerCase().includes(query.toLowerCase());
                if (query == "")
                    item.tags.includes(tag);

                return item.tags.includes(tag)
                    && (
                        item.name.toLowerCase().includes(query.toLowerCase())
                        || item.description.toLowerCase().includes(query.toLowerCase())
                        || item.ingredients.toLowerCase().includes(query.toLowerCase())
                    );
            })
        );
    }, [products, tag, query])

    return (
        <div id="productsPage" className="container-fluid m-0 p-0">
            <div id="searchPath" className="p-3">
                <div className="container row mx-auto">
                    <div className="col-6">
                        <h5>Strona główna{(tag != "") ? " > " + tagName : ""}{(query != "") ? " > " + query : ""}</h5>
                    </div>
                    <div className="col-6 row">
                        <div className="col-6 text-end h-auto">
                            <h6 className="align-middle">Sortuj wg: </h6>
                        </div>
                        <div className="col-6">
                            <select class="form-select">
                                <option value={1} selected>Nazwa, od A do Z</option>
                                <option value={2}>Nazwa, od Z do A</option>
                                <option value={3}>Cena, rosnąco</option>
                                <option value={4}>Cena, malejąco</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container row text-center mx-auto">
                {(filtered.length == 0) ? <h3 className="m-5">Brak wyników</h3> : ""}
                {filtered.map((item) => {
                    if (item.tags.includes("HERBATA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/tea" + (item.id % 9 + 1) + ".png"} />
                                <div>
                                    <h6>{item.name}</h6>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toPrecision(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("KAWA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/coffee1.png"} />
                                <div>
                                    <h6>{item.name}</h6>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toPrecision(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("ZIOLA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/herbs" + (item.id % 2 + 1) + ".png"} />
                                <div>
                                    <h6>{item.name}</h6>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toPrecision(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("AKCESORIA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/accessory" + (item.id % 2 + 1) + ".png"} />
                                <div>
                                    <h6>{item.name}</h6>
                                </div>
                                <div>
                                    <h3>{item.price.toPrecision(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                })
                }
            </div>
        </div>
    );
}

export default ProductsPage;