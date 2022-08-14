import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Перед запуском нужно запустить контейнер с mysql сервером
 * docker run --publish 3306:3306 --name node-mysql --env MYSQL_ROOT_PASSWORD=PASSWORD --detach mysql:5
 */

const db = mysql.createConnection({
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
})

db.query('CREATE DATABASE tasks;')

db.query('USE tasks;')

db.query(`

CREATE TABLE tasks.tasks (

id INT NOT NULL AUTO_INCREMENT,

task TEXT NOT NULL, PRIMARY KEY ( id ));

`)

const ignore = new Set(['ER_DB_CREATE_EXISTS', 'ER_TABLE_EXISTS_ERROR'])

db.on('error', (err) => {
  if (ignore.has(err.code)) return
  throw err
})

// Возможно передать один аргумент в виде строки при запуске программы
if (process.argv[2]) {
  db.query(`INSERT INTO tasks.tasks (task) VALUES (?);`, [process.argv[2]])
}

db.query(`INSERT INTO tasks.tasks (task)VALUES ("Walk the dog!");`)

db.query(
  `

SELECT * FROM tasks.tasks;

`,
  (err, results, fields) => {
    console.log(results)

    db.end()
  }
)
