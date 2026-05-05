import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import { logger } from './utils/logger';
import heroRoutes from './routes/heroRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    logger(`${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/heroes', heroRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
