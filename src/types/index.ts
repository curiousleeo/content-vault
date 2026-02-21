export interface Author {
  name: string;
  handle: string;
  avatar: string;
}

export interface Tweet {
  id: string;
  text: string;
  author: Author;
  category: Category;
  date: string;
  likes: number;
  retweets: number;
  bookmarks: number;
  tweetUrl?: string;
  upvotes: number;
  contributedBy?: {
    name: string;
    handle: string;
  };
}

export interface Contributor {
  handle: string;
  name: string;
  tweetsAdded: number;
  joinedDate: string;
}

export type Category =
  | "Content Strategy"
  | "Personal Branding"
  | "Community Building"
  | "Web3 Marketing"
  | "Copywriting"
  | "Growth";

export type SortOption = "date" | "upvotes";

export interface TweetsData {
  tweets: Tweet[];
}
