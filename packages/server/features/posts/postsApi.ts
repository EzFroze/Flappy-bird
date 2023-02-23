import { UserModel } from "../../features/users/usersModel"
import { AppDataSource } from "../../app/data-source"
import { Post, PostModel } from "./postsModel"

const posts = AppDataSource.getRepository(PostModel)

export const createPost = async (data: Post) => {
  let post = new PostModel()
  
  await posts.save({ ...post, ...data })

  console.log("Post has been saved. Post id is", post.id)
}

export const findPosts = async () => {
  const foundPosts = await posts.find()

  console.log("All posts from the db: ", foundPosts.length)

  return foundPosts
}

export const findPostsByUserId = async (userId: number) => {
  return await posts.find({ where: { userId } })
}