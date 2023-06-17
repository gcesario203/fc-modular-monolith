import express, { Request, Response } from "express";
import CLientAdmFacadeFactory from "../../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

clientRoute.post('/', async (request: Request, response: Response) => {
    const facade = CLientAdmFacadeFactory.create();

    try {
        const addClient = {...request.body}

        const output = await facade.add(addClient);

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
})