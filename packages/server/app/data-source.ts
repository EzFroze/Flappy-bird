import { UserModel } from "../features/users/usersModel";
import { DataSource } from "typeorm";
import { PostModel } from "../features/posts/postsModel";
import { CommentModel } from "../features/comments/commentsModel";

const { 
  POSTGRES_USER, 
  POSTGRES_PASSWORD, 
  POSTGRES_DB, 
  POSTGRES_PORT 
} = process.env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'admin123',
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [UserModel, PostModel, CommentModel],
  subscribers: [],
  migrations: [],
})