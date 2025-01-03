import { setQuery, setSort, setTag, setTagName } from "../assets/searchSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../assets/loginSlice";


function SearchBar() {
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => dispatch(setLogin(res.data)))
            .catch(err => console.log(err));
    }, [])

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
                    <Link to={"/"} className="navbar-brand m-0 p-2" type="button" onClick={resetSearch}>
                        <img src="img/logo.png" className="img-fluid m-0"/>
                    </Link>
                </div>
                <div className="col-9 col-xxl-6 row">
                    <form className="d-flex col-7 col-lg-5 m-xl-2" onSubmit={handleSearch}>
                        <input className="form-control me-2" name="query" type="search" placeholder="Szukaj" aria-label="Szukaj" />
                        <button className="btn" type="submit">
                            <i className="bi bi-search" />
                        </button>
                    </form>
                    <Link to={"/login"} className="Link col-2 col-lg-3 m-xl-2 m-1 text-middle">
                        <button className="btn w-100 fw-semibold">
                            <i className="bi bi-person-fill" />
                            <span className="d-none d-lg-inline"> {login.valid? "KONTO" : "ZALOGUJ"}</span>
                        </button>
                    </Link>
                    <Link to={"/basket"} className="Link col-2 col-lg-3 m-xl-2 m-1 text-middle">
                        <button className="btn w-100 fw-semibold">
                            <i className="bi bi-basket2" />
                            <span className="d-none d-lg-inline"> KOSZYK</span>
                        </button>
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default SearchBar;
