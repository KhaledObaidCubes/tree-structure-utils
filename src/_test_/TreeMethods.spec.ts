// import { describe, it, expect, beforeEach } from 'vitest'
// import { TreeNode } from '../models/classes/TreeNode'

// describe('TreeNode', () => {
//   let root: TreeNode

//   beforeEach(() => {
//     root = new TreeNode({ name: 'Root', id: 'root-id', children: [] })
//   })

//   it('should initialize with given name', () => {
//     expect(root.data.name).toBe('Root')
//   })
//   //-------------- test addChild method -----------------
//   it('should add child nodes', () => {
//     root.addChild({ name: 'Child1', id: '1', children: [] })
//     expect(root.data.children.length).toBe(1)
//     expect(root.data.children[0].data.name).toBe('Child1')
//   })

//   it('should remove child nodes', () => {
//     const child = new TreeNode({ name: 'ChildToRemove', id: '2', children: [] })
//     root.addChild(child)
//     expect(root.data.children.length).toBe(1)
//     root.removeNodeFromChildren(child)
//     expect(root.data.children.length).toBe(0)
//   })
//   //---------------- double check indexInParent when adding new child to existing children -------------
//   it('should update index in parent for children', () => {
//     root.addChild({ name: 'A', id: 'a', children: [] })
//     root.addChild({ name: 'B', id: 'b', children: [] })
//     root.updateIndexInParentForChildren()
//     expect(root.data.children[1].indexInParent).toBe(1)
//   })
//   //----------------- double check node removing method ----------------
//   it('check if removing completely & correctly', () => {
//     const child = new TreeNode({ name: 'Child', id: 'child-id', children: [] })
//     root.addChild(child)
//     root.removeTree(child)
//     expect(root.data.children.length).toBe(0)
//   })
//   //---------------------- double check the child name update -----------
//   it('when we need to edit child (TreeNode) name property', () => {
//     const child = new TreeNode({ name: 'OldName', id: 'child-id', children: [] })
//     root.addChild(child)
//     root.updateNodeNameById(child.data.id, 'NewName')
//     expect(child.data.name).toBe('NewName')
//   })
//   //--------------------- check remove node by its ID -------------------
//   it('should remove node by ID', () => {
//     const child = new TreeNode({ name: 'ToRemove', id: 'child-id', children: [] })
//     root.addChild(child)
//     const result = root.removeNodeById(child.data.id)
//     expect(result).toBe(true)
//     expect(root.data.children.length).toBe(0)
//   })

//   it('should not remove node invalid ID', () => {
//     const result = root.removeNodeById('invalid-id')
//     expect(result).toBe(false)
//   })
//   //--------------------- Move node to another --------------------
//   it('should move a node to another node', () => {
//     const from = new TreeNode({ name: 'From', id: 'from-id', children: [] })
//     const to = new TreeNode({ name: 'To', id: 'to-id', children: [] })
//     root.addChild(from)
//     root.addChild(to)
//     const result = root.moveNode(from.data.id, to.data.id)
//     expect(result).toBe(true)
//     expect(to.data.children[0].data.name).toBe('From')
//   })

//   it('should not move node to its own descendant', () => {
//     const parent = new TreeNode({ name: 'Parent', id: 'parent-id', children: [] })
//     const child = new TreeNode({ name: 'Child', id: 'child-id', children: [] })
//     root.addChild(parent)
//     parent.addChild(child)
//     const result = root.moveNode(parent.data.id, child.data.id)
//     expect(result).toBe(false)
//   })
//   //-------------------- this method used to directly add node to parent by the parent's ID ---------
//   it('should add node by ID', () => {
//     const newNode = new TreeNode({ name: 'Leaf', id: 'leaf-id', children: [] })
//     const parent = new TreeNode({ name: 'Parent', id: 'parent-id', children: [] })
//     root.addChild(parent)
//     const result = root.addNodeByID(parent.data.id, newNode)
//     expect(result).toBe(true)
//     expect(parent.data.children[0].data.name).toBe('Leaf')
//   })
//   //----------------------------- check the JSON tree schema creator ----------------------
//   it('should return correct JSON format', () => {
//     const json = root.toJSONFormat()
//     expect(json.name).toBe('Root')
//     expect(json.children.length).toBe(0)
//   })
//   //-------------- get all tree's nodes number -----------
//   it('should calculate total node number', () => {
//     root.addChild({ name: 'Child', id: 'child', children: [] })
//     expect(root.totalNodeNumber()).toBeGreaterThanOrEqual(2)
//   })
//   //-------------------- these functions are created to console-log the shape of the tree we had created ------------------
//   it('should get tree shape', () => {
//     const shape = root.getTreeShape(false)
//     expect(typeof shape).toBe('string')
//   })
//   //------------------- for noe the descendent num function is a function that return an array
//   //------------------- not only for return the number of the descendent but also to return there names ----------------
//   it('should compute descendant array correctly', () => {
//     const child = new TreeNode({ name: 'C1', id: 'c1', children: [] })
//     root.addChild(child)
//     const arr = root.descendentArray(child)
//     expect(arr.includes('Root')).toBe(true)
//     expect(arr.includes('C1')).toBe(true)
//   })
// })
