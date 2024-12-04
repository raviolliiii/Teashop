import CookiesConsent from "../components/CookiesConsent";

function Footer() {
    return (
        <>
            <CookiesConsent/> 
            <footer id="footer" className="navbar container-fluid border-bottom py-4">
                <div className="container mx-auto d-flex justify-content-between text-center">
                    <h4 className="col-2">O nas</h4>
                    <h4 className="col-2">Kontakt</h4>
                    <h4 className="col-2">Nasze sklepy</h4>
                    <h4 className="col-2">Media</h4>
                </div>
            </footer>
        </>
    );
}

export default Footer;