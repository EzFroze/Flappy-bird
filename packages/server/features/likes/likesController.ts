import { AppDataSource } from "../../app/data-source"
import { LikesModel } from "./LikesModel"

const likes = AppDataSource.getRepository(LikesModel)

export const createLike = async (data: LikesModel) => {
  const like = new LikesModel()
  const foundLike = await likes.findOneBy({
    userId: data.userId,
    postId: data.postId,
    commentId: data.commentId
  })

  if (foundLike) {
    return likes.delete({ id: foundLike.id })
  }
  
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