import dotenv from 'dotenv';
dotenv.config();
export default {
    port: process.env.PORT || 5000,
    mongo: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@muvize.vmwoe7d.mongodb.net/?retryWrites=true&w=majority`
};