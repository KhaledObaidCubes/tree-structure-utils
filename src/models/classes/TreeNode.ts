import type { ITreeNode } from "../interfaces/I-TreeNode"
import type { TNode } from "../interfaces/i-types"
import { addTreeNode, flattTree, getAllChildren } from "../tree-sublementry"

class TreeNode implements ITreeNode{
    data:TNode
    numDescendants:number=0
    totalNodes: number=0
    //instead of initialize data, a default empty object is passed
    constructor(nodeToAdd:TNode={name:'',children:[]}){
        this.data=nodeToAdd
        this.data.name = nodeToAdd.name
        //the following line is to spread given children array in the place where it was added -this-
       // this.data.children=[...nodeToAdd.children]
        this.data.children=nodeToAdd.children.map((child) => new TreeNode(child.data));
    }
    private _depth:number = 0
    private _indexInParent:number = 0
    private _parentTree:TreeNode|undefined
    
  

    addChild(node:TreeNode){
        addTreeNode(this,node.data)
        node.numDescendants=getAllChildren(node)+1
    }
    
    totalNodeNumber(){
        return getAllChildren(this)
    }


    set depth(_:number){
        this._depth = _
    }
    get depth(){ 
    return this._depth
    }
    set indexInParent(_:number){this._indexInParent = _}
    get indexInParent(){
    return this._indexInParent
    }
    set parentTree(_:TreeNode|undefined){
    if(!_) throw new Error("CANNOT SET PARENT TO UNDEFINED")
    this._parentTree = _
    }
    get parentTree(){
    return this._parentTree
    }
   
    get flattenArray(){
        return flattTree(this)
    }

  

}

export {TreeNode}