import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI as string)
        .then(() => {
            console.log(`MongoDB Connected`)
        })
        .catch((error: unknown) => {
            console.error(`Error: ${(error as Error).message}`);
        })
};

export default connectDB;
