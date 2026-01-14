import express from 'express';

const PORT = 5000;
const app = express();

app.use('/', (req, res) => {
    res.send({status: 'ok'});
})

app.listen( PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
})