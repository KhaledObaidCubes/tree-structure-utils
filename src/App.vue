<template>
  <Tree :treeManager v-slot="{ node }" tag="ul">
    <span @click="clicked(node)">
      {{ node.data.title }}
    </span>
  </Tree>
</template>

<script setup lang="ts">
import Tree from './components/tree.vue'
import { TreeManager } from './shared'
const treeManager = new TreeManager({
  title: 'ROOT',
  children: [
    { title: 'CHILD 0', children: [{ title: 'CHILD 0 0' }, { title: 'CHILD 0 1' }] },
    { title: 'CHILD 1', children: [{ title: 'CHILD 1 0' }, { title: 'CHILD 1 1' }] }
  ]
})
const clicked = (node: TreeManager<any>) => console.log(node.getParentChain().map(x => x.data.title))
</script>
