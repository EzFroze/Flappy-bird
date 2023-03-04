import { UserModel } from "./usersModel"
import { AppDataSource } from "../../app/data-source"

const repo = AppDataSource.getRepository(UserModel)

export const findUsers = async () => {
  const users = await repo.find()

  //console.log("All users from the db: ", users)

  return users
}

export const findUserById = async (id: number) => {
  return await repo.findOneBy({ id })
}

export const createUser = async (data: UserModel) => {
  const user = new UserModel()

  user.id = data.id
  user.avatar = data.avatar
  user.display_name = data.display_name
  user.login = data.login
  user.theme = data.theme

  return repo.save(user)
}

// user.first_name = 'lolkek'
// user.second_name = 'azaza'
// user.email = 'test@yandex.ru'
// user.login = 'anon'
// user.password = 'admin'
// user.phone = '0123456789'