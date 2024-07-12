import express, { Request, Response, NextFunction } from 'express'
import taskRoutes from './route/task.routes'

const app = express()
app.use(express.json())

app.use('/tasks', taskRoutes)

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
}

app.use(errorHandler)

export default app
