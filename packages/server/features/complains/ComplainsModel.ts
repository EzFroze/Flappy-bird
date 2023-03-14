import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('complains')
export class ComplainModel {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', nullable: true })
  postId = 0

  @Column({ type: 'int', nullable: true })
  commentId = 0

  @Column({ type: 'int', nullable: true })
  subcommentId = 0

  @Column({ type: 'text', nullable: true })
  message = ''
}
