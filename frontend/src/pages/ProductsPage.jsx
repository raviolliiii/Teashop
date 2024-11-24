import { useSelector } from "react-redux";

function ProductsPage(){
    const tag = useSelector((state) => state.search.tag);
    const query = useSelector((state) => state.search.query);

    return(
        <div>
            <h3>{tag}</h3>
            <h3>{query}</h3>
        </div>
    );
}

export default ProductsPage;