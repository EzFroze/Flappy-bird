export type FetchUsersType = ((...args: any[]) => Promise<void>)
export const enum SortOrder {
  AscendingOrder,
  DescendingOrder
}