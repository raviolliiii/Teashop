import SearchTag from "../components/searchTag";


function NavBar() {
    return (
        <div className="container-fluid m-0 p-0">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div id="navbarContent" className="collapse navbar-collapse" >
                        <ul className="navbar-nav d-flex justify-content-evenly w-100">
                            <li className="nav-item">
                                <a className="nav-link dropdown-toggle active"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#teaCollapse"
                                    aria-expanded="false"
                                    role="button">

                                    Herbaty
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link dropdown-toggle active"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#coffeeCollapse"
                                    aria-expanded="false"
                                    role="button">

                                    Kawy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link dropdown-toggle active"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#herbsCollapse"
                                    aria-expanded="false"
                                    role="button">

                                    Zioła
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link dropdown-toggle active"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accessoriesCollapse"
                                    aria-expanded="false"
                                    role="button">

                                    Akcesoria
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid" id="groupCollapse">
                <div id="teaCollapse" className="collapse"
                    data-bs-parent="#groupCollapse">
                    
                    <div className="container-fluid row">
                        <div className="col-lg-4 col-12">
                            <h4><SearchTag text={"HERBATY KLASYCZNE"}/></h4>
                            <SearchTag text={"HERBATA CZARNA"}/>
                            <SearchTag text={"HERBATA ZIELONA"}/>
                            <SearchTag text={"HERBATA BIAŁA"}/>
                            <SearchTag text={"HERBATA ŻÓŁTA"}/>
                            <SearchTag text={"HERBATA PU ERH"}/>
                            <SearchTag text={"HERBATA OOLONG"}/>
                        </div>
                        <div className="col-lg-4 col-12">
                            <h4><SearchTag text={"KOMPOZYCJE HERBACIANE"}/></h4>
                            <SearchTag text={"HERBATA CZARNA Z DODATKAMI"}/>
                            <SearchTag text={"HERBATA ZIELONA Z DODATKAMI"}/>
                            <SearchTag text={"HERBATA BIAŁA Z DODATKAMI"}/>
                            <SearchTag text={"HERBATA ŻÓŁTA Z DODATKAMI"}/>
                            <SearchTag text={"HERBATA PU ERH Z DODATKAMI"}/>
                            <SearchTag text={"HERBATA OOLONG Z DODATKAMI"}/>
                        </div>
                        <div className="col-lg-4 col-12">
                            <h4><SearchTag text={"POZOSTAŁE"}/></h4>
                            <SearchTag text={"ROOIBOS"}/>
                            <SearchTag text={"ROOIBOS Z DODATKAMI"}/>
                            <SearchTag text={"MATCHA"}/>
                            <SearchTag text={"YERBA MATE"}/>
                            <SearchTag text={"KOMPOZYCJE OWOCOWE"}/>
                        </div>
                    </div>
                </div>

                <div id="coffeeCollapse" className="collapse"
                    data-bs-parent="#groupCollapse">
                    <h1>KAWA</h1>
                </div>

                <div id="herbsCollapse" className="collapse"
                    data-bs-parent="#groupCollapse">
                    <h1>ZIOŁA</h1>
                </div>

                <div id="accessoriesCollapse" className="collapse"
                    data-bs-parent="#groupCollapse">
                    <h1>AKCESORIA</h1>
                </div>
            </div>

        </div>
    );
}

export default NavBar;