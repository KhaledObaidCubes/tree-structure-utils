import type { ITreeNode } from "../interfaces/I-TreeNode"
import type { TNode } from "../interfaces/i-types"
import { addTreeNode, flattTree, getAllChildren } from "../tree-sublementry"

class TreeNode implements ITreeNode{
    data:TNode
    numDescendants:number=0
    totalNodes: number=0
    //instead of initialize data, a default empty object is passed
    constructor(nodeToAdd:TNode={name:'',children:[]}){
        this.data={//I reduce code by assign the name and the children array directly to the nod's data
            name:nodeToAdd.name,
            children:nodeToAdd.children.map((child) => new TreeNode(child.data))//now create instance tree of each nod's and sub node(s)
        }
        
    }
    private _depth:number = 0
    private _indexInParent:number = 0
    private _parentTree:TreeNode|undefined
    
  

    addChild(node: TreeNode) {
        //I handle that case of creating node with empty or undefined node
        if (!node) throw new Error(`CANNOT ADD UNDEFINED OR NULL NODE!`)
        addTreeNode(this, node)
        this.updateDescendants()
    }
    
    totalNodeNumber(): number {
        return getAllChildren(this);
    }

    set depth(value: number) {
        this._depth = value;
    }
    get depth() {
        return this._depth;
    }

    set indexInParent(value: number) {
        this._indexInParent = value;
    }
    get indexInParent() {
        return this._indexInParent;
    }

    set parentTree(value: TreeNode | undefined) {
        if (!value) throw new Error("CANNOT SET PARENT TO UNDEFINED");
        this._parentTree = value;
    }
    get parentTree() {
        return this._parentTree;
    }

    get flattenArray() {
        return flattTree(this);
    }

    private updateDescendants() {
        this.numDescendants = getAllChildren(this) - 1; // except the node am stand on
        this.totalNodes = getAllChildren(this);
    }
}

export { TreeNode };