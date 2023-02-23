import { AppDataSource } from "../../app/data-source"
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm"

export interface User {
  first_name: string
  second_name: string
  email: string
  login: string
  phone: string
  password: string
  avatar?: string
  display_name?: string
  registration?: Date
}

@Entity('users')
export class UserModel implements User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  first_name: string = ''
  
  @Column()
  second_name: string = ''
  
  @Column()
  email: string = ''
  
  @Column()
  login: string = ''
  
  @Column()
  phone: string = ''
  
  @Column()
  password: string = ''
  
  @Column()
  avatar?: string = ''
  
  @Column()
  display_name?: string = ''

  @Column({ type: 'timestamptz', nullable: true })
  createdAt?: Date = new Date()
}