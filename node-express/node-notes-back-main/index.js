require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.originalUrl)
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then(note => {
      if (note) return response.json(note)
      response.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(next)
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(next)
})

app.post('/api/notes', (request, response, next) => {
  console.log(request.body)
  const { content, important = false } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    important
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  }).catch(err => next(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
