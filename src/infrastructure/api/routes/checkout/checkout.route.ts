import express, { Request, Response } from "express"
import CheckoutFacadeFactory from "../../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router()

checkoutRoute.post("/", async (req: Request, res: Response) => {

    const facade = CheckoutFacadeFactory.create();

    try {
        const input = {...req.body}

        const output = await facade.placeOrder(input)

        res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
});