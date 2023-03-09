import { UserModel } from "../users/usersModel"//"features/users/usersModel"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PostModel } from "../posts/postsModel"

@Entity('comments')
export class CommentModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  message = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes = 0

  @Column({ type: 'simple-json', nullable: true })
  reactions: { type: number; count: number }[] = []

  @Column({ nullable: true })
  postId!: number

  @ManyToOne(() => UserModel)
  user!: UserModel

  @ManyToOne(() => PostModel, (post) => post.comments)
  post!: PostModel
}