import { UserModel } from "./usersModel"
import { AppDataSource } from "../../app/data-source"

const repo = AppDataSource.getRepository(UserModel)

// creating user
export const createUser = async (data: UserModel) => {
  console.log('creating user...', data)
}

// updating user
export const updateUser = async (id: number, data: UserModel) => {
  console.log('updating user...', id, data)
}

export const findUsers = async () => {
  const users = await repo.find()

  //console.log("All users from the db: ", users)

  return users
}

export const findUserById = async (id: number) => {
  return await repo.findOneBy({ id })
}

// user.first_name = 'lolkek'
// user.second_name = 'azaza'
// user.email = 'test@yandex.ru'
// user.login = 'anon'
// user.password = 'admin'
// user.phone = '0123456789'