import { Router as ExpressRouter } from "express";
import { verifyToken } from '../utils/jwt.js';

export default class Router {
    constructor(){
        this.router = ExpressRouter();
        this.init();
    }

    getRouter(){
        return this.router;
    }
    // Para que las clases hijas definan sus rutas
    init(){

    }
    // Custom Responses
    generateCustomResponses( req, res, next){

    }
    // ApplyCallbacks
    applyCallbacks( callbacks){
        callbacks.map( callback => async(...params) => {
            const [ req, res, next] = params;
            try {
                await callback(req, res, next);
                
            } catch (error) {
                console.error({error});
            }
        })
    }

    get(path, ...callbacks){
        this.router.get(
            path, 
            this.applyCallbacks(callbacks)

        )
    }

    post(){ }

    put(){ }

    delete() {}
}