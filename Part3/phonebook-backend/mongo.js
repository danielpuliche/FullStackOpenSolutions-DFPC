const mongoose = require('mongoose')

// Check that receives a password
if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

// Connect to mongo
const password = process.argv[2]

const url = `mongodb+srv://danielpuliche:${password}@clusterphonebook.xbikd.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterPhonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

// Create the personSchema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  // Add a new person
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((personReturned) => {
    console.log(`Added ${personReturned.name} number ${personReturned.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  // Get all the people
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  console.log('Wrong request')
  process.exit(1)
}
