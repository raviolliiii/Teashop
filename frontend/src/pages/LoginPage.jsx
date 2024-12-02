import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, setLogin } from "../assets/loginSlice";

function LoginPage() {
    const [errMessage, setErrMessage] = useState('');
    const [selected, setSelected] = useState(0);
    const login = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => dispatch(setLogin(res.data)))
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
                dispatch(setLogin(res.data));
                setErrMessage('');
            })
            .catch(err => {
                setErrMessage(err.response ? err.response.data.message : '');
            });
    }

    const handleLogout = () => {
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
            .then(res => dispatch(logOut()))
            .catch(err => console.log(err));
    }

    const handleSelect = (e) => {
        setSelected(e.target.value)
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let newUser = { ...login.user, [name]: value };

        axios.post('http://localhost:5000/updateUser', newUser, { withCredentials: true })
            .then(res => dispatch(setLogin(res.data)))
            .catch(err => console.log(err));
    }

    return (
        <div id="loginPage" className="container">
            {login.valid ? (
                <div>
                    <div className="d-flex justify-content-between m-5">
                        <h1>Witaj, {login.user.username}</h1>
                        <button className="btn fw-semibold px-5" onClick={handleLogout}><h5>WYLOGUJ</h5></button>
                    </div>
                    <div className="btn-group btn-group-lg col-12" role="group">
                        <input
                            type="radio"
                            name="btnradio"
                            id="btnradio1"
                            className="btn-check"
                            value={0}
                            onChange={handleSelect}
                            defaultChecked />
                        <label className="btn fw-semibold" htmlFor="btnradio1">Dane do wysyłki</label>

                        <input
                            type="radio"
                            name="btnradio"
                            id="btnradio2"
                            className="btn-check"
                            value={1}
                            onChange={handleSelect} />
                        <label className="btn fw-semibold" htmlFor="btnradio2">Zamówienia w realizacji</label>

                        <input
                            type="radio"
                            name="btnradio"
                            id="btnradio3"
                            className="btn-check"
                            value={2}
                            onChange={handleSelect} />
                        <label className="btn fw-semibold" htmlFor="btnradio3">Zamówienia zrealizowane</label>
                    </div>
                    {selected == 0 ? (
                        <div className="m-5">
                            <div className="mx-auto row m-5 p-5 rounded greenBox">
                                <form>
                                    <div className="row">
                                        <div className="col-12">
                                            <h6 className="mx-2">Numer Telefonu</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Numer telefonu"
                                                name="phone"
                                                defaultValue={login.user.phone}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Państwo</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Państwo"
                                                name="country"
                                                defaultValue={login.user.country}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Miasto</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Miasto"
                                                name="city"
                                                defaultValue={login.user.city}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <h6 className="mx-2">Ulica</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Ulica"
                                                name="street"
                                                defaultValue={login.user.street}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Nr domu</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Nr domu"
                                                name="houseNumber"
                                                defaultValue={login.user.houseNumber}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Nr mieszkania</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Nr mieszkania"
                                                name="flatNumber"
                                                defaultValue={login.user.flatNumber}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Kod pocztowy</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Kod pocztowy"
                                                name="postalCode"
                                                defaultValue={login.user.postalCode}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Poczta</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Poczta"
                                                name="postalCity"
                                                defaultValue={login.user.postalCity}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : ""}
                    {selected == 1 ? (
                        <div className="m-5">
                            <div className="mx-auto row m-5 p-5 rounded greenBox">
                                <table className="table w-100 mx-auto table-striped rounded-2 overflow-hidden mx-5">
                                    <thead>
                                        <tr>
                                            <th>Zamówienie</th>
                                            <th>Data zamówienia</th>
                                            <th>Adres</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {login.user.orders.map(order => (
                                            <td>
                                                {order.products.map(product => (
                                                    <p className="m-0 p-0">{product.item.name}</p>
                                                ))}
                                            </td>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : ""}
                    {selected == 2 ? (
                        <div>
                            C
                        </div>
                    ) : ""}
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
                            type="password"
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