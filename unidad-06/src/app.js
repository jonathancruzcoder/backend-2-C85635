import express from 'express';
import { config } from './config/config.js';
import { connectDB } from './config/db.js'
import UsersRouter from './routes/users.router.js';

connectDB()
const app = express();

app.use( express.json());
app.use( express.urlencoded({ extended: true}))

// Rutas
app.use('/api/users', UsersRouter)


app.get('/', (req, res) => {
    res.send({status: 'ok'});
})


app.listen( config.PORT, () => {
    console.log(`Servidor en el puerto ${config.PORT}`);
})