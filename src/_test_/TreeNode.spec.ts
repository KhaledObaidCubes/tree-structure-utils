import { describe, it, expect } from 'vitest'
import { TreeNode } from '../models/classes/TreeNode'

const createSampleTree = () => {
  const root = new TreeNode({ name: 'root', id: 'root', children: [] })
  const child1 = { name: 'child1', id: 'child1', children: [] }
  const child2 = { name: 'child2', id: 'child2', children: [] }
  root.addChild(child1)
  root.addChild(child2)
  return { root }
}

describe('TreeNode', () => {
  describe('constructor', () => {
    it('should create a root node with default values', () => {
      const node = new TreeNode()
      expect(node.data.name).toBe('')
      expect(node.data.children.length).toBe(0)
    })
  })

  describe('addChild', () => {
    it('should add a child node', () => {
      const parent = new TreeNode({ name: 'parent', id: 'p', children: [] })
      const child = new TreeNode({ name: 'child', id: 'c', children: [] })
      parent.addChild(child)
      expect(parent.data.children).toContain(child)
    })
  })

  describe('removeNodeFromChildren', () => {
    it('should remove the correct child node', () => {
      const { root } = createSampleTree()
      const child = root.data.children[0]
      root.removeNodeFromChildren(child as TreeNode)
      expect(root.data.children).not.toContain(child)
    })
  })

  describe('removeTree', () => {
    it('should detach a subtree', () => {
      const { root } = createSampleTree()
      const child = root.data.children[0] as TreeNode
      root.removeTree(child)
      expect(root.data.children).not.toContain(child)
    })
  })

  describe('removeNodeById', () => {
    it('should remove node by id', () => {
      const { root } = createSampleTree()
      const target = root.data.children[1] as TreeNode
      const result = root.removeNodeById(target.data.id)
      expect(result).toBe(true)
      expect(root.data.children.length).toBe(1)
    })
  })

  describe('moveNode', () => {
    it('should move a child to a new parent', () => {
      const root = new TreeNode({ name: 'root', id: 'root', children: [] })
      const a = { name: 'A', id: 'a', children: [] }
      const b = { name: 'B', id: 'b', children: [] }
      root.addChild(a)
      root.addChild(b)

      const aNode = root.data.children[0] as TreeNode
      const bNode = root.data.children[1] as TreeNode
      const moved = root.moveNode(aNode.data.id, bNode.data.id)
      expect(moved).toBe(true)
      expect(bNode.data.children[0]).toBe(aNode)
    })
  })

  describe('toJSONFormat', () => {
    it('should return a JSON format of the tree', () => {
      const { root } = createSampleTree()
      const json = root.toJSONFormat()
      expect(json.name).toBe('root')
      expect(json.children.length).toBe(2)
    })
  })

  describe('totalNodeNumber', () => {
    it('should count all nodes in the tree', () => {
      const { root } = createSampleTree()
      const total = root.totalNodeNumber()
      expect(total).toBe(3) // root + 2 children
    })
  })

  describe('getTreeShape', () => {
    it('should return a string representation of the tree', () => {
      const { root } = createSampleTree()
      const shape = root.getTreeShape(false)
      expect(typeof shape).toBe('string')
    })
  })

  describe('depth/indexInParent/parentTree', () => {
    it('should set and get depth/index/parent correctly', () => {
      const node = new TreeNode({ name: 'test', id: 'id', children: [] })
      node.depth = 2
      node.indexInParent = 1
      node.parentTree = new TreeNode()
      expect(node.depth).toBe(2)
      expect(node.indexInParent).toBe(1)
      expect(node.parentTree).toBeInstanceOf(TreeNode)
    })
  })

  describe('flattenArray', () => {
    it('should return flattened tree', () => {
      const { root } = createSampleTree()
      const flat = root.flattenArray
      expect(flat.length).toBeGreaterThan(0)
    })
  })
})
