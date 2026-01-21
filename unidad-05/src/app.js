import express from 'express';

import UsersRouter from './routers/users.router.js';

import apiRouter from './routes/index.js'
const PORT = 5000;
const app = express();

app.use( express.json());
app.use( express.urlencoded({
    extended: true
}))

// Creamos la instancia del userRouter
const userRouter = new UsersRouter()

// Rutas
app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.send({status: 'ok'});
})


app.listen( PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
})