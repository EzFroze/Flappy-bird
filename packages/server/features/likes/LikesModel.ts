import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('likes')
export class LikesModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', nullable: true })
  userId = 0

  @Column({ type: 'int', nullable: true })
  postId = 0

  @Column({ type: 'int', nullable: true })
  commentId = 0
}