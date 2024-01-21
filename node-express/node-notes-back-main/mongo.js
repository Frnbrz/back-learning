const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const { MONGODB_URI } = process.env

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'HTML is easy',
//   date: new Date(),
//   important: true
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// }).catch(err => {
//   console.log(err)
// })
