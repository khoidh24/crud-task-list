import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { Task } from '../entity/Task'

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const task = taskRepository.create(req.body)
    const result = await taskRepository.save(task)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const tasks = await taskRepository.find()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const task = await taskRepository.findOne({
      where: { id: parseInt(req.params.id) }
    })
    if (task) {
      res.json(task)
    } else {
      res.status(404).json({ error: 'Task not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const task = await taskRepository.findOne({
      where: { id: parseInt(req.params.id) }
    })
    if (task) {
      taskRepository.merge(task, req.body)
      const result = await taskRepository.save(task)
      res.json(result)
    } else {
      res.status(404).json({ error: 'Task not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task)
    const result = await taskRepository.delete(req.params.id)
    if (result.affected === 0) {
      res.status(404).json({ error: 'Task not found' })
    } else {
      res.status(204).send()
    }
  } catch (error) {
    next(error)
  }
}
