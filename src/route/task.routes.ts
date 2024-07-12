import express from 'express'
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
} from '../controller/task.controller'
import { validateTask } from '../middleware/validateTask'

const router = express.Router()

router.post('/', validateTask, createTask)
router.get('/', getTasks)
router.get('/:id', getTask)
router.put('/:id', validateTask, updateTask)
router.delete('/:id', deleteTask)

export default router
