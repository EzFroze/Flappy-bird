import { UserModel } from "../users/usersModel"//"features/users/usersModel"
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PostModel } from "../posts/postsModel"
import { AutoIncrement } from "sequelize-typescript"

@Entity('comments')
export class CommentModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  message: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes: number = 0

  @Column({ type: 'simple-json', nullable: true })
  reactions: { type: number; count: number }[] = []

  @Column({ nullable: true })
  postId!: number

  @Column({ nullable: true })
  @Generated('increment')
  subCommentId: number = 0

  @ManyToOne(() => UserModel)
  user!: UserModel

  @ManyToOne(() => PostModel, (post) => post.comments)
  post!: PostModel
}