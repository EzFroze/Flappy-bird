import { UserModel } from '../features/users/usersModel'
import { DataSource } from 'typeorm'
import { PostModel } from '../features/posts/postsModel'
import { CommentModel } from '../features/comments/commentsModel'
import { LikesModel } from '../features/likes/LikesModel'
import { SubcommentModel } from '../features/subcomments/subcommentsModel'
import { ComplainModel } from '../features/complains/ComplainsModel'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [
    UserModel,
    PostModel,
    CommentModel,
    LikesModel,
    SubcommentModel,
    ComplainModel,
  ],
  subscribers: [],
  migrations: [],
})
