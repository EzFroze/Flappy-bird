import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { CommentModel, type Comment } from "./comments/commentsModel"
import type { User } from "./users/usersModel"

@Entity('example')
export class UserModel implements User {
  @PrimaryColumn()
  id!: number
  
  @Column()
  login: string = ''
  
  @Column({ nullable: true })
  avatar: string = ''
  
  @Column({ nullable: true })
  display_name: string = ''

  @OneToMany(() => CommentModel, (comment) => comment.user)
  @JoinColumn()
  comments?: Comment[]
}