export type ChangeCallback<T> = <K extends keyof T>(prop: K, before: T[K], after: T[K]) => void

export type ChangeLog<T> = {
  property: keyof T
  before: T[keyof T]
  after: T[keyof T]
  timestamp: number
}
