import { Column, Entity, PrimaryColumn } from "typeorm"


@Entity('users')
export class UserModel {
  @PrimaryColumn()
  id!: number
  
  @Column({ type: 'text', nullable: true })
  login = ''
  
  @Column({ type: 'text', nullable: true })
  avatar = ''
  
  @Column({ type: 'text', nullable: true })
  display_name = ''

  @Column({ type: 'text', nullable: true })
  theme = 'light'
}