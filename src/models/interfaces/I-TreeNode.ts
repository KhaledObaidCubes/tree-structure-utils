import type { TNode } from "./i-types";

interface ITreeNode{
    data:TNode
    numDescendants:number
    depth:number
    indexInParent:number
    parentTree:ITreeNode|undefined
    totalNodes:number
}

export type{ITreeNode}