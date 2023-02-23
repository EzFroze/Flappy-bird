import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export interface Post {
  title: string
  body: string
  datetime?: Date
  avatar?: any,
  likes?: number
  userId: number
}

@Entity('posts')
export class PostModel implements Post {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  title: string = ''

  @Column('text')
  body: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  datetime: Date = new Date()

  @Column('text')
  avatar: string = ''

  @Column('integer')
  likes: number = 0

  @Column('integer')
  userId!: number
}