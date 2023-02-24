import { ForumsNames } from './types'

export const headers = [
  { name: 'Название темы', width: 'auto' },
  { name: 'Последнее сообщение', width: 200 },
  { name: 'Ответов', width: 50 },
  { name: 'Лайков', width: 50 },
]

export const forumThemes = [
  { title: 'Развитие портала', link: ForumsNames.evolution },
  { title: 'Технологии', link: ForumsNames.technology },
  { title: 'Политика', link: ForumsNames.politics },
  { title: 'Творчество', link: ForumsNames.art },
  { title: 'Recycle Bin', link: ForumsNames.recycle },
]

export const titles = ['Форумы', 'Темы', 'Ответы']
