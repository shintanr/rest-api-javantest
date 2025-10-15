import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/database.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});