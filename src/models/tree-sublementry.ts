import { TreeNode } from "./classes/TreeNode";
import type { ITreeNode } from "./interfaces/I-TreeNode";

const addTreeNode = (targetTree: ITreeNode, node: ITreeNode) => {
    
    node.indexInParent = targetTree.data.children.length;//tested
    
    node.parentTree = targetTree as TreeNode;
    node.depth = targetTree.depth + 1;//tested
    
    targetTree.data.children.push(node); // directly add node, no need to re-wrap the wrong code was targetTree.data.children.push(new TreeNode(node))
};

const flattTree = (data: TreeNode) => {
    const result: object[] = [];

    function recurse(node: TreeNode) {
        if (!node) return;

        result.push({ name: node.data.name });
        node.data.children.forEach((child) => recurse(child as TreeNode));
    }

    recurse(data);
    data.totalNodes = result.length;
    return result;
};

const getAllChildren = (data: TreeNode): number => {
    let counter = 0;

    function recurse(node: TreeNode) {
        if (!node) return;
        counter += 1;
        node.data.children.forEach((child) => recurse(child as TreeNode));
    }

    recurse(data);
    return counter;
};

export { addTreeNode, flattTree, getAllChildren };