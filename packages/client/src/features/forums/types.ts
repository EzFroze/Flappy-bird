export enum ForumsNames {
  evolution = 'evolution',
  technology = 'technology',
  politics = 'politics',
  art = 'art',
  recycle = 'recycle',
}

export const actionPaths = {
  createThread: 'createThread',
} as const

export const ForumsNamesRu = {
  [ForumsNames.evolution]: 'Развитие портала',
  [ForumsNames.technology]: 'Технологии',
  [ForumsNames.politics]: 'Политика',
  [ForumsNames.art]: 'Творчество',
  [ForumsNames.recycle]: 'Recycle Bin',
} as const

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface Topic {
  id: number
  title: string
  message: string
  datetime?: Date
  avatar?: any,
  likes?: number
  userId: number
  comments: number
}