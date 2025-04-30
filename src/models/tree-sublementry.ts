import { TreeNode } from './classes/TreeNode'

const addTreeNode = (targetTree: TreeNode, node: TreeNode) => {
  node.indexInParent = targetTree.data.children.length //tested

  node.parentTree = targetTree as TreeNode
  node.depth = targetTree.depth + 1 //tested

  targetTree.data.children.push(node) // directly add node, no need to re-wrap the wrong code was targetTree.data.children.push(new TreeNode(node))
}

const flattTree = (data: TreeNode) => {
  const result: object[] = []

  function recurse(node: TreeNode) {
    if (!node) return

    result.push({ name: node.data.name })
    node.data.children.forEach(child => recurse(child as TreeNode))
  }

  recurse(data)
  data.totalNodes = result.length
  return result
}

const getAllChildren = (data: TreeNode): number => {
  let counter = 0

  function recurse(node: TreeNode) {
    if (!node) return
    counter += 1
    node.data.children.forEach(child => recurse(child as TreeNode))
  }

  recurse(data)
  return counter
}

const drawTreeWithInfo = (node: TreeNode, prefix: string = '', isLast: boolean = true): string => {
  let result: string =
    node.depth == 0 && node.indexInParent == 0
      ? prefix + (isLast ? '═══ ' : '╠══ ') + `${node.data.name || 'Unnamed'} (depth=${node.depth}) (IIP=${node.indexInParent}) (DSNT=${node.numDescendants}) (totalN=${node.totalNodes})\n`
      : prefix + (isLast ? '╚══ ' : '╠══ ') + `${node.data.name || 'Unnamed'} (depth=${node.depth}) (IIP=${node.indexInParent}) (DSNT=${node.numDescendants})\n`
  const children = node.data.children
  const childCount = children.length

  children.forEach((child, index) => {
    const isLastChild = index === childCount - 1
    result += drawTreeWithInfo(child as TreeNode, prefix + (isLast ? '    ' : '║   '), isLastChild)
  })

  return result
}

const drawTree = (node: TreeNode, prefix: string = '', isLast: boolean = true): string => {
  let result: string =
    node.depth == 0 && node.indexInParent == 0
      ? prefix + (isLast ? '─── ' : '├── ') + `${node.data.name || 'Unnamed'}\n`
      : prefix + (isLast ? '└── ' : '├── ') + `${node.data.name || 'Unnamed'}[${node.data.id}]\n`
  const children = node.data.children
  const childCount = children.length

  children.forEach((child, index) => {
    const isLastChild = index === childCount - 1
    result += drawTree(child as TreeNode, prefix + (isLast ? '    ' : '│   '), isLastChild)
  })

  return result
}

const updateNodeDepthsAndIndex = (node: TreeNode, parent: TreeNode) => {
  node.depth = parent.depth + 1
  node.data.children.forEach((child, index) => {
    const childNode = child as TreeNode
    childNode.parentTree = node
    childNode.indexInParent = index // Set the correct index here (node index in its parent)
    updateNodeDepthsAndIndex(childNode, node)
  })
}

const updateTreeDepth = (node: TreeNode, parent: TreeNode) => {
  node.depth = parent.depth + 1
}
const updateNodesParent = (node: TreeNode) => {
  node.data.children.forEach(child => {
    const childNode = child as TreeNode
    childNode.parentTree = node
    updateNodesParent(childNode)
  })
}

const forVitestUseOnly = (x: number, y: number): number => {
  if (x == y) {
    return x * y
  } else if (x > y) {
    return x - y * 10
  } else if (x < y) {
    return y - x * 100
  } else {
    return 55555
  }
}

export { addTreeNode, flattTree, getAllChildren, drawTreeWithInfo, drawTree, updateTreeDepth, updateNodesParent, forVitestUseOnly } //updateNodeDepthsAndIndex }
