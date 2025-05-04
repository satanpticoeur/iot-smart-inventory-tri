import express from 'express';
import cors from 'cors';
import {connectToMongoDB, DHT} from "./mongoose.js";

const app = express()
const port = process.env.PORT || 5000

// Configuration de CORS
const corsOptions = {
    origin: '*', // Autoriser toutes les origines
    methods: ['GET', 'POST'], // Méthodes autorisées
    allowedHeaders: ['Content-Type'], // En-têtes autorisés
};

// Middleware
app.use(cors())
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

await connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// 🚀 POST - recevoir les données de l’ESP8266
app.post('/data', async (req, res) => {
    try {
        const {temperature, humidity} = req.body;
        const dht = new DHT({temperature, humidity});
        await dht.save();
        console.log('✔️ Donnée enregistrée dans MongoDB');
        res.status(201).json({message: 'Donnée enregistrée'});
    } catch (error) {
        console.error('❌ Erreur MongoDB :', error);
        res.status(500).json({message: 'Erreur serveur'});
    }
});

// 📥 GET - envoyer toutes les données au frontend
app.get('/data', async (req, res) => {
    try {
        const data = await DHT.find().sort({ date: -1 }).limit(20);
        res.json(data);
    } catch (error) {
        console.error('Erreur /data :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// 📥 GET - envoyer le dernier enrégistrement au frontend
app.get('/latest', async (req, res) => {
    try {
        const latest = await DHT.findOne().sort({ date: -1 });
        if (latest) {
            res.json(latest);
        } else {
            res.status(404).json({ message: 'Aucune donnée disponible' });
        }
    } catch (error) {
        console.error('Erreur /latest :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
