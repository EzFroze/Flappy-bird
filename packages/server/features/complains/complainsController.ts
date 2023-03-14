import { AppDataSource } from "../../app/data-source"
import { ComplainModel } from "./ComplainsModel"

const complains = AppDataSource.getRepository(ComplainModel)

export const createComplain = async (data: ComplainModel) => {
  const complain = new ComplainModel()

  const foundComplain = await complains.findOneBy({
    postId: data.postId,
    commentId: data.commentId,
    subcommentId: data.subcommentId
  })

  if (foundComplain) {
    return complains.delete({ id: foundComplain.id })
  }
  
  complain.postId = data?.postId
  complain.commentId = data?.commentId || 0
  complain.subcommentId = data?.subcommentId || 0
  complain.message = data.message || ''

  return complains.save(complain)
}

export const findAllComplains = async () => {
  return complains.find()
}