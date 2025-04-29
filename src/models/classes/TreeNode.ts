import type { ITreeNode } from '../interfaces/I-TreeNode'
import type { TNode } from '../interfaces/i-types'
import { flattTree, getAllChildren, drawTree, drawTreeWithInfo } from '../tree-sublementry'

type json = { name: string; children: any[] }
class TreeNode implements ITreeNode {
  data: TNode
  numDescendants: number = 0
  totalNodes: number = 0
  //instead of initialize data, a default empty object is passed
  constructor(nodeToAdd: TNode = { name: '', children: [] }) {
    this.data = {
      name: nodeToAdd.name,
      children: []
    }

    nodeToAdd.children.forEach(x => this.addChild(x))
    this.updateAncestorsDescendants()
  }
  private _depth: number = 0
  private _indexInParent: number = 0
  private _parentTree: TreeNode | undefined //undefined in case it is the root of the tree

  addChild(node: TreeNode | TNode) {
    //node could be created using as an instance of TreeNode or it could be read from JSON object
    const realNode = node instanceof TreeNode ? node : new TreeNode(node)

    // Set depth indexInParent parent based on current node
    realNode.depth = this.depth + 1
    realNode.indexInParent = this.data.children.length
    realNode.parentTree = this

    // Push child
    this.data.children.push(realNode)

    // Recursively fix children depths
    this.updateChildDepthsAndIndex(realNode, realNode.depth)

    //this.updateDescendants()
    this.updateAncestorsDescendants()
  }

  // return tree as JSON
  toJSONFormat(): json {
    return { name: this.data.name, children: this.data.children.map(x => x.toJSONFormat()) }
  }

  totalNodeNumber(): number {
    return getAllChildren(this)
  }

  getTreeShape(withInfo: boolean): string {
    if (withInfo) {
      return drawTreeWithInfo(this)
    } else {
      return drawTree(this)
    }
  }

  set depth(value: number) {
    this._depth = value
  }
  get depth() {
    return this._depth
  }

  set indexInParent(value: number) {
    this._indexInParent = value
  }
  get indexInParent() {
    return this._indexInParent
  }

  set parentTree(value: TreeNode | undefined) {
    if (!value) throw new Error('CANNOT SET PARENT TO UNDEFINED')
    this._parentTree = value
  }
  get parentTree() {
    return this._parentTree
  }

  get flattenArray() {
    return flattTree(this)
  }
  private updateChildDepthsAndIndex(node: TreeNode, currentDepth: number) {
    node.depth = currentDepth
    node.data.children.forEach((child, index) => {
      const childNode = child as TreeNode
      childNode.parentTree = node
      childNode.indexInParent = index // Set the correct index here (node index in its parent)
      this.updateChildDepthsAndIndex(childNode, currentDepth + 1)
    })
  }
  private updateDescendants() {
    this.numDescendants = getAllChildren(this) - 1
    this.totalNodes = getAllChildren(this)
  }

  private updateAncestorsDescendants() {
    let current: TreeNode | undefined = this
    while (current) {
      current
      current.updateDescendants()
      current = current.parentTree
    }
  }
}

export { TreeNode }
