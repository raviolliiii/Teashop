import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../assets/loginSlice";

function RegisterPage() {
    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
    const [errMessage, setErrMessage] = useState('');
    const [isNotMatch, setIsNotMatch] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => dispatch(setLogin(res.data)))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (login.valid)
            navigate("/login")
    }, [login])

    const handleRegister = (e) => {
        e.preventDefault();
        if(e.target.password.value == e.target.passwordCheck.value){
            setIsNotMatch(false);
            axios.post('http://localhost:5000/register', {
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                phone: e.target.phone.value,
                country: e.target.country.value,
                city: e.target.city.value,
                street: e.target.street.value,
                houseNumber: e.target.houseNumber.value,
                flatNumber: e.target.flatNumber.value,
                postalCode: e.target.postalCode.value,
                postalCity: e.target.postalCity.value
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
        else
            setIsNotMatch(true);
    }

    return (
        <div id="registerPage" className="container">
            <div className="col-12 col-xl-6 mx-auto row m-5 p-3 rounded basketItem greenBox row">
                <form onSubmit={handleRegister}>
                    <h6>Login:</h6>
                    <input
                        className="form-control p-2 my-2"
                        placeholder="login*"
                        name="username"
                        required
                    />
                    <h6>E-mail:</h6>
                    <input
                        className="form-control p-2 my-2"
                        placeholder="E-mail*"
                        name="email"
                        type="email"
                        required
                    />
                    <h6>Hasło:</h6>
                    <input
                        className="form-control p-2 my-2"
                        placeholder="Hasło*"
                        name="password"
                        type="password"
                        minLength={8}
                        required
                    />
                    <h6>Powtórz hasło:</h6>
                    <input
                        className="form-control p-2 my-2"
                        placeholder="Powtórz hasło*"
                        name="passwordCheck"
                        type="password"
                        minLength={8}
                        required
                    />
                    <h6>Numer telefonu:</h6>
                    <input
                        className="form-control p-2 my-2"
                        placeholder="Numer telefonu"
                        name="phone"
                    />
                    <div className="row my-2">
                        <h5 className="text-center col-12">Dane adresowe:</h5>
                        <div className="col-6">
                            <input
                                className="form-control p-2 mb-2"
                                placeholder="Państwo"
                                name="country"
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className="form-control p-2 mb-2"
                                placeholder="Miasto"
                                name="city"
                            />
                        </div>
                        <div className="col-12">
                            <input
                                className="form-control p-2 my-2"
                                placeholder="Ulica"
                                name="street"
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className="form-control p-2 my-2"
                                placeholder="Nr domu"
                                name="houseNumber"
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className="form-control p-2 my-2"
                                placeholder="Nr mieszkania"
                                name="flatNumber"
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className="form-control p-2 my-2"
                                placeholder="Kod pocztowy"
                                name="postalCode"
                            />
                        </div>
                        <div className="col-6">
                            <input
                                className="form-control p-2 my-2"
                                placeholder="Poczta"
                                name="postalCity"
                            />
                        </div>
                        <div className="form-check col-12 m-3">
                                <input className="form-check-input" type="checkbox" required/>
                                <label className="form-check-label">
                                    Akceptuję regulamin serwisu
                                </label>
                            </div>
                    </div>
                    {errMessage == 'duplicateU' ? (
                        <div className="alert alert-danger text-center" role="alert">
                            Użytkownik z tą nazwą już istnieje
                        </div>
                    ) : ''}
                    {errMessage == 'duplicateE' ? (
                        <div className="alert alert-danger text-center" role="alert">
                            Podany e-mail jest już zajęty
                        </div>
                    ) : ''}
                    {isNotMatch ? (
                            <div className="alert alert-danger text-center" role="alert">
                                Hasła nie są identyczne
                            </div>
                        ) : ''}
                    <button className="col-12 btn my-2 p-2 text-middle fw-semibold" type="submit">
                        <h4>ZAREJESTRUJ SIĘ</h4>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;