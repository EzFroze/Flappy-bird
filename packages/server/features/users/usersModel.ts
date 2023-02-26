import { CommentModel } from "../comments/commentsModel"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { PostModel } from "../posts/postsModel"


@Entity('users')
export class UserModel {
  @PrimaryColumn()
  id!: number
  
  @Column({ nullable: true })
  login: string = ''
  
  @Column({ nullable: true })
  avatar: string = ''
  
  @Column({ nullable: true })
  display_name: string = ''
}