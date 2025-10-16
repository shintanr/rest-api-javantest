import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import pool from './config/database.js';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routees
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 


app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});