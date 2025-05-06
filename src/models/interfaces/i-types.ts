import type { TreeNode } from '../classes/TreeNode'

type TNode = {
  id: string
  name: string
  children: TreeNode[]
}

type TJson = {
  name: string
  id: string
  depth: number | undefined
  indexInParent: number
  children: any[]
}

export type { TNode, TJson }
