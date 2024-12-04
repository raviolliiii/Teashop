import CookiesConsent from "../components/CookiesConsent";

function Footer() {
    return (
        <>
            <CookiesConsent/> 
            <footer id="footer" className="navbar border-bottom d-flex justify-content-center p-4">
                <h4 className="col-2">O nas</h4>
                <h4 className="col-2">Kontakt</h4>
                <h4 className="col-2">Strona z herbatą</h4>
            </footer>
        </>
    );
}

export default Footer;