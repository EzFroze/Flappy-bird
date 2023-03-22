import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import 'reflect-metadata'

import { AppDataSource } from './app/data-source'
import { createUser, findUsers } from './features/users/usersApi'
import { createPost, findPosts, findPostById } from './features/posts/postsApi'
import { createComment, findComments } from './features/comments/commentsApi'
import { createLike, findAllLikes } from './features/likes/likesController'
import {
  createSubcomment,
  findSubcomments,
} from './features/subcomments/subcommentsApi'
import {
  createComplain,
  findAllComplains,
} from './features/complains/complainsController'

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
app.get('/server/users', async (_req, res) => {
  res.send(await findUsers())
})

// updateTheme
app.post('/server/users/theme', async (_req, res) => {
  res.send(await findUsers())
})

app.post('/server/users', async (req, res) => {
  res.send(await createUser(req.body))
})

// get all posts
app.get('/server/posts', async (_req, res) => {
  res.send(await findPosts())
})

// find post by id (for thread)
app.get('/server/posts/:id', async (req, res) => {
  res.send(await findPostById(Number(req.params.id)))
})

// create post (and create or update user)
app.post('/server/posts', async (req, res) => {
  res.send(await createPost(req.body))
})

// find thread comments
app.get('/server/comments/thread/:id', async (req, res) => {
  res.send(await findComments(Number(req.params.id)))
})

// create comment
app.post('/server/comments', async (req, res) => {
  res.send(await createComment(req.body))
})

// todo: create sub comments
app.post('/server/subcomments', async (req, res) => {
  res.send(await createSubcomment(req.body))
})

// get subcomments
app.get('/server/subcomments/:commentId', async (req, res) => {
  res.send(await findSubcomments(Number(req.params.commentId)))
})

// get all likes
app.get('/server/likes', async (_req, res) => {
  res.send(await findAllLikes())
})

// create like
app.post('/server/likes', async (req, res) => {
  const likes = await createLike(req.body)

  res.send(likes)
})

// get all complains
app.get('/server/complains', async (_req, res) => {
  res.send(await findAllComplains())
})

// create complain
app.post('/server/complains', async (req, res) => {
  res.send(await createComplain(req.body))
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
