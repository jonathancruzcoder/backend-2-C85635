import express from 'express'
import cors from 'cors'
import { env } from './config/config.js';

// 
const app = express();

app.use( cors() )

app.get('/', (req, res) => {
    res.json({
        message: 'Ok'
    })
})

app.listen( env.PORT, () => {
    console.log(`Servidor en el puerto ${env.PORT}`);
})