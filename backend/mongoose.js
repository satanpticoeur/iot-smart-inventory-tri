import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/esp8266';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongodbUri);
        console.log('✔️ Connecté à MongoDB');
    } catch (error) {
        console.error('❌ Erreur de connexion à MongoDB :', error);
    }
}

const dhtSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    date: { type: Date, default: Date.now }
});

export const DHT = mongoose.model('DHT', dhtSchema);
