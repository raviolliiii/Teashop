const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const tokenKey = "justANormalTokenKey";
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser())

//Tea management
mongoose.connect('mongodb://localhost:27017/tea')
    .then(() => console.log("Połączono z MongoDB"))
    .catch((err) => console.log(err));

const teaSchema = new mongoose.Schema({
    id: Number,
    name: String,
    ingredients: String,
    tags: [],
    price: Number, //If by weight, price per 50g
    temperature: Number,
    country: String,
    description: String
});


const TeaModel = mongoose.model('tea', teaSchema);

app.get('/tea', async (req, res) => {
    try {
        const tea = await TeaModel.find();
        res.json(tea);
        console.log(tea);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



//User management
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [],
    country: String,
    city: String,
    street: String,
    houseNumber: String,
    flatNumber: String,
    postalCode: String,
    postalCity: String,
    phone: String
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model('user', userSchema);

app.post('/register', async (req, res) => {
    const { username, email, password, country, city, street, houseNumber, flatNumber, postalCode, postalCity, phone } = req.body;
    try {
        if (await User.findOne({ username }))
            return res.status(400).send({ message: "duplicateU" });
        if (await User.findOne({ email }))
            return res.status(400).send({ message: "duplicateE" });

        const user = new User({ username, email, password, country, city, street, houseNumber, flatNumber, postalCode, postalCity, phone });
        await user.save();

        const token = jwt.sign({ userId: user._id }, tokenKey);
        user.password = undefined;
        res.cookie('token', token, { httpOnly: true }).send({ valid: true, user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
        if (!user) return res.status(400).send({ message: "invalid" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: "invalid" });

        const token = jwt.sign({ userId: user._id }, tokenKey);
        user.password = undefined;
        res.cookie('token', token, { httpOnly: true }).send({ valid: true, user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.post('/placeOrder', async (req, res) => {
    const order = req.body;
    console.log(order);
    const token = req.cookies.token;
    if (!token)
        return res.status(400).send({message: "login invalid"});

    try{
        const decoded = jwt.verify(token, tokenKey);
        const user = await User.findOne({_id: decoded.userId});
        user.orders = [...user.orders, order];
        await user.save();
        res.send({message: "orderPlaced"})
    } catch (err) {
        res.send({ valid: false, user: null });
    }
})

app.post('/logout', (req, res) => {
    res.clearCookie('token').send({ valid: false, user: null });
})

app.post('/auth', async (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.send({ valid: false, user: null });

    try {
        const decoded = jwt.verify(token, tokenKey);
        const user = await User.findOne({_id: decoded.userId});
        user.password = undefined;
        res.send({ valid: true, user: user });
    } catch (err) {
        res.send({ valid: false, user: null });
    }
});



app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));