import { UserModel } from "../../features/users/usersModel"
import { AppDataSource } from "../../app/data-source"
import { Comment, CommentModel } from "./commentsModel"
import fetch from 'node-fetch';

const comments = AppDataSource.getRepository(CommentModel)

export const createComment = async (data: Comment) => {
  let comment = new CommentModel()

  const response = await fetch('https://api.github.com/users/github');
  const obj = await response.json();
  
  console.log(obj);
  
  await comments.save({ ...comment, ...data })

  console.log("Post has been saved. Post id is", comment.id)
}

export const findComments = async () => {
  const foundComments = await comments.find()

  console.log("All comments from the db: ", foundComments)

  return foundComments
}

export const findCommentsByPostId = async (postId: number) => {
  return await comments.find({ where: { postId } })
}