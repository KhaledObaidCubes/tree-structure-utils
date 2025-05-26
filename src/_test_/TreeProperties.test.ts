// import { describe, it, expect } from 'vitest'
// import { TreeNode } from '../models/classes/TreeNode'
// import { treeAlpha } from '../data/demo-data'

// const createTreeByJSON = () => {
//   const root = new TreeNode(treeAlpha)
//   return root
// }
// const createTreeByAddMethod = () => {
//   const root = new TreeNode({ name: 'root', id: 'root', children: [] })
//   const child1 = new TreeNode({ name: 'child1', id: 'child1', children: [] })
//   const child2 = new TreeNode({ name: 'child2', id: 'child2', children: [] })

//   root.addChild(child1)
//   root.addChild(child2)

//   const child3 = new TreeNode({ name: 'child3', id: 'child3', children: [] })
//   const child4 = new TreeNode({ name: 'child4', id: 'child4', children: [] })
//   const child5 = new TreeNode({ name: 'child5', id: 'child5', children: [] })
//   const child6 = new TreeNode({ name: 'child6', id: 'child6', children: [] })
//   child2.addChild(child3)
//   child2.addChild(child4)
//   child2.addChild(child5)
//   child2.addChild(child6)

//   return root
// }
// ////////////////////// Start //////////////////////////////////////
// // check depth on noded create add and remove
// describe('DEPTH', () => {
//   describe('use tree created by construct new TreeNode class', () => {
//     it('create add remove multi levels', () => {
//       const root = createTreeByAddMethod()
//       expect(root.data.children[1].data.children[0].depth).toBe(2)
//       const childIP = root.data.children[1].data.children[0].data.id
//       root.removeNodeById(childIP)
//       root.data.children[1].addChild(new TreeNode({ name: 'K2', id: '', children: [] }))
//       root.data.children[1].data.children[0].addChild(new TreeNode({ name: 'K222', id: '', children: [] }))
//       expect(root.data.children[1].data.children[0].data.children[0].depth).toBe(3)
//     })
//   })
//   describe('use tree created by passing JSON objects', () => {
//     it('create add remove multi levels', () => {
//       const root = createTreeByJSON()
//       expect(root.data.children[0].data.children[0].depth).toBe(2)
//       const childIP = root.data.children[0].data.children[0].data.id
//       root.removeNodeById(childIP)
//       //the following node is empty
//       expect(root.data.children[1].data.children.length).toBe(0)
//       //will add new node to it
//       root.data.children[1].addChild(new TreeNode({ name: 'K2', id: '', children: [] }))
//       //now there is only one node inside it
//       expect(root.data.children[1].data.children.length).toBe(1)
//       //add one more node
//       root.data.children[1].data.children[0].addChild(new TreeNode({ name: 'K222', id: '', children: [] }))
//       //double check the depth
//       expect(root.data.children[1].data.children[0].data.children[0].depth).toBe(3)
//     })
//   })
//   describe('depth after moving child through NODED tree', () => {
//     it('depth must be update after each move', () => {
//       ////////////////////////////////////////////////////
//       const root = new TreeNode({ name: 'root', id: 'root', children: [] })
//       const child1 = new TreeNode({ name: 'child1', id: 'child1', children: [] })
//       const child2 = new TreeNode({ name: 'child2', id: 'child2', children: [] })

//       root.addChild(child1)
//       root.addChild(child2)

//       const child3 = new TreeNode({ name: 'child3', id: 'child3', children: [] })
//       const child4 = new TreeNode({ name: 'child4', id: 'child4', children: [] })
//       const child5 = new TreeNode({ name: 'child5', id: 'child5', children: [] })
//       const child6 = new TreeNode({ name: 'child6', id: 'child6', children: [] })
//       child2.addChild(child3)
//       child2.addChild(child4)
//       child2.addChild(child5)
//       child2.addChild(child6)

//       /////////////////////////////////////
//       //get ID of child we need to move
//       const childToMove = child4.data.id
//       //register moved child name to constant

//       //grt the id of the root -where we need to move our child to
//       const childToAddIn = root.data.id
//       // childe moved
//       expect(child4.depth).toBe(2)
//       root.moveNode(childToMove, childToAddIn)
//       expect(child4.depth).toBe(1)
//       root.data.children[1].addChild(new TreeNode({ name: 'K2', id: '', children: [] }))
//       root.data.children[1].data.children[0].addChild(new TreeNode({ name: 'K222', id: '', children: [] }))
//       expect(root.data.children[1].data.children[0].data.children[0].depth).toBe(3)
//     })
//   })
//   describe('testing Depth using json tree structure', () => {
//     it('will do the same as above, except that I will use ready JSON tree schema ', () => {
//       const root = createTreeByJSON()

//       root.data.children[0].data.children[0].addChild(new TreeNode({ name: 'KOBJ', id: '', children: [] }))
//       root.data.children[0].data.children[0].data.children[0].addChild(new TreeNode({ name: 'KOBJ', id: '', children: [] }))
//       expect(root.data.children[0].data.children[0].data.children[0].depth).toBe(3)
//     })
//   })
// })

// describe('IDX IN PARENT', () => {
//   describe('create add remove multi levels', () => {
//     it('make sure that nodes index in parent match the its location in parent children array', () => {
//       const root = createTreeByAddMethod()
//       expect(root.data.children[1].data.children[0].indexInParent).toBe(0)
//       const childIP = root.data.children[1].data.children[0].data.id
//       root.removeNodeById(childIP)
//       root.data.children[1].addChild(new TreeNode({ name: 'K2', id: '', children: [] }))
//       root.data.children[1].data.children[0].addChild(new TreeNode({ name: 'K222', id: '', children: [] }))
//       expect(root.data.children[1].data.children[3].indexInParent).toBe(3)

//       expect(root.data.children[1].data.children[0].data.children[0].indexInParent).toBe(0)
//     })
//   })

//   describe('test index whsen moving node', () => {
//     it('make sure that nodes index in parent match the its location in parent children array', () => {
//       const root = new TreeNode({ name: 'root', id: 'root', children: [] })
//       const child1 = new TreeNode({ name: 'child1', id: 'child1', children: [] })
//       const child2 = new TreeNode({ name: 'child2', id: 'child2', children: [] })

//       root.addChild(child1)
//       root.addChild(child2)
//       //node1 children
//       const child3 = new TreeNode({ name: 'child3', id: 'child3', children: [] })
//       const child4 = new TreeNode({ name: 'child4', id: 'child4', children: [] })
//       const child5 = new TreeNode({ name: 'child5', id: 'child5', children: [] })
//       const child6 = new TreeNode({ name: 'child6', id: 'child6', children: [] })
//       //node2 children
//       const child7 = new TreeNode({ name: 'child7', id: 'child7', children: [] })
//       const child8 = new TreeNode({ name: 'child8', id: 'child8', children: [] })
//       const child9 = new TreeNode({ name: 'child9', id: 'child9', children: [] })
//       const child10 = new TreeNode({ name: 'child10', id: 'child10', children: [] })
//       child1.addChild(child3)
//       child1.addChild(child4)
//       child1.addChild(child5)
//       child1.addChild(child6)
//       child2.addChild(child7)
//       child2.addChild(child8)
//       child2.addChild(child9)
//       child2.addChild(child10)

//       /////////////////////////////////////
//       //get ID of child we need to move
//       const childToMove = child5.data.id
//       //register moved child name to constant
//       expect(child5.indexInParent).toBe(2)
//       //grt the id of the root -where we need to move our child to
//       const childToAddIn = child2.data.id
//       // childe moved
//       root.moveNode(childToMove, childToAddIn)
//       expect(child5.indexInParent).toBe(4)
//     })
//   })
// })

// describe('DESCENDENT', () => {
//   describe('check the array of descendants ', () => {
//     it('correct nodes', () => {
//       const root = new TreeNode({ name: 'root', id: 'root', children: [] })
//       const child1 = new TreeNode({ name: 'child1', id: 'child1', children: [] })
//       const child2 = new TreeNode({ name: 'child2', id: 'child2', children: [] })
//       const child3 = new TreeNode({ name: 'child3', id: 'child3', children: [] })
//       const child4 = new TreeNode({ name: 'child4', id: 'child4', children: [] })
//       const child5 = new TreeNode({ name: 'child5', id: 'child5', children: [] })
//       const child6 = new TreeNode({ name: 'child6', id: 'child6', children: [] })
//       const child7 = new TreeNode({ name: 'child7', id: 'child7', children: [] })
//       root.addChild(child1)
//       root.addChild(child2)
//       child1.addChild(child3)
//       child3.addChild(child4)
//       child4.addChild(child5)
//       child4.addChild(child6)
//       child4.addChild(child7)
//       //console.log(child4.numDescendants)
//       //expect(child4.numDescendants).toEqual(['child3', 'child1', 'root'])
//       const toMove = child4.data.id
//       const target = root.data.id
//       //root.moveNode(toMove, target)
//       console.log(root.data.children[0].data.children[0].data.children[0])
//       console.log('before')
//       console.log(root.descendentArray(root.data.children[0].data.children[0].data.children[0]))
//       root.moveNode(toMove, target)
//       console.log('after')
//       console.log(root.descendentArray(root.data.children[2]))
//       console.log(root.data.children[2])

//       //console.log(root.data.children[0].data.children[0].data.children[0].data.children)
//       //expect(root.data.children[0].numDescendants).toStrictEqual(['child3', 'child1', 'root'])
//     })
//   })
// })
