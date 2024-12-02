import { Link} from "react-router-dom"

function NotFound() {
    return (
        <div id="notFound"  className="container">
            <div className="container mx-auto text-center m-5 p-5 rounded greenBox">
                <h3>Strona nie istnieje</h3>
                <Link to={"/"}>
                    <button className="col-12 col-xl-4 btn m-3 p-2 text-middle fw-semibold">
                        <h4> POWRÓT </h4>
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default NotFound;