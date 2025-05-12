import type { ITreeManager } from '../interfaces/I-TreeManager'
import type { TTreeJson } from '../interfaces/i-types'

export class TreeManager<T extends ITreeManager<T>> {
  data: T
  parent?: TreeManager<T>
  children: TreeManager<T>[] = []
  constructor(data: T) {
    this.data = data
    this.buildTree(data)
  }

  private buildTree(data: T) {
    for (const childData of data.children) {
      const childNode = new TreeManager<T>(childData)
      childNode.parent = this
      this.children.push(childNode)
    }
  }
  //------------ add Node main method -------------
  addNode(data: T): TreeManager<T> {
    const newNode = new TreeManager<T>(data)
    newNode.parent = this
    this.children.push(newNode)
    return newNode
  }
  //--------------- add instance oject to the tree --------
  addNodeInstance(node: TreeManager<T>): TreeManager<T> {
    node.parent = this
    this.children.push(node)
    return node
  }
  //----------------------- add node that doesn't depend on node id ------------------
  addNodeToTarget(targetNode: TreeManager<T>, nodeToAdd: TreeManager<T>): boolean {
    if (!targetNode || !nodeToAdd) {
      console.warn('Invalid input: targetNode and nodeToAdd must be valid TreeManager instances.')
      return false
    }

    // Set parent of the new node
    nodeToAdd.parent = targetNode

    // Add to targetNode's children
    targetNode.children.push(nodeToAdd)

    return true
  }
  //------------------- remove node ----------------------
  removeTree(node: TreeManager<T>): void {
    const index = this.children.indexOf(node)
    if (index === -1) {
      throw new Error('Node is not a child of this tree')
    }

    // Remove node from children
    this.children.splice(index, 1)

    // Detach the removed node
    node.parent = undefined
  }
  //-------------------return tree as JSON -----------------
  toJSONFormat(): TTreeJson {
    return {
      ...this.data,
      children: this.children.map(child => child.toJSONFormat())
    }
  }
}
