<template>
  <div class="container">
    <h3 class="caption">
      <span @click="thereIsNodeUP(nodes?.id)">{{ nodes?.name }}</span>
      <input v-if="nodes?.children.length" type="button" :value="expand ? '-' : '+'" @click="toggle" />
      <button @click="player!.addNodeByID(nodes?.id, new TreeNode({ name: 'gggg', id: '0', children: [] }))">ADD</button>
      <button v-if="!!nodes?.depth || !!nodes?.indexInParent" @click="player!.removeNodeById(nodes?.id)">DELETE</button>
      <button v-if="!!nodes?.depth || !!nodes?.indexInParent" @click="setEditName">
        <img src="../assets/icons/edit.png" alt="" width="10px" />
      </button>
    </h3>

    <child v-if="expand" v-for="(child, _index) in nodes?.children" :nodes="child" :key="_index" :index="+_index" />
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
const player = inject<TreeNode>('controller')
const childName = ref('')

const thereIsNodeUP = (id: string) => {
  player!.toMoveID = id
}

let idToChange: string = ''
const setEditName = () => {
  if (nodes.value) {
    // document.getElementById('').va
    childName.value = nodes.value.name
    idToChange = nodes.value.id

    let person = prompt('New Node name:', nodes.value.name)
    person == null || person == '' ? player?.updateNodeNameById(nodes.value.id, nodes.value.name) : player?.updateNodeNameById(nodes.value.id, person as string)
  }
}
const child = defineAsyncComponent(() => import('../components/tree.vue'))
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
.caption {
  border: 1px solid transparent;
}

.caption:hover {
  background: #272626;
  /* border: 1px solid #d0d0d0; */
}
</style>
