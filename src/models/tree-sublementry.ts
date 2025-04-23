import { TreeNode } from "./classes/TreeNode"
import type { ITreeNode } from "./interfaces/I-TreeNode"

const addTreeNode = (targetTree:ITreeNode, node:ITreeNode)=>{
    // update the index of this child
      node.indexInParent = targetTree.data.children.length
    //update child's depth based on its parent depth
      node.depth = targetTree.depth +1 
      //push new node as child to targetTree
      targetTree.data.children.push(new TreeNode(node))
      //assign parent to each node -will used later on to change node's parent-
      node.parentTree = targetTree
  }

const flattTree=(data:TreeNode)=>{
    const result:object[] = [];
    function recurse(node:TreeNode) {
      if (Array.isArray(node)) {
        node.forEach(recurse);
      } else if (node && typeof node === 'object') {
        if ('name' in node.data) result.push({name:node.data.name});
        if ('children' in node.data) recurse(node.data.children);
      }
    }
  
    recurse(data);
    data.totalNodes= result.length
    return result;
  }
//------------------this function used to get number of nodes descendants also its used to return number of all nodes in any passed object-----------
  const getAllChildren=(data:TreeNode):number=>{
    let counter:number=0
    function recurse(node:TreeNode) {
      if (Array.isArray(node)) {
        node.forEach(recurse);
      } else if (node && typeof node === 'object') {
        if ('name' in node.data) counter+=1
        if ('children' in node.data) recurse(node.data.children);
      }
    }
  
    recurse(data);
    return counter;
  }

  //-----------------------this function is similar to the previous function and it will return the number of all tree nodes 
  //-----------------------I create it as duplicate of the descendant just in case we need to modify it without interfering with the descendant function

  
export{addTreeNode,flattTree,getAllChildren}