export interface Pagination<T = any> extends ListOptions {
  data: T[]
  total: number
}

export interface ListOptions {
  skip: number
  take: number
}
