import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

function SummaryPage() {
    const [login, setLogin] = useState({ valid: false, user: null });
    const [cookies, setCookies] = useCookies(['basket']);
    const [price, setPrice] = useState(0);
    const [diffAddress, setDiffAddress] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:5000/auth', {}, { withCredentials: true })
            .then(res => setLogin(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        let newPrice = 0;
        if (cookies.basket) {
            cookies.basket.forEach(element => {
                if (element.item.tags.includes("AKCESORIA")) {
                    newPrice += element.item.price * element.quantity;
                } else {
                    newPrice += element.item.price * element.quantity[0] + element.item.price * element.quantity[1] * 2 + element.item.price * element.quantity[2] * 20;
                }
            });
            setPrice(newPrice.toFixed(2));
        }

    }, [cookies.basket]);

    const handleChange = (e) => {
        setDiffAddress(!diffAddress);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        if (date.getDay() == 0)
            date.setDate(date.getDate() + 3)
        else if (date.getDay() == 6)
            date.setDate(date.getDate() + 4)
        else if (date.getDay() == 5)
            date.setDate(date.getDate() + 5)
        else
            date.setDate(date.getDate() + 2)

        let newOrder = {
            products: cookies.basket,
            price: price,
            contact: {
                email: e.target.email1.value,
                phone: e.target.phone1.value
            },
            address1: {
                country: e.target.country1.value,
                city: e.target.city1.value,
                street: e.target.street1.value,
                houseNumber: e.target.houseNumber1.value,
                flatNumber: e.target.flatNumber1.value,
                postalCode: e.target.postalCode1.value,
                postalCity: e.target.postalCity1.value
            },
            isDiffAddress: diffAddress,
            address2: diffAddress ? {
                country: e.target.country2.value,
                city: e.target.city2.value,
                street: e.target.street2.value,
                houseNumber: e.target.houseNumber2.value,
                flatNumber: e.target.flatNumber2.value,
                postalCode: e.target.postalCode2.value,
                postalCity: e.target.postalCity2.value
            } : null,
            payment: e.target.payment.value,
            expectedDate: (date.getDate() + 2) + "-" + (date.getMonth() + 1) + "-" + (date.getFullYear())
        }

        axios.post('http://localhost:5000/placeOrder', newOrder, { withCredentials: true })
            .then(res => {
                console.log(res),
                setCookies('basket', null);
                navigate("/orderSuccess");
            })
            .catch(err => console.log(err));
    }

    return (
        <div id="summaryPage">
            {login.valid && cookies.basket && cookies.basket.length > 0 ? (
                <div id="summaryPage" className="container">
                    <div className="mx-auto row m-5 px-5 rounded greenBox">
                        <h4 className="mt-5">1. Produkty:</h4>
                        <table className="table w-100 mx-auto table-striped rounded-2 overflow-hidden mx-5">
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th>Ilość</th>
                                    <th>Cena</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {cookies.basket.map(element => (
                                    <tr key={element.item.id}>
                                        <td>{element.item.name}</td>
                                        <td>{element.item.tags.includes("AKCESORIA") ? (
                                            `Sztuk: ${element.quantity}`
                                        ) : (
                                            <>
                                                {(element.quantity[0] > 0) ? (<>Opakowań 50g: {element.quantity[0]}<br /></>) : ""}
                                                {(element.quantity[1] > 0) ? (<>Opakowań 100g: {element.quantity[1]}<br /></>) : ""}
                                                {(element.quantity[2] > 0) ? (<>Opakowań 1kg: {element.quantity[2]}<br /></>) : ""}
                                            </>
                                        )}</td>
                                        <td>{element.item.tags.includes("AKCESORIA") ? (
                                            `${(element.quantity * element.item.price).toFixed(2)} zł`
                                        ) : (
                                            `${((element.quantity[0] + element.quantity[1] * 2 + element.quantity[2] * 20) * element.item.price).toFixed(2)} zł`
                                        )}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="table-group-divider">
                                <tr>
                                    <td colSpan={2}>Produkty</td>
                                    <td>{price}&nbsp;zł</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Dostawa</td>
                                    <td>{price > 80 ? "Darmowa" : "11.00 zł"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <h3>Razem</h3>
                                    </td>
                                    <td>
                                        <h3>{price > 80 ? price : (Number(price) + 11).toFixed(2)}&nbsp;zł</h3>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <h4 className="mt-5">2. Dane do faktury:</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <h6 className="mx-2">E-mail</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="E-mail*"
                                        name="email1"
                                        defaultValue={login.user.email}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Numer Telefonu</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Numer telefonu*"
                                        name="phone1"
                                        defaultValue={login.user.phone}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Państwo</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Państwo*"
                                        name="country1"
                                        defaultValue={login.user.country}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Miasto</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Miasto*"
                                        name="city1"
                                        defaultValue={login.user.city}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <h6 className="mx-2">Ulica</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Ulica*"
                                        name="street1"
                                        defaultValue={login.user.street}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Nr domu</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Nr domu*"
                                        name="houseNumber1"
                                        defaultValue={login.user.houseNumber}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Nr mieszkania</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Nr mieszkania"
                                        name="flatNumber1"
                                        defaultValue={login.user.flatNumber}
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Kod pocztowy</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Kod pocztowy*"
                                        name="postalCode1"
                                        defaultValue={login.user.postalCode}
                                        required
                                    />
                                </div>
                                <div className="col-6">
                                    <h6 className="mx-2">Poczta</h6>
                                    <input
                                        className="form-control p-2 my-2"
                                        placeholder="Poczta*"
                                        name="postalCity1"
                                        defaultValue={login.user.postalCity}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-check my-3">
                                <input name="diffAddress" className="form-check-input" type="checkbox" onChange={handleChange} />
                                <label className="form-check-label">
                                    Inne dane do wysyłki
                                </label>
                            </div>
                            {diffAddress ?
                                <>
                                    <h4 className="mt-5">3. Dane do wysyłki:</h4>
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="mx-2">Państwo</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Państwo*"
                                                name="country2"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Miasto</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Miasto*"
                                                name="city2"
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <h6 className="mx-2">Ulica</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Ulica*"
                                                name="street2"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Nr domu</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Nr domu*"
                                                name="houseNumber2"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Nr mieszkania</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Nr mieszkania"
                                                name="flatNumber2"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Kod pocztowy</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Kod pocztowy*"
                                                name="postalCode2"
                                                required
                                            />
                                        </div>
                                        <div className="col-6">
                                            <h6 className="mx-2">Poczta</h6>
                                            <input
                                                className="form-control p-2 my-2"
                                                placeholder="Poczta*"
                                                name="postalCity2"
                                                required
                                            />
                                        </div>
                                    </div>
                                </> : ""}
                            <h4 className="mt-5">{diffAddress ? "4." : "3."} Sposób płatności</h4>
                            <select name="payment" className="form-select" required>
                                <option value="Blik">Blik</option>
                                <option value="Karta">Karta</option>
                                <option value="Przelew">Przelew</option>
                                <option value="Przelew tradycyjny">Przelew tradycyjny</option>
                            </select>

                            <div className="col-12 col-xl-6 mx-auto">
                                <button className="btn w-100 my-5 p-2" type="submit">
                                    <h4>ZŁÓŻ ZAMÓWIENIE</h4>
                                </button>
                            </div>
                        </form>
                    </div>
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