import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import 'reflect-metadata'

import { AppDataSource } from './app/data-source'
import { createUser, findUserById, findUsers, updateUser } from './features/users/usersApi'
import { createPost, findPosts, findPostById } from './features/posts/postsApi'
import { findPostsByUserId } from './features/posts/postsApi'

const app = express()

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}))


const port = Number(process.env.SERVER_PORT) || 3001

AppDataSource.initialize()
  .then(async () => {
    console.log('db is started')
  })
  .catch(error => console.log('db err', error))

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

// get all posts
app.get('/posts', async (_req, res) => {
  const posts = await findPosts()

  res.send(posts)
})

app.get('/posts/:id', async (req, res) => {
  const post = await findPostById(Number(req.params.id))

  res.send(post)
})

// get all users
app.get('/users', async (_req, res) => {
  const users = await findUsers()

  res.send(users)
})

// create post (and create or update user)
app.post('/posts/create', async (req, res) => {
  const { user, topic } = req.body

  let dbUser = await findUserById(user.id)

  if (dbUser === null) {
    dbUser = await createUser(user)
  } else {
    await updateUser(dbUser.id, user)
  }

  await createPost({
    ...topic,
    userId: dbUser.id 
  })

  res.send(JSON.stringify({
    status: 'created',
    content: {
      title: topic.title,
      message: topic.message
    }
  }))
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
