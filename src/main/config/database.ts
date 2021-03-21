import { createConnection } from 'typeorm'

createConnection({
  type: 'mssql',
  host: '',
  port: 1433,
  username: '',
  password: '',
  database: '',
  schema: '',
  synchronize: true,
  logging: false,
  entities: ['src/infra/databases/postgres/entities/**/*.entity.ts'],
  migrations: ['src/infra/databases/postgres/migrations/**/*.ts'],
  subscribers: ['src/infra/databases/postgres/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/infra/databases/postgres/entities',
    migrationsDir: 'src/infra/databases/postgres/migrations',
    subscribersDir: 'src/infra/databases/postgres/subscribers'
  }
})
  .then(async (connection) => console.log(connection))
  .catch((error) => console.log(error))
