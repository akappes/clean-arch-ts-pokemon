import { config } from 'dotenv'

console.log(process.env.NODE_ENV);
config({ path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env' })

module.exports = {
  cli: {
    entitiesDir: 'src/infra/databases/postgres/entities',
    migrationsDir: 'src/infra/databases/postgres/migrations',
    subscribersDir: 'src/infra/databases/postgres/subscribers'
  }
}
