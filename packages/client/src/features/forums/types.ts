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
  user: User
  comments: {
    last: Comment,
    quantity: number
  }
}

export interface Comment {
  id?: number
  message: string
  datetime?: Date
  reactions?: {
    type: number,
    count: number
  }[]
  user?: User
  postId: number
}

export type ForumTopic = {
  id: number,
  name: string,
  lastMessage: {
    user?: string,
    date?: string,
    time?: string,
    content?: string,
  },
  messagesNumber: number,
  likes: number,
  user: User
}