import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsPage() {
    const tag = useSelector((state) => state.search.tag);
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
                    return item.name.includes(query) || item.description.includes(query) || item.ingredients.includes(query);
                if (query == "")
                    item.tags.includes(tag);

                return item.tags.includes(tag) && (item.name.includes(query) || item.description.includes(query) || item.ingredients.includes(query));
            })
        );
    }, [tag, query])

    return (
        <div className="container-fluid m-5">
            <h3>{tag}</h3>
            <h3>{query}</h3>
            <div className="container-fluid row text-center">
                {filtered.map((item) => {
                    if (item.tags.includes("HERBATA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <img className="img-fluid rounded" src={"/img/tea" + (item.id % 9 + 1) + ".png"} />
                            <h5>{item.name}</h5>
                        </div>
                    else if (item.tags.includes("KAWA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <img className="img-fluid rounded" src={"/img/coffee1.png"} />
                            <h5>{item.name}</h5>
                        </div>
                    else if (item.tags.includes("ZIOLA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <img className="img-fluid rounded" src={"/img/herbs" + (item.id % 2 + 1) + ".png"} />
                            <h5>{item.name}</h5>
                        </div>
                    else if (item.tags.includes("AKCESORIA"))
                        return <div className="col-6 col-xl-3" key={item.id}>
                            <img className="img-fluid rounded" src={"/img/accessory" + (item.id % 2 + 1) + ".png"} />
                            <h5>{item.name}</h5>
                        </div>
                })
                }
            </div>
        </div>
    );
}

export default ProductsPage;