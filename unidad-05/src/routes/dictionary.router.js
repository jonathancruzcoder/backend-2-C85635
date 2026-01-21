import { Router } from 'express'

const router = Router();

// Datos que deber ser de la base datos
const words = ['perro', 'gato', 'auto'];

router.param('word', (req, res, next, word) => {
    // Actualización para Express v5
    if (!/^[a-zA-Z]+$/.test(word)) {
        return res.status(404).send({ status: 'error', msg: 'word inválida' })
    }
    req.word = word

    const normalized = word.toLowerCase();

    const exists = words.includes( normalized);

    if( !exists) {
        res.status(404).send({
            status: 'error',
            msg: 'Word not found'
        })
    }

    req.word = normalized;

    next();
})

/* router.get('/', (req, res) => {
    res.send({
        status: 'success',
        msg: 'Ruta Raiz'
    })
}) */

router.get('/:word',  (req, res) => {
    res.send({
        status: 'success',
        word: req.word
    })
})


/*
router.get("/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC%20]+)", (req, res) => {
  res.send({ status: "success", word: req.word });
});
*/

/* router.get('*', (req, res) => {
    res.status(404).send({
        status: 'error',
        msg: 'Ruta invalida'
    })
}) */
export default router