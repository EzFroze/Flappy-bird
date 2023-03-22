import { UserModel } from '../../features/users/usersModel'
import { AppDataSource } from '../../app/data-source'
import { PostModel } from './postsModel'

const posts = AppDataSource.getRepository(PostModel)
const users = AppDataSource.getRepository(UserModel)

export const createPost = async (data: PostModel) => {
  const user = new UserModel()

  user.id = data.user.id
  user.avatar = data.user.avatar
  user.display_name = data.user.display_name
  user.login = data.user.login

  await users.save(user)

  const post = new PostModel()

  post.datetime = new Date()
  post.likes = 0
  post.message = data.message
  post.title = data.title
  post.user = data.user

  const resultPost = await posts.save(post)

  return resultPost
}

export const findPosts = async () => {
  const foundsPosts = await posts.find({
    relations: {
      user: true,
      comments: {
        user: true,
      },
    },
  })

  return foundsPosts.map(post => ({
    ...post,
    comments: {
      last: post.comments[post.comments.length - 1],
      quantity: post.comments.length,
    },
  }))
}

export const findPostsByUserId = async (userId: number) => {
  return await posts.find({ where: { user: { id: userId } } })
}

export const findPostById = async (id: number) => {
  const [thread] = await posts.find({
    relations: { user: true },
    where: { id },
  })

  return thread
}
