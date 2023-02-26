import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import 'reflect-metadata'

import { AppDataSource } from './app/data-source'
import {
  createUser,
  findUserById,
  findUsers,
  updateUser,
} from './features/users/usersApi'
import { createPost, findPosts, findPostById } from './features/posts/postsApi'
import { createComment, findComments } from './features/comments/commentsApi'

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)

const port = Number(process.env.SERVER_PORT) || 3001

AppDataSource.initialize()
  .then(async () => {
    console.log('db is started')
  })
  .catch(error => console.log('db err', error))

// get all users
app.get('/users', async (_req, res) => {
  const users = await findUsers()

  res.send(users)
})

// get all posts
app.get('/posts', async (_req, res) => {
  const posts = await findPosts()

  res.send(posts)
})

// find post by id (for thread)
app.get('/posts/:id', async (req, res) => {
  const post = await findPostById(Number(req.params.id))

  res.send(post)
})

// create post (and create or update user)
app.post('/posts/create', async (req, res) => {
  await createPost(req.body)

  res.send('ok')
})

// find thread comments
app.get('/comments/thread/:id', async (req, res) => {
  const comments = await findComments(Number(req.params.id))

  res.send(comments)
})

// create comment
app.post('/comments/create', async (req, res) => {
  const comment = await createComment(req.body)
  console.log('comment created', comment)
  res.send(comment)
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
