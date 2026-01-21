import { Router } from "express";
import dictionaryRouter from './dictionary.router.js'
import petsRouter from './pets.router.js'

const router = Router();

router.use('/dictionary', dictionaryRouter);
router.use('/pets', petsRouter);


export default router;