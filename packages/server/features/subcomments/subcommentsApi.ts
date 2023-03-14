import { UserModel } from '../users/usersModel'
import { AppDataSource } from '../../app/data-source'
import { SubcommentModel } from './subcommentsModel'
import { CommentModel } from '../comments/commentsModel'

const subcomments = AppDataSource.getRepository(SubcommentModel)
const users = AppDataSource.getRepository(UserModel)
const comments = AppDataSource.getRepository(CommentModel)

export const createSubcomment = async (data: SubcommentModel) => {
  const user = new UserModel()

  user.id = data.user.id
  user.avatar = data.user.avatar
  user.display_name = data.user.display_name
  user.login = data.user.login

  const savedUser = await users.save(user)
  const foundComment = await comments.findOneBy({ id: data.commentId })

  await comments.save({ ...foundComment })

  const subcomment = new SubcommentModel()

  subcomment.datetime = new Date()
  subcomment.likes = 0
  subcomment.message = data.message
  subcomment.commentId = data.commentId
  subcomment.user = data.user

  return subcomments.save(subcomment)
}

export const findSubcomments = async (commentId: number) => {
  const foundComments = await subcomments.find({
    relations: {
      user: true,
      comment: true,
    },
    where: { commentId },
  })

  return foundComments
}

export const findSubcommentsByCommentId = async (commentId: number) => {
  return await subcomments.find({ where: { commentId } })
}
