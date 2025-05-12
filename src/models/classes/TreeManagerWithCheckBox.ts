import type { ITreeManager } from '../interfaces/I-TreeManager'
import type { TCheckedTree } from '../interfaces/i-types'
import { TreeManager } from './TreeManager'

export class TreeManagerWithCheckBox<T extends TCheckedTree> extends TreeManager<T> {
  /**
   *
   */
  constructor(data: ITreeManager<T>) {
    super(data)
  }
  checkBoxController(node: any) {
    node.data.checked = !node.data.checked
    const allChecked = node.parent?.children.every((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
    const someChecked = node.parent?.children.some((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
    node.parent.data.checked = allChecked
    node.parent.data.indeterminate = someChecked && !allChecked
    function checkSubChildren(node: any) {
      node.data.checked ? node.children.map((child: any) => (child.data.checked = true)) : node.children.map((child: any) => (child.data.checked = false))
      node.children.map((x: any) => {
        if (!!x.children.length) checkSubChildren(x)
      })
    }
    checkSubChildren(node)

    function sayParentNAme(node: any | undefined) {
      if (node.parent == undefined) return
      if (!!node.children.length) console.log(`${node.data.name} has ${node.children.length} children`)
      const AllChildrenInParentChecked = node.children.every((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)
      const someChildrenInParentChecked = node.children.some((x: TreeManagerWithCheckBox<TCheckedTree>) => x.data.checked)

      node.parent.data.checked = AllChildrenInParentChecked
      node.parent.data.indeterminate = someChildrenInParentChecked && !AllChildrenInParentChecked

      sayParentNAme(node.parent)
    }
    sayParentNAme(node.parent)
    // debugger
  }
}
