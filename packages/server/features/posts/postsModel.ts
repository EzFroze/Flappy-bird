import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export interface Post {
  title: string
  message: string
  datetime?: Date
  avatar?: string,
  likes?: number
  userId: number
  comments: number
}

@Entity('posts')
export class PostModel implements Post {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  title: string = ''

  @Column('text')
  message: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('text')
  avatar: string = ''

  @Column('integer')
  likes: number = 0

  @Column({ type: 'integer', nullable: true })
  comments: number = 0

  @Column('integer')
  userId!: number
}