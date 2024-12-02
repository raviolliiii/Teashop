import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";

function SuccessPage() {
    const { date } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => {
                if (!res.data.valid)
                    navigate("/");
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div id="successPage"  className="container">
            <div className="container mx-auto text-center m-5 p-5 rounded greenBox">
                <h3>Zamówienie złożone</h3>
                <h4>Przewidywana data dostawy: {date}</h4>
                <Link to={"/"}>
                    <button className="col-12 col-xl-4 btn m-3 p-2 text-middle fw-semibold">
                        <h4> POWRÓT </h4>
                    </button>
                </Link>
            </div>
        </div>

    )
}

export default SuccessPage;