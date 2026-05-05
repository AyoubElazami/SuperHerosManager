import { Request, Response } from 'express';
import Hero from '../models/Hero';

export const getHeroes = async (req: Request, res: Response) => {
    try {
        const heroes = await Hero.find({});
        res.json(heroes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getHeroById = async (req: Request, res: Response) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (hero) {
            res.json(hero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createHero = async (req: Request, res: Response) => {
    try {
        const { name, slug, powerstats, appearance, biography, work, connections } = req.body;
        
        let images = {};
        if (req.file) {
            images = {
                lg: req.file.path.replace(/\\/g, "/"),
                md: req.file.path.replace(/\\/g, "/"),
                sm: req.file.path.replace(/\\/g, "/"),
                xs: req.file.path.replace(/\\/g, "/")
            };
        }

        const hero = new Hero({
            name,
            slug,
            powerstats: typeof powerstats === 'string' ? JSON.parse(powerstats) : powerstats,
            appearance: typeof appearance === 'string' ? JSON.parse(appearance) : appearance,
            biography: typeof biography === 'string' ? JSON.parse(biography) : biography,
            work: typeof work === 'string' ? JSON.parse(work) : work,
            connections: typeof connections === 'string' ? JSON.parse(connections) : connections,
            images
        });

        const createdHero = await hero.save();
        res.status(201).json(createdHero);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHero = async (req: Request, res: Response) => {
    try {
        const hero = await Hero.findById(req.params.id);

        if (hero) {
            hero.name = req.body.name || hero.name;
            hero.slug = req.body.slug || hero.slug;
            if (req.body.powerstats) hero.powerstats = typeof req.body.powerstats === 'string' ? JSON.parse(req.body.powerstats) : req.body.powerstats;
            if (req.body.appearance) hero.appearance = typeof req.body.appearance === 'string' ? JSON.parse(req.body.appearance) : req.body.appearance;
            if (req.body.biography) hero.biography = typeof req.body.biography === 'string' ? JSON.parse(req.body.biography) : req.body.biography;
            if (req.body.work) hero.work = typeof req.body.work === 'string' ? JSON.parse(req.body.work) : req.body.work;
            if (req.body.connections) hero.connections = typeof req.body.connections === 'string' ? JSON.parse(req.body.connections) : req.body.connections;

            if (req.file) {
                hero.images = {
                    lg: req.file.path.replace(/\\/g, "/"),
                    md: req.file.path.replace(/\\/g, "/"),
                    sm: req.file.path.replace(/\\/g, "/"),
                    xs: req.file.path.replace(/\\/g, "/")
                };
            }

            const updatedHero = await hero.save();
            res.json(updatedHero);
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHero = async (req: Request, res: Response) => {
    try {
        const hero = await Hero.findByIdAndDelete(req.params.id);
        if (hero) {
            res.json({ message: 'Hero removed' });
        } else {
            res.status(404).json({ message: 'Hero not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
