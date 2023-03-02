import { UserModel } from "../../features/users/usersModel"
import { AppDataSource } from "../../app/data-source"
import { CommentModel } from "./commentsModel"

const comments = AppDataSource.getRepository(CommentModel)
const users = AppDataSource.getRepository(UserModel)

export const createComment = async (data: CommentModel) => {
  console.log('creating comment...', data)

  const user = new UserModel()
  
  user.id = data.user.id
  user.avatar = data.user.avatar
  user.display_name = data.user.display_name
  user.login = data.user.login
  
  await users.save(user)
  
  const comment = new CommentModel()

  comment.datetime = new Date()
  comment.likes = 0
  comment.message = data.message
  comment.postId = data.postId
  comment.user = data.user
  comment.subCommentId = data.subCommentId

  return comments.save(comment)
}

export const findComments = async (postId: number) => {
  const foundComments = await comments.find({
    relations: {
      user: true
    },
    where: { postId }
  })


  return foundComments
}

export const findCommentsByPostId = async (postId: number) => {
  return await comments.find({ where: { postId } })
}