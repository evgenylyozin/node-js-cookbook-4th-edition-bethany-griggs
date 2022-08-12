import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 4321,
})

transporter.sendMail(
  {
    from: 'test@example.com',
    to: 'test2@example.com',
    subject: 'subject',
    text: 'text',
  },
  (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Сообщение отправлено: ', info)
    }
  }
)
