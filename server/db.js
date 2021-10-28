import { createConnection } from 'mysql2'


export const db = createConnection({
  host: 'localhost',
  port:"3306",
  user: "root",
  password: "your_password",
  database: "your_database"
})