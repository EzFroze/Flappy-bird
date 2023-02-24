import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

export interface User {
  id: number
  login: string
  avatar: string
  display_name: string
}

@Entity('users')
export class UserModel implements User {
  @PrimaryColumn()
  id!: number
  
  @Column()
  login: string = ''
  
  @Column({ nullable: true })
  avatar: string = ''
  
  @Column({ nullable: true })
  display_name: string = ''
}