import { User, UserModel } from "./usersModel"
import { AppDataSource } from "../../app/data-source"

const repo = AppDataSource.getRepository(UserModel)

// creating user
export const createUser = async (data: User) => {
  console.log('creating user...', data)

  const user = new UserModel()
  
  user.login = data.login
  user.avatar = data.avatar
  user.display_name = data.display_name
  user.id = data.id

  await repo.save(user)

  console.log("User has been saved. User id is", user.id)

  return user
}

// updating user
export const updateUser = async (id: number, data: User) => {
  console.log('updating user...')

  const user = new UserModel()

  await repo.update(id, data)

  console.log("User has been updated. User id is", id)

  return user
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