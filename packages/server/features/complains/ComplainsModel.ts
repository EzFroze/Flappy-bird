import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('complains')
export class ComplainModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  postId: number = 0

  @Column({ nullable: true })
  commentId: number = 0

  @Column({ nullable: true })
  subcommentId: number = 0

  @Column({ nullable: true })
  message: string = ''
}