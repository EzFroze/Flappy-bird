import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('likes')
export class LikesModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  userId: number = 0

  @Column({ nullable: true })
  postId: number = 0

  @Column({ nullable: true })
  commentId: number = 0
}