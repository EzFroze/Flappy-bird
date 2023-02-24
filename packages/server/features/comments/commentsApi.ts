import { UserModel } from "../../features/users/usersModel"
import { AppDataSource } from "../../app/data-source"
import { Comment, CommentModel } from "./commentsModel"

const comments = AppDataSource.getRepository(CommentModel)
const users = AppDataSource.getRepository(UserModel)

export const createComment = async (data: Comment) => {
  let user = await users.findOneBy({ id: data.userId })

  if (!user && data.user) {
    const newUser = new UserModel()

    newUser.id = data.user?.id
    newUser.login = data.user?.login
    newUser.avatar = data.user?.avatar
    newUser.display_name = data.user?.display_name

    user = await users.save(newUser)
  }

  const comment = new CommentModel()

  comment.message = data.message
  comment.datetime = new Date()
  comment.postId = data.postId
  comment.userId = data.userId
  comment.reactions = []
  comment.user = user

  const newComment = await comments.save(comment)

  console.log("Comment has been saved. Comment id is", comment.id)

  return newComment
}

export const findComments = async () => {
  const foundComments = await comments.find()

  console.log("All comments from the db: ", foundComments)

  return foundComments
}

export const findCommentsByPostId = async (postId: number) => {
  return await comments.find({ where: { postId } })
}