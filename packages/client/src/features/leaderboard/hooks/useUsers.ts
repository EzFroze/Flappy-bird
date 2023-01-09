import { useMemo } from "react";
import { SortOrder } from "../components/Leaderboard";

export const useSortedUsers = (users: any[], sort: string, order: SortOrder) => {
  const sortedPosts: any[] = useMemo(() => {
    if (sort) {
      return [...users].sort((a, b) => {
        if (a[sort] < b[sort]) {
          return order == SortOrder.AscendingOrder ? 1 : -1
        }

        if (a[sort] > b[sort]) {
          return order == SortOrder.AscendingOrder ? -1 : 1
        }

        return 0;

      });
    }
    return users;
  }, [sort, users, order]);

  return sortedPosts;
};

export const useUsers = (users: any[], sort: string, query: string, order: SortOrder) => {
  const sortedUsers = useSortedUsers(users, sort, order);
  const sortedAndSearchedUsers = useMemo(() => {
    return sortedUsers.filter(user => user.name.toLowerCase().includes(query))
  }, [query, sortedUsers]);

  return sortedAndSearchedUsers;
};