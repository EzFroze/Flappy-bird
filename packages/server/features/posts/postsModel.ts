import { UserModel } from "../users/usersModel"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CommentModel } from "../comments/commentsModel"

@Entity('posts')
export class PostModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  title: string = ''

  @Column('text')
  message: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes: number = 0

  @ManyToOne(() => UserModel)
  user!: UserModel

  @OneToMany(() => CommentModel, (comment) => comment.post)
  comments!: CommentModel[]
}