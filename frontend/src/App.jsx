import { Outlet } from "react-router-dom";
import SearchBar from "./partials/SearchBar";
import NavBar from "./partials/NavBar";
import Footer from "./partials/Footer";

function App(){
    return(
        <>
            <SearchBar/>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default App;