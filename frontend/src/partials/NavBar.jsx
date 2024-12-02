import { setCatOpen } from "../assets/searchSlice";
import SearchTag from "../components/searchTag";
import { useDispatch, useSelector } from "react-redux";
import { useState} from "react";

function NavBar() {
    const catOpen = useSelector((state) => state.search.catOpen);
    const dispatch = useDispatch();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = (newCat) => () => {
        if (isAnimating) 
            return; 
        
        setIsAnimating(true); 
        setTimeout(() => setIsAnimating(false), 300);

        if(newCat == catOpen)
            dispatch(setCatOpen(''));
        else
            dispatch(setCatOpen(newCat));
        console.log(catOpen);
    }
    
    return (
        <div id="navBar" className="container-fluid m-0 p-0">
            <nav className="navbar navbar-expand-lg">
                <div className="container d-flex justify-content-center">
                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div id="navbarContent" className="collapse navbar-collapse row" >
                        <ul className="navbar-nav d-flex justify-content-evenly w-100 col-12">
                            <li className="nav-item">
                                <h5>
                                    <a className="nav-link dropdown-toggle active"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#teaCollapse"
                                        aria-expanded="false"
                                        onClick={() => handleToggle('tea')}
                                        role="button">

                                        Herbaty

                                    </a>
                                </h5>
                            </li>
                            <li className="nav-item">
                                <h5>
                                    <a className="nav-link dropdown-toggle active"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#coffeeCollapse"
                                        aria-expanded="false"
                                        onClick={() => handleToggle('coffee')}
                                        role="button">

                                        Kawy
                                    </a>
                                </h5>
                            </li>
                            <li className="nav-item">
                                <h5>
                                    <a className="nav-link dropdown-toggle active"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#herbsCollapse"
                                        aria-expanded="false"
                                        onClick={() => handleToggle('herbs')}
                                        role="button">

                                        Zioła
                                    </a>
                                </h5>
                            </li>
                            <li className="nav-item">
                                <h5>
                                    <a className="nav-link dropdown-toggle active"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#accessoriesCollapse"
                                        aria-expanded="false"
                                        onClick={() => handleToggle('accessories')}
                                        role="button">

                                        Akcesoria
                                    </a>
                                </h5>
                            </li>
                        </ul>

                        <div className="container-fluid" id="groupCollapse">
                            <div 
                                id="teaCollapse" 
                                className={`collapse border-top ${catOpen == 'tea' ? 'show' : ''}`} 
                                data-bs-parent="#groupCollapse">

                                <div className="container-fluid row p-3">
                                    <div className="col-12">
                                        <h3><SearchTag text={"HERBATY"} tag={"HERBATA"} /></h3>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h5><SearchTag text={"HERBATY KLASYCZNE"} tag={"HERBATA_KLASYCZNA"} /></h5>
                                        <SearchTag text={"HERBATA CZARNA"} tag={"HERBATA_CZARNA"} />
                                        <SearchTag text={"HERBATA ZIELONA"} tag={"HERBATA_ZIELONA"} />
                                        <SearchTag text={"HERBATA BIAŁA"} tag={"HERBATA_BIALA"} />
                                        <SearchTag text={"HERBATA ŻÓŁTA"} tag={"HERBATA_ZOLTA"} />
                                        <SearchTag text={"HERBATA PU ERH"} tag={"HERBATA_PU_ERH"} />
                                        <SearchTag text={"HERBATA OOLONG"} tag={"HERBATA_OOLONG"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h5><SearchTag text={"KOMPOZYCJE HERBACIANE"} tag={"KOMPOZYCJA_HERBACIANA"} /></h5>
                                        <SearchTag text={"HERBATA CZARNA Z DODATKAMI"} tag={"HERBATA_CZARNA_Z_DODATKAMI"} />
                                        <SearchTag text={"HERBATA ZIELONA Z DODATKAMI"} tag={"HERBATA_ZIELONA_Z_DODATKAMI"} />
                                        <SearchTag text={"HERBATA BIAŁA Z DODATKAMI"} tag={"HERBATA_BIALA_Z_DODATKAMI"} />
                                        <SearchTag text={"HERBATA ŻÓŁTA Z DODATKAMI"} tag={"HERBATA_ZOLTA_Z_DODATKAMI"} />
                                        <SearchTag text={"HERBATA PU ERH Z DODATKAMI"} tag={"HERBATA_PU_ERH_Z_DODATKAMI"} />
                                        <SearchTag text={"HERBATA OOLONG Z DODATKAMI"} tag={"HERBATA_OOLONG_Z_DODATKAMI"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <h5><SearchTag text={"POZOSTAŁE"} tag={"POZOSTALE"} /></h5>
                                        <SearchTag text={"ROOIBOS"} tag={"ROOIBOS"} />
                                        <SearchTag text={"ROOIBOS Z DODATKAMI"} tag={"ROOIBOS_Z_DODATKAMI"} />
                                        <SearchTag text={"MATCHA"} tag={"MATCHA"} />
                                        <SearchTag text={"YERBA MATE"} tag={"YERBA_MATA"} />
                                        <SearchTag text={"KOMPOZYCJE OWOCOWE"} tag={"KOMPOZYCJA_OWOCOWA"} />
                                    </div>
                                </div>
                            </div>

                            <div 
                                id="coffeeCollapse" 
                                className={`collapse border-top ${catOpen == 'coffee' ? 'show' : ''}`} 
                                data-bs-parent="#groupCollapse">

                                <div className="container-fluid row p-3">
                                    <div className="col-12">
                                        <h3><SearchTag text={"KAWY"} tag={"KAWA"} /></h3>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"KAWY KLASYCZNE"} tag={"KAWA_KLASYCZNA"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"KAWY SMAKOWE"} tag={"KAWA_SMAKOWA"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"NAPOJE KAWOWE"} tag={"NAPOJ_KAWOWY"} />
                                    </div>

                                </div>
                            </div>

                            <div 
                                id="herbsCollapse" 
                                className={`collapse border-top ${catOpen == 'herbs' ? 'show' : ''}`} 
                                data-bs-parent="#groupCollapse">

                                <div className="container-fluid row p-3">
                                    <div className="col-12">
                                        <h3><SearchTag text={"ZIOŁA"} tag={"ZIOLA"} /></h3>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"ZIOŁA KLASYCZNE"} tag={"ZIOLA_KLASYCZNE"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"KOMPOZYCJE ZIOŁOWE"} tag={"KOMPOZYCJA_ZIOLOWA"} />
                                    </div>
                                </div>
                            </div>

                            <div 
                                id="accessoriesCollapse" 
                                className={`collapse border-top ${catOpen == 'accessories' ? 'show' : ''}`} 
                                data-bs-parent="#groupCollapse">

                                <div className="container-fluid row p-3">
                                    <div className="col-12">
                                        <h3><SearchTag text={"AKCESORIA"} tag={"AKCESORIA"} /></h3>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"DZBANKI DO HERBATY"} tag={"DZBANKI_DO_HERBATY"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"FILIŻANKI"} tag={"FILIŻANKI"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"POJEMNIKI"} tag={"POJEMNIKI"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"FILTRY"} tag={"FILTRY"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"TERMOMETRY"} tag={"TERMOMETRY"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"AKCESORIA DO MATCHY"} tag={"AKCESORIA_DO_MATCHY"} />
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <SearchTag text={"AKCESORIA DO YERBA MATE"} tag={"AKCESORIA_DO_YERBA_MATE"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default NavBar;
