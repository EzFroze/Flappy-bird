import { Sequelize } from "sequelize-typescript";

const { 
  POSTGRES_USER, 
  POSTGRES_PASSWORD, 
  POSTGRES_DB, 
  POSTGRES_PORT 
} = process.env

// Создаем инстанс Sequelize
export const sequelize = new Sequelize({
  host: 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'admin123',
  database: POSTGRES_DB,
  dialect: 'postgres'
}); 