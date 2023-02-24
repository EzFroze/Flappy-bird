import { UserModel } from "../../features/users/usersModel"
import { AppDataSource } from "../../app/data-source"
import { Post, PostModel } from "./postsModel"

const posts = AppDataSource.getRepository(PostModel)

export const createPost = async (data: Post) => {
  const post = new PostModel()
  
  post.avatar = data.avatar || ''
  post.comments = data.comments
  post.datetime = new Date()
  post.likes = data.likes || 0
  post.message = data.message
  post.title = data.title
  post.userId = data.userId

  await posts.save(post)

  console.log("Post has been saved. Post id is", post.id)
}

export const findPosts = async () => {
  return await posts.find()
}

export const findPostsByUserId = async (userId: number) => {
  return await posts.find({ where: { userId } })
}

export const findPostById = async (id: number) => {
  return await posts.findOneBy({ id })
}