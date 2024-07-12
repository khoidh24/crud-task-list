import request from 'supertest'
import { DataSource } from 'typeorm'
import { AppDataSource } from './data-source'
import app from './app'
import { Task } from './entity/Task'

let dataSource: DataSource

beforeAll(async () => {
  dataSource = await AppDataSource.initialize()
})

afterAll(async () => {
  await dataSource.destroy()
})

beforeEach(async () => {
  const taskRepository = dataSource.getRepository(Task)
  await taskRepository.clear() // Clear the database before each test
})

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app).post('/tasks').send({
      name: 'Test Task',
      startDate: '2023-04-01',
      endDate: '2023-04-30'
    })
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe('Test Task')
  })

  it('should not create a task with invalid name', async () => {
    const res = await request(app).post('/tasks').send({
      name: '',
      startDate: '2023-04-01',
      endDate: '2023-04-30'
    })
    expect(res.statusCode).toBe(400)
  })

  it('should not create a task with invalid start date format (DD-MM-YYYY)', async () => {
    const res = await request(app).post('/tasks').send({
      name: 'New Task',
      startDate: '24-06-2023',
      endDate: '2023-04-30'
    })
    expect(res.statusCode).toBe(400)
  })

  it('should not create a task with invalid start date format (YYYY-DD-MM)', async () => {
    const res = await request(app).post('/tasks').send({
      name: 'New Task',
      startDate: '24-06-2023',
      endDate: '2023-04-30'
    })
    expect(res.statusCode).toBe(400)
  })

  it('should not create a task with end date but no start date', async () => {
    const res = await request(app).post('/tasks').send({
      name: 'Invalid Task',
      endDate: '2023-04-30'
    })
    expect(res.statusCode).toBe(400)
  })

  it('should get all tasks', async () => {
    // Create a task first
    await request(app).post('/tasks').send({
      name: 'Task 1',
      startDate: '2023-05-01',
      endDate: '2023-05-31'
    })

    const res = await request(app).get('/tasks')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBeTruthy()
    expect(res.body.length).toBe(1)
  })

  it('should get a specific task', async () => {
    const createRes = await request(app).post('/tasks').send({
      name: 'Get This Task',
      startDate: '2023-05-01',
      endDate: '2023-05-31'
    })

    const res = await request(app).get(`/tasks/${createRes.body.id}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe('Get This Task')
  })

  it('should update a task', async () => {
    const createRes = await request(app).post('/tasks').send({
      name: 'Update This Task',
      startDate: '2023-06-01',
      endDate: '2023-06-30'
    })

    const res = await request(app).put(`/tasks/${createRes.body.id}`).send({
      name: 'Updated Task',
      startDate: '2023-06-15',
      endDate: '2023-07-15'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe('Updated Task')
  })

  it('should delete a task', async () => {
    const createRes = await request(app).post('/tasks').send({
      name: 'Delete This Task',
      startDate: '2023-07-01',
      endDate: '2023-07-31'
    })

    const res = await request(app).delete(`/tasks/${createRes.body.id}`)
    expect(res.statusCode).toBe(204)

    // Verify the task is deleted
    const getRes = await request(app).get(`/tasks/${createRes.body.id}`)
    expect(getRes.statusCode).toBe(404)
  })
})
