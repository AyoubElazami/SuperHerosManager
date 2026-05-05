import express from 'express';
import { getHeroes, getHeroById, createHero, updateHero, deleteHero } from '../controllers/heroController';
import { protect } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
    .get(getHeroes)
    .post(protect, authorize('admin', 'editor'), upload.single('image'), createHero);

router.route('/:id')
    .get(getHeroById)
    .put(protect, authorize('admin', 'editor'), upload.single('image'), updateHero)
    .delete(protect, authorize('admin'), deleteHero);

export default router;
