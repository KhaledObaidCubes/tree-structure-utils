<script setup lang="ts">
import { TreeNode } from "./models/classes/TreeNode";

const tree = new TreeNode({ name: "", children: [] });
tree.data.name = "root";
////////////////////////// TEST 1 ///////////////////////////////////
 const node1=new TreeNode({name:'khaled',children:[]})
// const node2= new TreeNode({name:'walied',children:[]})
// const node3= new TreeNode({name:'Shaikh',children:[]})
// const node4= new TreeNode({name:'saleh',children:[]})

tree.addChild(node1)
// tree.addChild(node2)
// node1.addChild(node3)
// node3.addChild(node4)


// console.log(`number of nodes in the root=${tree.totalNodeNumber()}`);


// console.log(`tree as flatt array = ${JSON.stringify(tree.flattenArray)}`);



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
