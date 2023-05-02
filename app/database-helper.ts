import { Pool } from 'pg'
import { Request, Response } from 'express'

const dbServer = process.env.POSTGRES_DB
const dbPassword = process.env.POSTGRES_PASSWORD

console.log(`Create pool with defaults: server='${dbServer}'`)
const pool = new Pool({
  host: dbServer,
  database: 'postgres',
  user: 'postgres',
  password: dbPassword,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
})

export const getTeachers = async (request: Request, response: Response) => {
  console.log('getTeachers')

  try {
    const results = await pool.query(
      'SELECT * FROM venues ORDER BY venue_id ASC;'
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getTeachers: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const getTeacherById = async (request: Request, response: Response) => {
  const teacher_id = parseInt(request.params.id)
  console.log(`getTeacherById: teacher_id=${teacher_id}`)

  try {
    const results = await pool.query(
      'SELECT * FROM teacher WHERE teacher_id = $1;',
      [teacher_id]
    )
    response.status(200).json(results.rows)
  } catch (error) {
    console.log('Error thrown in getTeacherById: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const createTeacher = async (request: Request, response: Response) => {
  const { first_name, surname } = request.body
  console.log(`createTeacher: first_name=${first_name}, surname=${surname}`)

  try {
    const results = await pool.query(
      'INSERT INTO teacher (first_name, surname) VALUES ($1, $2) RETURNING teacher_id;',
      [first_name, surname]
    )
    const message = `createTeacher: Teacher added with ID: ${results.rows[0].teacher_id}`
    console.log(message)
    response.status(201).send(message)
  } catch (error) {
    console.log('Error thrown in createTeacher: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const updateTeacher = async (request: Request, response: Response) => {
  const teacher_id = parseInt(request.params.id)
  const { first_name, surname } = request.body
  console.log(`updateTeacher: teacher_id=${teacher_id}`)

  try {
    const results = await pool.query(
      'UPDATE teacher SET first_name = $1, surname = $2 WHERE teacher_id = $3;',
      [first_name, surname, teacher_id]
    )
    const message = `updateTeacher: modified with ID: ${teacher_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in updateTeacher: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}

export const deleteTeacher = async (request: Request, response: Response) => {
  const teacher_id = parseInt(request.params.id)
  console.log(`deleteTeacher: teacher_id=${teacher_id}`)

  try {
    const results = await pool.query(
      'DELETE FROM teacher WHERE teacher_id = $1;',
      [teacher_id]
    )
    const message = `deleteTeacher: Teacher deleted with ID: ${teacher_id}`
    console.log(message)
    response.status(200).send(message)
  } catch (error) {
    console.log('Error thrown in deleteTeacher: ', (error as Error).message)
    response.status(500).json({ message: 'There was an error' })
  }
}
