import type { User } from "../users/usersModel"//"features/users/usersModel"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

export interface Comment {
  id?: number
  message: string
  datetime?: Date
  postId: number
  userId: number
  reactions?: {
    type: number,
    count: number
  }[]
  user: User | null
}

@Entity('comments')
export class CommentModel implements Comment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  message: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('integer')
  likes: number = 0

  @Column('integer')
  postId!: number

  @Column('integer')
  userId!: number

  @Column({ type: 'simple-json', nullable: true })
  reactions: { type: number; count: number }[] = []

  @Column({ type: 'simple-json', nullable: true })
  user: User | null = null
}