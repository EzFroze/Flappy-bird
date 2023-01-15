import { User } from "../types";

export default class UsersService {
  static async getTop(usersInPage = 10, page = 1) {

    const params = {
      _limit: usersInPage,
      _page: page
    }

    const url = new URL("https://jsonplaceholder.typicode.com/users")
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value.toString()));

    const response = await fetch(url);
    if (response.ok) {
      const headers = response.headers;
      const json = await response.json();
      const tempUsers = json.map((user: User, index: number) => {
        const place: number = user.id;
        return { ...user, place, scores: (json.length - index) * 10, date: new Date(Date.now()).toLocaleDateString() }
      });
      return [tempUsers, headers];
    } else {
      throw new Error("Http error:" + response.status);
    }
  }
}