const express = require('express')

const app = express()
const port = 3000
app.use(express.static('public'))
app.get('/', (_req, res) => {
  return res.redirect('landing.html')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
