// Express app
import express from 'express'
import * as dbHelper from './database-helper'
const app = express()
const port = 3000

// Have a title on the process to help us stop it - see package.json
process.title = 'MyExpressApp'

// This lets us handle JSON directly
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Hello-world type root url
app.get('/', (request, response) => {
  response.json({ info: 'Postgres and Express sample' })
})

// API urls code here
app.get('/teachers', dbHelper.getTeachers)
app.get('/teachers/:id', dbHelper.getTeacherById)
app.post('/teachers', dbHelper.createTeacher)
app.put('/teachers/:id', dbHelper.updateTeacher)
app.delete('/teachers/:id', dbHelper.deleteTeacher)

// Activate!
app.listen(port, () => {
  console.log(`App running on port ${port} as process ${process.title}`)
})
