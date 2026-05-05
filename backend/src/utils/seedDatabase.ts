import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        await Hero.deleteMany();

        const dataPath = path.join(__dirname, '../../SuperHerosComplet.json');
        const heroesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await Hero.insertMany(heroesData);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
