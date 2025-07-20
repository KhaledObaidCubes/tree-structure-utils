import type { ChangeCallback, ChangeLog } from './i-types'
export class Model<T extends Record<string, any>> {
  private _state: T
  private _history: ChangeLog<T>[] = []

  constructor(initialState: T) {
    this._state = { ...initialState }
  }

  get state(): T {
    return this._state
  }

  setProperty<K extends keyof T>(key: K, newValue: T[K]): void {
    const oldValue = this._state[key]
    this._history.push({
      property: key,
      before: oldValue,
      after: newValue,
      timestamp: Date.now()
    })

    this._state[key] = newValue
  }

  getHistory(): ChangeLog<T>[] {
    return this._history
  }
}

//////////////////////////////////////////////

export function createObservableModel<T extends Record<string, any>>(initialState: T, onChange: ChangeCallback<T>): T {
  return new Proxy(initialState, {
    // set(target, prop: keyof T, value: any): boolean {
    //   const before = target[prop]
    //   target[prop] = value
    //   onChange(prop, before, value)
    //   return true
    // }
    set(target: T, prop: string | symbol, value: any, _receiver: any): boolean {
      const key = prop as keyof T
      const before = target[key]
      target[key] = value
      onChange(key, before, value)
      return true
    }
  })
}
