import type { ITreeNode } from '../interfaces/I-TreeNode'
import type { TNode } from '../interfaces/i-types'
import { v4 as uuidv4 } from 'uuid'
import { flattTree, getAllChildren, drawTree, drawTreeWithInfo, updateNodeDepthsAndIndex } from '../tree-sublementry'

type json = { name: string; children: any[] }
class TreeNode implements ITreeNode {
  data: TNode
  numDescendants: number = 0
  totalNodes: number = 0

  //instead of initialize data, a default empty object is passed
  constructor(nodeToAdd: TNode = { name: '', id: '', children: [] }) {
    this.data = {
      name: nodeToAdd.name,
      id: uuidv4(),
      children: []
    }

    nodeToAdd.children.forEach(x => this.addChild(x))
  }
  private _depth: number = 0
  private _indexInParent: number = 0
  private _parentTree: TreeNode | undefined //undefined in case it is the root of the tree
  //add new node(child)
  addChild(node: TreeNode | TNode) {
    //node could be created using as an instance of TreeNode or it could be read from JSON object
    const realNode = node instanceof TreeNode ? node : new TreeNode(node)

    realNode.indexInParent = this.data.children.length
    realNode.parentTree = this

    // Push child
    this.data.children.push(realNode)

    // Based on the parent(this) depth
    this.updateChildDepthsAndIndex(realNode, this)

    //update relation in the when addNode function invoked
    this.updateAncestorsDescendants()
  }

  //remove node(child) by its instance name
  removeSelf() {
    if (!this.parentTree) {
      throw new Error('Cannot remove root node')
    }

    const parent = this.parentTree

    // searching in node's children
    const index = parent.data.children.findIndex(child => child === this)
    // -1 when not found
    if (index === -1) {
      console.error('NODE DOES NOT EXIST!', {
        thisNode: this,
        parentChildren: parent.data.children
      })
      throw new Error("Node not found in parent's children")
    }
    // remove node object from parent's children
    parent.data.children.splice(index, 1)

    parent.data.children.forEach((child, idx) => {
      child.indexInParent = idx
    })

    parent.updateAncestorsDescendants()
    this.parentTree = undefined
  }

  removeByIndex(indx: number) {
    this.data.children.splice(indx, 1)

    this.data.children.forEach((child, idx) => {
      ;(child as TreeNode).indexInParent = idx
    })

    this.updateAncestorsDescendants()
    this.parentTree = undefined
  }

  //////////////////////////// REMOVE NODE BY ID ///////////////////////////////
  removeNodeById(idToDelete: string): boolean {
    let foundNode: TreeNode | undefined

    function search(node: TreeNode) {
      if (node.data.id === idToDelete) {
        foundNode = node
        return
      }

      for (const child of node.data.children) {
        search(child as TreeNode)
        if (foundNode) return // Stop once found
      }
    }

    search(this)

    if (foundNode) {
      foundNode.removeSelf()
      return true
    } else {
      console.warn(`Node with id "${idToDelete}" not found.`)
      return false
    }
  }
  ///////////////////// MOVE NODE /////////////////

  moveNode(fromID: string, toID: string): boolean {
    let fromNode: TreeNode | undefined = undefined
    let toNode: TreeNode | undefined = undefined

    function search(node: TreeNode) {
      if (node.data.id === fromID) fromNode = node
      if (node.data.id === toID) toNode = node

      if (fromNode && toNode) return

      node.data.children.forEach(child => {
        search(child as TreeNode)
      })
    }

    // 1. Find both nodes
    search(this)

    if (!fromNode || !toNode) {
      console.warn('fromNode or toNode not found.')
      return false
    }
    // this can't be done because root hase no id yet
    if (fromNode === this) {
      console.warn('Cannot move root node.')
      return false
    }

    if (fromNode === toNode) {
      console.warn('Cannot move a node into itself.')
      return false
    }

    // 2. Prevent cycles (can't move a node inside one of its descendants)
    let current: TreeNode | undefined = toNode
    while (current) {
      if (current === fromNode) {
        console.warn('Cannot move a node into one of its descendants.')
        return false
      }
      current = current.parentTree
    }

    // 3. Remove from current parent
    fromNode.removeSelf()

    // 4. Add to new parent
    toNode.addChild(fromNode)

    return true
  }

  /////////////////////////////////////////////////

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
    //if (!value) throw new Error('CANNOT SET PARENT TO UNDEFINED')
    this._parentTree = value
  }
  get parentTree() {
    return this._parentTree
  }

  get flattenArray() {
    return flattTree(this)
  }
  private updateChildDepthsAndIndex(node: TreeNode, parent: TreeNode) {
    updateNodeDepthsAndIndex(node, parent)
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
