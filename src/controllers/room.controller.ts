import { Request, Response } from 'express';
import ClassRoom from '../schemas/room.schema';
import { logger } from '..';
import Resource from '../schemas/resource.schema';

async function createClassRoom(req: Request, res: Response) {
  try {
    const { classRoom, resourceIds } = req.body;
    const isExist = await ClassRoom.findOne({ roomId: classRoom.roomId });
    if (isExist) {
      return res
        .status(409)
        .json({
          message: `ClassRoom with roomId: ${classRoom.roomId} already exists`,
          isExist,
        });
    }
    const newClassRoom = new ClassRoom(classRoom);

    if (resourceIds && Array.isArray(resourceIds)) {
      const resources = await Resource.find({ _id: { $in: resourceIds } });
      if (resources.length !== resourceIds.length) {
        return res
          .status(404)
          .json({ message: 'One or more resources not found' });
      }
      newClassRoom.resources.push(...resources);
    }

    await newClassRoom.save();
    return res.status(201).json(newClassRoom);
  } catch (error: any) {
    console.log(error.message);
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export { createClassRoom };
