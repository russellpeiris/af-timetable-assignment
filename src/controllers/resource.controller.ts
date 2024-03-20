import { Request, Response } from 'express';
import Resource from '../schemas/resource.schema';
import { logger } from '..';

async function createResource(req: Request, res: Response) {
  try {
    const { rId, name, isAvailable } = req.body;
    const newResource = new Resource({ rId, name, isAvailable });
    await newResource.save();
    return res.status(201).json(newResource);
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export { createResource };
