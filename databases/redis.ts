import * as redis from 'redis'
/**
 * Перед запуском нужно запустить контейнер с redis сервером
 * docker run --publish 6379:6379 --name node-redis --detach redis
 */

const client = redis.createClient()

const task = process.argv[2]

client.connect().then(() => {
  client.on('error', (err) => {
    console.log('Error:', err)
  })

  const addTask = (task: any) => {
    const key = `Task: ${Math.random().toString(32).replace('.', '')}`

    client.hSet(key, {
      task,
    })

    listTasks()
  }

  const listTasks = () => {
    client
      .keys('Task:*')
      .then((keys) => {
        keys.forEach((key) => {
          client.hGetAll(key).then((data) => {
            console.log(data)
          })
        })
      })
      .then(() => {
        client.quit()
      })
  }

  if (!task) {
    listTasks()
  } else {
    addTask(task)
  }
})
