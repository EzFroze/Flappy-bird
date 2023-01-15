export type FetchUsersType = ((...args: any[]) => Promise<void>)
export const enum SortOrder {
  AscendingOrder,
  DescendingOrder
}
export interface User {
  id: number;
  place: number;
  name: string;
  scores: number;
  date: string;
}

export interface UsersListProps {
  users: User[];
}

export interface ColumnHeaderProps {
  text: string;
  width: number;
  changeSortOrder: (sort: keyof User) => void;
  sortField: keyof User;
  sortOrder: SortOrder;
}

export interface UsersFilter {
  sort: keyof User;
  query: string;
  order: SortOrder;
}

