import { Router } from "express";
import dictionaryRouter from './dictionary.router.js'

const router = Router();

router.use('/dictionary', dictionaryRouter);

export default router;