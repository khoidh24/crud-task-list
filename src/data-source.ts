import { DataSource } from 'typeorm'
import { Task } from './entity/Task'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [Task],
  synchronize: true,
  logging: false,
  migrations: []
})
