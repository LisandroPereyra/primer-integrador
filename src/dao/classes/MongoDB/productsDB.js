"use strict";

import ProductModel from "../../models/product.js";


class productosDBcontroller {

    static async create( req,res ){

        const {body} = req;

        const producto = {

            ...body

        }

        console.log(producto);

        const result = await ProductModel.create(producto);


        res.status(201).json(result)

    }

    static async get( req,res ){

        const result = await ProductModel.find();

        res.status(200).json(result);
    }

    static async putByid( req,res ){

        const { params : { id }, body} = req;

        await ProductModel.updateOne( {_id: id}, {$set: body});

        res.status(204).send("producto actualizado")
    }

    static async deleteByid( req,res ){

        const { params: {id} } = req;

        await ProductModel.deleteOne({_id: id});

        res.status(204).send("producto eliminado");
    }

}

export default productosDBcontroller;