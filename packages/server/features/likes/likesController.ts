import { AppDataSource } from "../../app/data-source"
import { LikesModel } from "./LikesModel"

const likes = AppDataSource.getRepository(LikesModel)

export const createLike = (data: LikesModel) => {
  const like = new LikesModel()

  like.userId = data.userId
  like.postId = data?.postId || 0
  like.commentId = data?.commentId || 0

  return likes.save(like)
}

export const deleteLike = (id: LikesModel['id'], type: 'post' | 'comment') => {
  return likes.delete({ [`${type}Id`]: id })
}

export const findAllLikes = async () => {
  return likes.find()
}