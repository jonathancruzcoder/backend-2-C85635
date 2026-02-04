import express from 'express'
import cors from 'cors'
import { config } from './config/config.js';


const app = express();

app.listen( config.PORT, () => {
    console.log(`Servidor en el puerto ${config.PORT}`);
})