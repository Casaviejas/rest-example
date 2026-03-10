import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.DATABASE_URL;

        if (!mongoURI) throw new Error('MongoURI is not defined');

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

export default connectDB;