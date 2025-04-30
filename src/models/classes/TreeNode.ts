import type { ITreeNode } from '../interfaces/I-TreeNode'
import type { TNode } from '../interfaces/i-types'
import { v4 as uuidv4 } from 'uuid'
import { flattTree, getAllChildren, drawTree, drawTreeWithInfo, updateTreeDepth, updateNodesParent, forVitestUseOnly } from '../tree-sublementry'

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
    this.updateChildDepth(realNode, this)
    this.updateChildParent(realNode)

    //update relation in the when addNode function invoked
    this.updateAncestorsDescendants()
  }

  removeNodeFromChildren(treenode: TreeNode) {
    const foundIndex = this.data.children.findIndex(x => x == treenode)
    if (foundIndex < 0) throw new Error(`Child ${JSON.stringify(treenode)} is not a Child to be removed!`)
    this.data.children.splice(foundIndex, 1)
  }

  updateIndexInParentForChildren(startIndex = 0) {
    const lamda =
      startIndex == 0
        ? (child: TreeNode, idx: number) => {
            ;(child as TreeNode).indexInParent = idx
          }
        : (child: TreeNode, idx: number) => {
            idx > startIndex && ((child as TreeNode).indexInParent = idx)
          }

    this.data.children.forEach(lamda)
  }

  /**
   *
   * @param tree
   * Receives a Tree to be removed from this tree.
   */
  removeTree(tree: TreeNode) {
    // get parent..
    const parent = tree._parentTree
    //remove this tree from the children of the parent...
    parent?.removeNodeFromChildren(tree)
    //sync indices to update after removing a child...
    parent?.updateIndexInParentForChildren(tree._indexInParent)
  }
  ////////////////////////////////////////////////////////////////
  // remove by index method
  removeByIndex(indx: number) {
    this.removeNodeFromChildren(this.data.children[indx])
    this.updateIndexInParentForChildren(this.data.children[indx]._indexInParent)
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
      this.removeTree(foundNode)
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
    this.removeTree(fromNode)

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
  private updateChildDepth(node: TreeNode, parent: TreeNode) {
    updateTreeDepth(node, parent)
  }
  private updateChildParent(node: TreeNode) {
    updateNodesParent(node)
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
  vitestStart(h: number, v: number): number {
    return forVitestUseOnly(h, v)
  }
}

export { TreeNode }
