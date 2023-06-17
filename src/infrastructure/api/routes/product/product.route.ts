import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../../modules/product-adm/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post('/', async (request: Request, response: Response) => {
    const facade = ProductAdmFacadeFactory.create();

    try {
        const addProductDto = {...request.body}

        const output = await facade.addProduct(addProductDto);

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
})