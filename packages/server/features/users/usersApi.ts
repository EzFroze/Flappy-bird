import { User, UserModel } from "./usersModel"
import { AppDataSource } from "../../app/data-source"

const repo = AppDataSource.getRepository(UserModel)

export const createUser = async () => {
  let user = new UserModel()
  
  user.first_name = 'lolkek'
  user.second_name = 'azaza'
  user.email = 'test@yandex.ru'
  user.login = 'anon'
  user.password = 'admin'
  user.phone = '0123456789'

  await repo.save(user)

  console.log("User has been saved. User id is", user.id)
}

export const findUsers = async () => {
  const users = await repo.find()

  console.log("All users from the db: ", users)

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