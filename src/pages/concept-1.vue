<script setup lang="ts">
import { defineAsyncComponent, provide, reactive, watch } from 'vue'
import { TreeNode } from '../models/classes/TreeNode'
import { treeGamma } from '../data/demo-data'

const treeI = reactive(new TreeNode(treeGamma))

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

const TreeComp = defineAsyncComponent(() => import('../components/tree.vue'))
</script>

<template>
  <h3>AS JSON</h3>
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
