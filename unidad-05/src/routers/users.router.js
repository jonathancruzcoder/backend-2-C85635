import CustomRouter from '../routers/Router.js';

class UsersRouter extends CustomRouter {
    init(){ // Definimos la rutas de la clase
        this.get('/public', ['PUBLIC'], (req, res) => {
            res.send('Hola Coders!');
        })

        this.get('/current', ['USER', 'ADMIN'],  (req, res) => {

        })
    }
}


export default UsersRouter;