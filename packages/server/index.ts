import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import "reflect-metadata"

import { AppDataSource } from './app/data-source'
import { createUser, findUserById, findUsers } from './features/users/usersApi'
import { createPost, findPosts, findPostsByUserId } from './features/posts/postsApi'


const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

AppDataSource.initialize()
    .then( async () => {
        console.log('db is started')

        //await createUser() //

        // await createPost({
        //   title: '3 post title',
        //   body: '3 post body',
        //   userId: 2
        // })

        console.log('user', await findUserById(1))
        console.log('posts', await findPostsByUserId(1))

    })
    .catch((error) => console.log('db err', error))


app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})