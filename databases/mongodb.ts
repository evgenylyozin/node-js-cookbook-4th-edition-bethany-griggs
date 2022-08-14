import { Callback, Collection, MongoClient, Document } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

/**
 * Перед запуском нужно запустить контейнер с mongodb сервером
 * docker run --publish 27017:27017 --name node-mongo --detach mongo:4
 */

const task = process.argv[2]

const URI = 'mongodb://localhost:27017/'

const connected: Callback<MongoClient> = (err, client) => {
  if (err) throw err

  const tasks = client?.db('tasklist').collection('tasks')

  if (task) {
    addTask(client, tasks)
  } else {
    listTasks(client, tasks)
  }
}

const addTask = (
  client: MongoClient | undefined,
  tasks: Collection<Document> | undefined
) => {
  tasks?.insertOne(
    {
      task: task,
    },
    (err) => {
      if (err) throw err

      console.log('New Task: ', task)

      listTasks(client, tasks)
    }
  )
}

const listTasks = (
  client: MongoClient | undefined,
  tasks: Collection<Document> | undefined
) => {
  tasks
    ?.find()
    .forEach((doc) => {
      if (!doc) {
        client!.close()
        return
      }
      console.log(doc)
    })
    .then(() => {
      client?.close()
    })
}

MongoClient.connect(URI, {}, connected)
