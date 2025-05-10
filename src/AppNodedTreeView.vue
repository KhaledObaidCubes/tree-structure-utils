<script setup lang="ts">
import { defineAsyncComponent, provide, reactive, ref, watch } from 'vue'
import { TreeNode } from './models/classes/TreeNode'

const treeI = reactive(new TreeNode())
treeI.data.name = 'ROOT'

const child1 = new TreeNode({ name: '1', id: '', children: [] })
const child2 = new TreeNode({ name: '2', id: '', children: [] })
const child3 = new TreeNode({ name: '3', id: '', children: [] })
const child4 = new TreeNode({ name: '4', id: '', children: [] })
const child5 = new TreeNode({ name: '5', id: '', children: [] })
const child6 = new TreeNode({ name: '6', id: '', children: [] })
treeI.addChild(child1)
treeI.addChild(child2)
child1.addChild(child3)
child1.addChild(child4)
child2.addChild(child5)
child2.addChild(child6)
//----------------- create tree from json directly from data stored in demo-data.ts ---------------------
provide('controller', treeI)

watch(
  () => treeI.toMoveID,
  (newVal, oldVal) => {
    if (!!newVal && !!oldVal) {
      treeI.moveNode(oldVal!, newVal!)
      treeI.toMoveID = undefined
    }
  }
)

const TreeComp = defineAsyncComponent(() => import('./components/tree.vue'))
</script>

<template>
  <h3>\\{{ treeI.toMoveID }}</h3>
  <tree-comp :nodes="treeI.toJSONFormat()" />

  <!-- <div>
    <pre>{{ treeI.toJSONFormat() }}</pre>
  </div> -->
</template>

<style scoped>
h3 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
}
</style>
