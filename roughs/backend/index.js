const express = require('express')
const app = express()
app.use(express.json())
var morgan=require('morgan')

morgan.token("data", (request) => {
  return request.method === "POST" ? JSON.stringify(request.body) : " ";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

// //for crosss site 
const cors = require('cors')
app.use(cors())//allow all
app.use(express.static('dist'))//** */

const Note = require('./models/note')

// const mongoose = require('mongoose')

// const password = process.argv[2]


// const url =`mongodb+srv://startupver001:${password}@cluster0.y4ukach.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.set('strictQuery',false)
// mongoose.connect(url)
// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })
// const Note = mongoose.model('Note', noteSchema)

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
    res.json(notes)
  })
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

const PORT = process.env.PORT || 3001
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