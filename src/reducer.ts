import { DiscussionResponse } from "./api";

export interface FilterOptions {
  orderBy: "newest" | "oldest" | "mostrecommended";
  pageSize: number;
  threads: "collapsed" | "expanded" | "unthreaded";
}

export type OrderByValues = "newest" | "oldest" | "mostrecommended";

interface OrderBy {
  type: "SET_ORDER_BY";
  orderBy: OrderByValues;
}

interface PageSize {
  type: "SET_PAGE_SIZE";
  pageSize: number;
}

export type ThreadValues = "collapsed" | "expanded" | "unthreaded";

interface Threads {
  type: "SET_THREADS";
  threads: ThreadValues;
}

interface Discussion {
  type: "SET_DISCUSSION";
  discussion: DiscussionResponse;
}

export type Action = OrderBy | PageSize | Threads | Discussion;

interface State {
  shortURL: string;
  filters: FilterOptions;
  discussion?: DiscussionResponse;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ORDER_BY":
      return {
        ...state,
        filters: { ...state.filters, orderBy: action.orderBy }
      };
    case "SET_PAGE_SIZE":
      return {
        ...state,
        filters: { ...state.filters, pageSize: action.pageSize }
      };
    case "SET_THREADS":
      return {
        ...state,
        filters: { ...state.filters, threads: action.threads }
      };
    case "SET_DISCUSSION":
      return {
        ...state,
        discussion: action.discussion
      };
  }
};
