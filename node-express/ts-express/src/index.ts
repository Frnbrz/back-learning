import express from 'express' // ESModules
// const express = require('express') -> commonjs

import diaryRouter from './routes/diaries.routes' // ESModules

const app = express()
app.use(express.json()) // middleware que transforma la req.body a un json

const PORT = 3030

app.get('/ping', (_req, res) => {
  console.log('ping')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
