import {PostItem} from "../models/post-item";

export class PostsHelper {
  public static getFilteredPostItems = (posts: PostItem[], searchInput: string, selectInput: string) => {
    const bySearchInput = posts.filter((post: PostItem) => post.title.toLowerCase().includes(searchInput.toLowerCase()));
    if (selectInput === 'All authors') {
      return bySearchInput
    }
    return bySearchInput.filter((post: PostItem) => post.user?.name === selectInput);
  }

  public static getFilterByOptions = (posts: PostItem[]) => {
    const users = posts.map((post) => post.user?.name);
    const usersWithoutDuplicates = Array.from(new Set(users));
    return ['All authors', ...usersWithoutDuplicates];
  }

  public static getSelectedPost = (posts: PostItem[], id: number) => {
    return posts.filter((post: PostItem) => post.id === id)[0];
  }
}