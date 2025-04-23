<script setup lang="ts">
import { TreeNode } from "./models/classes/TreeNode";

const tree = new TreeNode({ name: "", children: [] });
tree.data.name = "root";
////////////////////////// TEST 1 ///////////////////////////////////
const node1=new TreeNode({name:'khaled',children:[]})
const node2= new TreeNode({name:'walied',children:[]})
const node3= new TreeNode({name:'Shaikh',children:[]})
const node4= new TreeNode({name:'saleh',children:[]})
tree.addChild(node1)
tree.addChild(node2)
node1.addChild(node3)
node3.addChild(node4)
/////////////////////////// TEST 2 /////////////////////////////////
// tree.addChild(new TreeNode({name:'khaled',children:[new TreeNode({name:'Shaikh',children:[new TreeNode({name:'saleh',children:[]})]})]}))
// tree.addChild(new TreeNode({name:'walied',children:[]}))
///////////////////////////// TEST 3 /////////////////////////////////
// tree.addChild(new TreeNode({ name: "L1N10000", children: [new TreeNode({ name: "L1N1", children: []}),new TreeNode({ name: "L1N2", children: [new TreeNode({ name: "L2N1", children: []}),new TreeNode({ name: "L2N2", children: [new TreeNode({ name: "L3N1", children: []}),new TreeNode({ name: "L3N2", children: []})]})]})]}));
// tree.addChild(new TreeNode({ name: "L1N2", children: [new TreeNode({ name: "L1N2", children: [] })] }));
// tree.addChild(new TreeNode({ name: "L1N3", children: [] }));

// const nodeObject = new TreeNode({ name: "p", children: [] });
// const demoChild = new TreeNode({ name: "ch", children: [] });
// tree.addChild(nodeObject)
// for(let i =0;i<5;i++){
  
//   nodeObject.addChild(demoChild);
// }
console.log(tree)
console.log(`number of nodes in the root=${tree.totalNodeNumber()}`);

// console.log(`number of nodes in the node3=${node3.totalNodeNumber()}`);
// console.log(`number of nodes in the node3=${node3.numDescendants}`);

// console.log(`Depth number in the node4 = ${node4.depth}`);
console.log(`tree as flatt array = ${JSON.stringify(tree.flattenArray)}`);



</script>

<template>
  <div>
    {{ tree.data.name }}<br>
    number of children={{ tree.data.children.length }}<br><br>
    FLAT tree in array={{ tree.flattenArray }}<br>
    <br>
    <div v-for="(node,index) in tree.data.children" :key="index">{{ !node.data.name?'noName':node.data.name }}</div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
