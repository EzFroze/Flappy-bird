import { getRandomInt } from "../utils/math";

export default class UsersService {
  static async getTop(limit = 10, page = 1) {

    const params = {
      _limit: limit,
      _page: page
    }

    const url = new URL("https://jsonplaceholder.typicode.com/users")
    Object.entries(params).forEach(([key, value], index) => url.searchParams.append(key, value.toString()));

    const options = {
      method: 'GET',
      body: JSON.stringify(params)
    };

    const response = await fetch(url)
    if (response.ok) {
      const headers = response.headers
      const json = await response.json();
      const tempUsers  = json.map((user:any, index:number) => ({...user, scores: (json.length - index) * 10, date: new Date(Date.now()).toLocaleDateString()}))
      return [tempUsers, headers];
    } else {
      throw new Error("Http error:" + response.status);
    }
  }
}