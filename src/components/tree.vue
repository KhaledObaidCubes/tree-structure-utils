<template>
  <div class="container">
    <h3 class="cation">
      <span @click="">{{ nodes?.name + ' ' + nodes?.depth + ' ' }}</span>
      <input v-if="nodes?.children.length" type="button" :value="expand ? '-' : '+'" @click="toggle" />
      <button @click="player!.addNodeByID(nodes?.id, new TreeNode({ name: 'KhaledOBJ', id: '0', children: [] }))">ADD</button>
      <button v-if="!!nodes?.depth || !!nodes?.indexInParent" @click="player!.removeNodeById(nodes?.id)">DELETE</button>
    </h3>
    <child v-if="expand" v-for="(child, _index) in nodes?.children" :key="_index" :nodes="child" :index="+_index" />
  </div>
</template>

<script setup lang="ts">
import { TreeNode } from '../models/classes/TreeNode'
import { defineAsyncComponent, inject, ref, toRef } from 'vue'
import { props as treeContent } from '../components/tree'

const props = defineProps(treeContent)
const nodes = toRef(props, 'nodes')
const expand = ref(true)
const toggle = () => (expand.value = !expand.value)
const child = defineAsyncComponent(() => import('../components/tree.vue'))

const player = inject<TreeNode>('controller')
</script>
<style scoped>
.container {
  margin: 10px 0 0 40px;
  text-align: justify;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
h3,
h4 {
  margin: 0px;
}
</style>
