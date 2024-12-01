import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    const [login, setLogin] = useState({ valid: false, user: null });
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => setLogin(res.data))
            .catch(err => console.log(err));
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', {
            identifier: e.target.identifier.value,
            password: e.target.password.value
        }, {
            withCredentials: true
        })
            .then(res => {
                setLogin(res.data);
                setErrMessage('');
            })
            .catch(err => {
                setErrMessage(err.response ? err.response.data.message : '');
            });
    }

    const handleLogout = () => {
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
            .then(res => setLogin(res.data))
            .catch(err => console.log(err));
    }

    return (
        <div id="loginPage" className="container">
            {login.valid ? (
                <div>
                    <h1>Witaj, {login.user.username}</h1>
                    <button className="btn btn-success" onClick={handleLogout}>Wyloguj</button>
                </div>
            ) : (
                <div className="col-12 col-xl-6 mx-auto row m-5 p-3 rounded basketItem greenBox row">
                    <form onSubmit={handleLogin}>
                        <input
                            className="form-control p-2 my-2"
                            placeholder="login lub e-mail*"
                            name="identifier"
                        />
                        <input
                            className="form-control p-2 my-2"
                            placeholder="hasło*"
                            name="password"
                        />
                        {errMessage == 'invalid' ? (
                            <div className="alert alert-danger text-center" role="alert">
                                Login lub hasło nieprawidłowe
                            </div>
                        ) : ''}
                        <div className="text-end my-2 fw-bold">
                            <Link className="Link" to={"/register"}>Nie masz konta? Zarejestruj się</Link>
                        </div>

                        <button className="col-12 btn my-2 p-2 text-middle fw-semibold" type="submit">
                            <h4>ZALOGUJ SIĘ</h4>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;