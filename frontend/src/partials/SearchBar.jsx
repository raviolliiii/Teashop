import { useDispatch } from "react-redux";
import { setQuery, setSort, setTag, setTagName } from "../assets/searchSlice";
import { Link } from "react-router-dom";



function SearchBar() {
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(setQuery(e.target.query.value));

        e.target.query.value = "";
    }

    const resetSearch = () => {
        dispatch(setQuery(""));
        dispatch(setTag(""));
        dispatch(setTagName(""));
        dispatch(setSort(1));
    }

    return (
        <nav id="searchBar" className="navbar border-bottom d-flex justify-content-center">
            <div className="container-lg row">
                <div className="col-3 col-xxl-6">
                    <Link to={"/"} className="navbar-brand m-xl-2" type="button" onClick={resetSearch}>TeaShop Brand Logo</Link>
                </div>
                <div className="col-9 col-xxl-6 row">
                    <form className="d-flex col-7 col-lg-5 m-xl-2" onSubmit={handleSearch}>
                        <input className="form-control me-2" name="query" type="search" placeholder="Szukaj" aria-label="Szukaj" />
                        <button className="btn" type="submit">
                            <i className="bi bi-search" />
                        </button>
                    </form>
                    <button className="col-2 col-lg-3 btn m-xl-2 m-1 text-middle fw-semibold">
                        <i className="bi bi-person-fill" />
                        <span className="d-none d-lg-inline"> ZALOGUJ SIĘ</span>
                    </button>
                    <button className="col-2 col-lg-3 btn m-xl-2 m-1 text-middle fw-semibold">
                        <i className="bi bi-basket2" />
                        <span className="d-none d-lg-inline"> KOSZYK</span>
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default SearchBar;