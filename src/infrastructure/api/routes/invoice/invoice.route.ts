import express, { Request, Response } from 'express';
import InvoiceFacadeFactory from '../../../../modules/invoice/factory/invoice.facade.factory';

export const invoiceRoute = express.Router();

const facade = InvoiceFacadeFactory.create();

invoiceRoute.get('/:id', async (req: Request, res: Response) => {

  try {
    const input = { id: String(req.params.id)};

    const output = await facade.find(input);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});