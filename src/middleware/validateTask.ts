import { Request, Response, NextFunction } from 'express'

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, startDate, endDate } = req.body

  if (!name || name.trim().length === 0 || name.length > 80) {
    return res.status(400).json({ error: 'Invalid task name' })
  }

  if (endDate && !startDate) {
    return res
      .status(400)
      .json({ error: 'Start date is required when end date is provided' })
  }

  if (startDate && !isValidDate(startDate)) {
    return res.status(400).json({
      error: 'Invalid start date format (this field only receives YYYY-MM-DD)'
    })
  }

  if (endDate && !isValidDate(endDate)) {
    return res.status(400).json({
      error: 'Invalid end date format (this field only receives YYYY-MM-DD)'
    })
  }

  next()
}

const isValidDate = (dateString: string): boolean => {
  // First, check the format
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split('-').map(Number)

  // Create a Date object and check if it's valid
  const date = new Date(year, month - 1, day)

  // Check if the date is valid and the components match the input
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}
