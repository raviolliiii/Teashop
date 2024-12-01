import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function SummaryPage() {
    const [login, setLogin] = useState({ valid: false, user: null });

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => setLogin(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div id="summaryPage">
            {login.valid ? (
                <div>
                    Podsumowanie
                </div>
            ) : (
                <div className="container mx-auto text-center m-5 p-5 rounded greenBox">
                    <h3>Aby przejść do podsumowania, musisz być zalogowany</h3>
                    <Link to={"/login"}>
                       <button className="col-12 col-xl-4 btn m-3 p-2 text-middle fw-semibold">
                            <h4> ZALOGUJ SIĘ </h4>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SummaryPage;