export type TCheckedTree = {
  title?: string
  checked?: boolean
  indeterminate?: boolean
}

export type ITree<T> = {
  children?: ITree<T>[]
} & T
