import type { TCheckedTree, ITree } from './meta/i-tree'
import { TreeManager } from './TreeManager'

export class TreeManagerWithCheckBox extends TreeManager<TCheckedTree> {
  constructor(initState = { children: [] } as unknown as ITree<TCheckedTree>) {
    super(initState)
    this.state.value.checked ??= false
    this.state.value.indeterminate ??= false
  }

  override reset(initState: ITree<TCheckedTree> = { children: [] } as unknown as ITree<TCheckedTree>) {
    this.state.value = initState
    this.children.splice(0)
    this.depth = 0
    this.index = 0
    this.parent = undefined

    initState.children?.forEach((x, index) => this.addNode(x, index, true))
    this.refreshState()
  }

  public get checked(): boolean {
    if (!this.children.length) {
      return !!this.state.value.checked
    }
    return this.children.every(child => child.state.value.checked)
  }

  public get indeterminate(): boolean {
    if (!this.children.length) return false

    const someChecked = this.children.some(child => child.state.value.checked)
    const allChecked = this.children.every(child => child.state.value.checked)

    return someChecked && !allChecked
  }

  public checkMe(checked: boolean) {
    debugger
    this.state.value.checked = checked
    this.state.value.indeterminate = false

    this.children.forEach(child => {
      child.checkMe(checked)
    })

    this.parent?.refreshStateUpward()
  }

  public refreshState() {
    const allChecked = this.children.every(c => c.data.checked)
    const someChecked = this.children.some(c => c.data.checked || c.data.indeterminate)

    this.state.value.checked = allChecked
    this.state.value.indeterminate = someChecked && !allChecked
  }

  refreshStateUpward() {
    this.refreshState()
    ;(this.parent as TreeManagerWithCheckBox)?.refreshStateUpward()
  }
}
