<template>
  <Tree :manager="manager" v-slot="{ node }">
    {{ node.data.title }}
  </Tree>
</template>

<script setup lang="ts">
import Tree from './components/Tree.vue'
import { TreeManager } from './shared'
const manager = new TreeManager({
  title: 'ROOT',
  children: [{ title: 'CHILD ONE' }, { title: 'CHILD TWO' }]
})
</script>
