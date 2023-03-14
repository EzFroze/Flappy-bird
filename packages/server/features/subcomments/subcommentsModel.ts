import { UserModel } from '../users/usersModel' //"features/users/usersModel"
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PostModel } from '../posts/postsModel'
import { CommentModel } from '../comments/commentsModel'

@Entity('subcomments')
export class SubcommentModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', nullable: true })
  message = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes = 0

  @Column({ type: 'simple-json', nullable: true })
  reactions: { type: number; count: number }[] = []

  @Column({ nullable: true })
  commentId!: number

  @ManyToOne(() => UserModel)
  user!: UserModel

  @ManyToOne(() => CommentModel)
  comment!: CommentModel
}
