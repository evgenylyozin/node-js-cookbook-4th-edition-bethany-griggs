import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Перед запуском нужно запустить контейнер с postgresql сервером
 * docker run --publish 5432:5432 --name node-postgres --env POSTGRES_PASSWORD=PASSWORD --detach postgres:12
 */

const db = new pg.Client()
const task = process.argv[2]
const CREATE_TABLE_SQL = `CREATE TABLE IF NOT EXISTS tasks (id SERIAL, task TEXT NOT NULL, PRIMARY KEY ( id ));`
const INSERT_TASK_SQL = `INSERT INTO tasks (task) VALUES ($1);`
const GET_TASKS_SQL = `SELECT * FROM tasks;`

db.connect((err) => {
  if (err) throw err
  db.query(CREATE_TABLE_SQL, (err) => {
    if (err) throw err
    if (task) {
      db.query(INSERT_TASK_SQL, [task], (err) => {
        if (err) throw err
        listTasks()
      })
    } else {
      listTasks()
    }
  })
})

const listTasks = () => {
  db.query(GET_TASKS_SQL, (err, results) => {
    if (err) throw err

    console.log(results.rows)

    db.end()
  })
}
