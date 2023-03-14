import { AppDataSource } from '../../app/data-source'
import { LikesModel } from './LikesModel'

const likes = AppDataSource.getRepository(LikesModel)

export const createLike = async (data: LikesModel) => {
  const like = new LikesModel()
  const foundLike = await likes.findOneBy({
    userId: data.userId,
    postId: data.postId,
    commentId: data.commentId,
  })

  if (foundLike) {
    await likes.delete({ id: foundLike.id })

    return likes.find()
  }

  like.userId = data.userId
  like.postId = data?.postId || 0
  like.commentId = data?.commentId || 0

  await likes.save(like)

  return likes.find()
}

export const findAllLikes = async () => {
  return likes.find()
}
