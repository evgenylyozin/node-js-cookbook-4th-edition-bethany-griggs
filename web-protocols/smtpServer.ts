import * as smtp from 'smtp-server'
const smtpServer = smtp.SMTPServer

const PORT = 4321

const server = new smtpServer({
  disabledCommands: ['STARTTLS', 'AUTH'],
  logger: true,
})

server.on('error', (err) => {
  console.log(err)
})

server.listen(PORT)
