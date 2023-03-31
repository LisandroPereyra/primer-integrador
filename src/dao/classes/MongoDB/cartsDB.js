

import CartModel from "../../models/product.js"


class carritoDBcontroller {


    static async create( req,res ){

        const { body } = req;

        let carrito = {
            ...body
        }

        let resultado = CartModel.create(carrito);

        res.status(200).json(resultado);

    }

    static async get( req,res ){
        
        const result = await CartModel.find();

        res.status(200).json(result);
        
    }

}


export default carritoDBcontroller;