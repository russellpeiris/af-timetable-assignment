import { Request, Response } from 'express';
import { logger } from '..';
import ClassRoom from '../classroom/room.schema';
import Resource from './resource.schema';

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

async function assignResourceToRoom(req: Request, res: Response) {
  try {
    const { rId, roomId } = req.body;
    const resource = await Resource.findOne({ rId });
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    if (!resource.isAvailable) {
      return res
        .status(400)
        .json({ message: 'Resource is not available at the moment' });
    }

    const classRoom = await ClassRoom.findOne({ roomId });
    if (!classRoom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    resource.isAvailable = false;
    resource.save();
    classRoom.resources.push(resource._id);
    classRoom.save();
    return res
      .status(200)
      .json({ message: 'Resource assigned successfully', classRoom });
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function unassignResourceFromRoom(req: Request, res: Response) {
  try {
    const { rId, roomId } = req.body;
    const classRoom = await ClassRoom.findOne({ roomId }).populate('resources');
    if (!classRoom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    const resource = await Resource.findOne({ rId });
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    const isResourceAssigned = classRoom.resources.some(
      (r) => r._id.toString() === resource._id.toString(),
    );
    if (!isResourceAssigned) {
      return res
        .status(400)
        .json({ message: 'Resource is not assigned to this classroom' });
    }
    classRoom.resources = classRoom.resources.filter(
      (r) => r._id.toString() !== resource._id.toString(),
    );
    resource.isAvailable = true;

    await resource.save();
    await classRoom.save();

    return res
      .status(200)
      .json({ message: 'Resource unassigned successfully', classRoom });
  } catch (error: any) {
    logger.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getResources(req: Request, res: Response) {
  try {
    const resources = await Resource.find();
    return res.status(200).json(resources);
  } catch (error: any) {
    logger.error(error.message);
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}
export {
  assignResourceToRoom,
  createResource,
  getResources,
  unassignResourceFromRoom,
};
