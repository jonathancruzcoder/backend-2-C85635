import { Router } from "express";

const router = Router();

let pets = [
    { name: 'Luna', specie: 'dog'},
    { name: 'Laika', specie: 'cat'}
]


router.param('pet', (req, res, next, petName) => {

    if (!/^[a-zA-Z]+$/.test(petName)) {
        return res.status(404).send({ status: 'error', msg: 'Pet Name inválido' })
    }
    const normalized = petName.toLowerCase();
    req.petName = petName

    const pet = pets.find( p=> p.name.toLowerCase() === normalized )


    if( !exists) {
        res.status(404).send({
            status: 'error',
            msg: 'Word not found'
        })
    }

    req.word = normalized;

    next();
})

router.get('/', (req, res) => {
    res.status(201).send({ status: 'seccess', data: pets })

})
router.post('/', (req, res) => { 
    const { name, specie } = req.body;
    
    if( !name || !specie) {
         return res.status(400).send({ status: 'error', msg: 'Falta parametros obligatorios' })
    }
    
    pets.push({ name, specie});
    res.status(201).send({ status: 'seccess', msg: 'Mascota Guardad' })

})

// Completar el con PUT y DELETE


export default router