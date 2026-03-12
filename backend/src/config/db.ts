import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.DATABASE_URL;

        if (!mongoURI) throw new Error('MongoURI is not defined');

        console.log("🔌 Intentando conectar a MongoDB...");
        console.log("🔌 URL:", mongoURI.split('@')[1]); // Log solo la parte después de @
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        
        console.log('✅ Conectado a MongoDB exitosamente');
    } catch (error) {
        console.error('❌ No se pudo conectar a MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;