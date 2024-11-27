import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import axios from 'axios'
import data from "../assets/json.json"

function ProductsPage() {
    const tag = useSelector((state) => state.search.tag);
    const query = useSelector((state) => state.search.query);
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);

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
                    return item.name.includes(query) || item.description.includes(query) || item.ingredients.includes(query);
                if (query == "")
                    item.tags.includes(tag);

                return item.tags.includes(tag) && (item.name.includes(query) || item.description.includes(query) || item.ingredients.includes(query));
            })
        );
    }, [products, tag, query])

    return (
        <div className="container-fluid m-5 font">
            <h3>{tag}</h3>
            <h3>{query}</h3>
            <div className="container row text-center mx-auto">
                {filtered.map((item) => {
                    if (item.tags.includes("HERBATA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/tea" + (item.id % 9 + 1) + ".png"} />
                                <h5 className="jasper">{item.name}</h5>
                                <p>{item.ingredients}</p>
                            </div>
                        </div>
                    else if (item.tags.includes("KAWA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/coffee1.png"} />
                                <h5 className="jasper">{item.name}</h5>
                                <p>{item.ingredients}</p>
                            </div>
                        </div>
                    else if (item.tags.includes("ZIOLA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/herbs" + (item.id % 2 + 1) + ".png"} />
                                <h5 className="jasper">{item.name}</h5>
                                <p>{item.ingredients}</p>
                            </div>
                        </div>
                    else if (item.tags.includes("AKCESORIA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <div className="w-75">
                                <img className="img-fluid" src={"/img/accessory" + (item.id % 2 + 1) + ".png"} />
                                <h5 className="jasper">{item.name}</h5>
                                <p>{item.ingredients}</p>
                            </div>
                        </div>
                })
                }
            </div>
        </div>
    );
}

export default ProductsPage;