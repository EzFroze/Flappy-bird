import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export interface Comment {
  body: string
  datetime?: Date
  postId: number
  reactions?: {
    type: number,
    count: number
  }[]
}

@Entity('comments')
export class CommentModel implements Comment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  body: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes: number = 0

  @Column('integer')
  postId!: number

  @Column({ type: 'simple-json', nullable: true })
  reactions: { type: number; count: number }[] = []
}