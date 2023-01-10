export enum ForumsNames {
  evolution = 'evolution',
  technology = 'technology',
  politics = 'politics',
  art = 'art',
  recycle = 'recycle'
}

export const actionPaths = {
  createThread: 'createThread'
} as const

export const ForumsNamesRu = {
  [ForumsNames.evolution]: 'Развитие портала',
  [ForumsNames.technology]: 'Технологии',
  [ForumsNames.politics]: 'Политика',
  [ForumsNames.art]: 'Творчество',
  [ForumsNames.recycle]: 'Recycle Bin'
} as const