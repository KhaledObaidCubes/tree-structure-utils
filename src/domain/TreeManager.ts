import type { ITree } from './meta/i-tree'
import { Ref, ref, shallowReactive } from 'vue'
const syncRootState = <T>(node: TreeManager<T>) => {
  const root = getParentChain(node)[0] ?? node
  root.children?.map(child => child.state.value)
}

const updateIndices = <T>(node: TreeManager<T>, start = 0) => node.children?.forEach((x, i) => i >= start && (x.index = i))

const setDepth = <T>(node: TreeManager<T>) => {
  node.depth = node.parent ? node.parent.depth + 1 : 0 //check if it was on root the depth will be 0 other wise it will be the parent's depth +1
  node.children?.forEach(setDepth) //recursive setDepth on all node's children
}

const toJSON = <T>(node: TreeManager<T>): ITree<T> => ({ ...node.state.value, children: node.children?.map(toJSON) })

const addNode = <T>(owner: TreeManager<T>, data: ITree<T> | TreeManager<T>, index = -1, isInit = false): TreeManager<T> => {
  const newNode = data instanceof TreeManager ? data : new (owner as any)['constructor'](data)

  owner.state.value.children ??= []
  if (index >= 0) {
    newNode.index = index
    owner.state.value.children.splice(index, isInit ? 1 : 0, newNode.state.value)
    owner.children.splice(index, isInit ? 1 : 0, newNode)
    !isInit && updateIndices(owner, index)
  } else if (index === -1) {
    newNode.index = owner.state.value.children?.length || 0
    if (!isInit) {
      owner.state.value.children.push(newNode.state.value)
      owner.children.push(newNode)
    }
  }

  newNode.parent = owner

  //  Ensure reactivity is preserved by syncing root
  if (!isInit) syncRootState(newNode)

  return newNode
}

const remove = <T>(node: TreeManager<T>): TreeManager<T> | undefined => {
  node.parent?.state.value.children?.splice(node.index, 1)

  const removed = node.parent?.children?.splice(node.index, 1)
  if (removed?.[0]) syncRootState(removed[0])
  if (!removed) return undefined
  node.parent && updateIndices(node.parent as any, removed[0].index)

  removed[0].parent = undefined
  removed[0].index = 0
  return removed[0]
}

const getParentChain = <T>(owner: TreeManager<T>) => {
  const p = [] as TreeManager<T>[]
  if (!owner.parent) return p
  p.push(...getParentChain(owner.parent), owner.parent)

  return p
}

export class TreeManager<T> {
  private _depth = 0
  private _index = 0
  private _parent: undefined | TreeManager<T>
  private _children = shallowReactive([]) as TreeManager<T>[]
  constructor(initState = { children: [] } as ITree<T>) {
    this._state.value = initState

    initState.children?.forEach((x, index) => this.addNode(x, index, true))
  }
  get parent(): undefined | TreeManager<T> {
    return this._parent
  }
  set parent(parent: TreeManager<T> | undefined) {
    this._parent = parent
    setDepth(this)
  }
  get index() {
    return this._index
  }
  set index(v: number) {
    this._index = v
  }
  get data() {
    const { children, ...rest } = this.state.value
    return rest
  }
  get children() {
    return this._children
  }
  get depth() {
    return this._depth
  }
  set depth(v: number) {
    this._depth = v
  }

  private _state = ref({}) as Ref<ITree<T>>

  get state() {
    return this._state
  }

  emptyAllChildren() {
    this._state.value.children = []
  }
  updater(value: any) {
    this._state.value = value
    debugger
  }
  addNode(data: ITree<T> | TreeManager<T>, index = -1, isInit = false): TreeManager<T> {
    return addNode(this, data, index, isInit)
  }

  addNodes(data: (ITree<T> | TreeManager<T>)[]): TreeManager<T>[] {
    return data.map((x, i) => this.addNode(x, i))
  }

  removeNodes(data: TreeManager<T>[]): (TreeManager<T> | undefined)[] {
    return data.map(this.remove)
  }

  remove(node: TreeManager<T> = this): TreeManager<T> | undefined {
    return remove(node)
  }

  toJSON(): ITree<T> {
    return toJSON(this)
  }

  getParentChain() {
    return getParentChain(this)
  }
  reset(initState: ITree<T> = { children: [] } as ITree<T>) {
    this._state.value = initState
    this._children.splice(0) // clear existing children nodes
    this._depth = 0
    this._index = 0
    this._parent = undefined

    initState.children?.forEach((x, index) => this.addNode(x, index, true))
  }
}
