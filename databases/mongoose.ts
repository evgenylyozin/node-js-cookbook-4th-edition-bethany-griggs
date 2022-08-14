import mongoose from 'mongoose'

const URI = 'mongodb://localhost:27017/customers'

mongoose.connect(URI)

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    forename: 'string',
    surname: 'string',
  })
)

const customer1 = new Customer({
  forename: 'Евгений',
  surname: 'Лёзин',
})

customer1.save().then((doc) => {
  console.log('Новый покупатель добавлен:', doc.forename, doc.surname)
  listCustomers()
})

const listCustomers = () => {
  console.log('Покупатели:')
  Customer.find().then((doc) => {
    doc.forEach((customer) => {
      console.log(`- ${customer.surname}, ${customer.forename}`)

      mongoose.connection.close()
    })
  })
}
