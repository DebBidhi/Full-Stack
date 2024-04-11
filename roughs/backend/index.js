const express = require('express')
const app = express()
// app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}



app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World! Bidhideb Ghosh</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  console.log(request.headers)
  console.log(request.params.id)
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
  console.log('Note deleted successfully')
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// app.post('/api/notes', (request, response) => {
//   console.log(request.headers)
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })



//using node server instade of express library
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
//   })


// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
//...............................
// ```javascript
// //Math.max(...notes.map(n => n.id))copy
// //What exactly is happening in that line of code?
// // notes.map(n => n.id) creates a new array that contains all the ids of the notes.
// // Math.max returns the maximum value of the numbers that are passed to it. 
// //However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
// //**The array can be transformed into individual numbers by using the "three dot" spread syntax ....```