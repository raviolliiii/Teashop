const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/tea')
    .then(() => console.log("Połączono z MongoDB"))
    .catch((err) => console.log(err));

const teaSchema = new mongoose.Schema({
    id: Number,
    name: String,
    ingredients: String,
    type: [],
    price_per_100g: Number,
    temperature: String,
    country: String,
    description: String
});


const TeaModel = mongoose.model('tea', teaSchema);

app.get('/tea', async (req, res) => {
    try{
        const tea = await TeaModel.find();
        res.json(tea);
        console.log(tea);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

app.post('/tea', async (req, res) => {
    const {
        id,
        name,
        ingredients,
        type,
        price_per_100g,
        temperature,
        country,
        description
    } = req.body;
    
    const newTea = new TeaModel({
        id,
        name,
        ingredients,
        type,
        price_per_100g,
        temperature,
        country,
        description
    });
    try {
        const savedTea = await newTea.save();
        res.status(201).json(savedTea);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

/*app.delete('/uczniowie/:id', async (req, res) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message: 'Uczeń nie znaleziony'});
        }
        
        const uczen = await Klasa.findByIdAndDelete(req.params.id);
        if(!uczen) return res.status(404).json({message: 'Uczeń nie znaleziony'});

        res.json({message: 'Uczeń usunięty'})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Wystąpił błąd serwera'});
    }
});

app.put('/uczniowie/:id', async (req, res) => {
    try {
        const {imie, nazwisko, klasa, data_urodzenia} = req.body;
        const uczen = await Klasa.findById(req.params.id);
        if(!uczen) return res.status(404).json({message: 'Uczeń nie znaleziony'});

        uczen.imie = imie;
        uczen.nazwisko = nazwisko;
        uczen.klasa = klasa;
        uczen.data_urodzenia = data_urodzenia;

        const updatedUczen = await uczen.save();
        res.json(updatedUczen);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})*/

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));