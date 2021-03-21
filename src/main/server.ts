import app from './config/app'
import * as env from './config/env'
import { MSSQLHelper } from '../infra/databases/mssql/mssql-helper'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
MSSQLHelper.connect().then(() => {
  console.log('Database is running')
  app.listen(env.PORT, () => console.log(`Server running at PORT: ${env.PORT}`))
})
