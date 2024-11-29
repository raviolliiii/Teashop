import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import axios from 'axios'
import data from "../assets/json.json"
import { setSort } from "../assets/searchSlice";
import { Link } from "react-router-dom";

function ProductsPage() {
    const tag = useSelector((state) => state.search.tag);
    const tagName = useSelector((state) => state.search.tagName);
    const query = useSelector((state) => state.search.query);
    const sort = useSelector((state) => state.search.sort);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        /*axios.get('http://localhost:5000/tea')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));*/
        setProducts(data);
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
            }).toSorted((a, b) => {
                switch (sort) {
                    case 1:
                        return a.name.localeCompare(b.name);
                    case 2:
                        return -a.name.localeCompare(b.name);
                    case 3:
                        if (a.price < b.price) return -1;
                        if (a.price > b.price) return 1;
                        return 0;
                    case 4:
                        if (a.price < b.price) return 1;
                        if (a.price > b.price) return -1;
                        return 0;
                }
            })
        );
    }, [products, tag, query, sort])

    const handleSelect = (e) => {
        dispatch(setSort(Number(e.target.value)));
    };

    return (
        <div id="productsPage" className="container-fluid m-0 p-0">
            <div id="searchPath" className="p-3">
                <div className="container row mx-auto">
                    <div className="col-6">
                        <h5>Strona główna{(tag != "") ? " > " + tagName : ""}{(query != "") ? " > " + query : ""}</h5>
                    </div>
                    <div className="col-6 row">
                        <div className="col-6 text-end">
                            <h5>Sortuj wg: </h5>
                        </div>
                        <div className="col-6">
                            <select className="form-select" value={sort} onChange={handleSelect}>
                                <option value={1}>Nazwa, od A do Z</option>
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
                                <Link className="Link" to={"/product/" + item.id}><img className="img-fluid" src={"/img/tea" + (item.id % 9 + 1) + ".png"} /></Link>
                                <div>
                                    <Link className="Link" to={"/product/" + item.id}><h6>{item.name}</h6></Link>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toFixed(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("KAWA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <Link className="Link" to={"/product/" + item.id}><img className="img-fluid" src={"/img/coffee1.png"} /></Link>
                                <div>
                                    <Link className="Link" to={"/product/" + item.id}><h6>{item.name}</h6></Link>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toFixed(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("ZIOLA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <Link className="Link" to={"/product/" + item.id}><img className="img-fluid" src={"/img/herbs" + (item.id % 2 + 1) + ".png"} /></Link>
                                <div>
                                    <Link className="Link" to={"/product/" + item.id}><h6>{item.name}</h6></Link>
                                    <div className="ingredients">{item.ingredients}</div>
                                </div>
                                <div>
                                    <h3>{item.price.toFixed(2) + " zł"}</h3>
                                </div>
                            </div>
                        </div>
                    else if (item.tags.includes("AKCESORIA"))
                        return <div className="col-6 col-xl-3 productsCard" key={item.id}>
                            <div className="w-75">
                                <Link className="Link" to={"/product/" + item.id}><img className="img-fluid" src={"/img/accessory" + (item.id % 2 + 1) + ".png"} /></Link>
                                <div>
                                    <Link className="Link" to={"/product/" + item.id}><h6>{item.name}</h6></Link>
                                </div>
                                <div>
                                    <h3>{item.price.toFixed(2) + " zł"}</h3>
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