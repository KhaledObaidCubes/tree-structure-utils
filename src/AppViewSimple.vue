<script setup lang="ts">
import { defineAsyncComponent, provide, reactive, ref, watch } from 'vue'
import { TreeNode } from './models/classes/TreeNode'
import { treeGamma } from './data/demo-data'

const treeI = reactive(new TreeNode(treeGamma))

//----------------- create tree from json directly from data stored in demo-data.ts ---------------------
provide('controller', treeI)
const infoMode = ref(true)
const showInfoMSG = ref('SHOW INFO')

const showInfo = () => {
  infoMode.value = !infoMode.value
  showInfoMSG.value = !infoMode.value ? 'SHOW INFO' : 'HIDE INFO'
}
const addND = () => treeI.addNodeByID((document.getElementById('addText') as HTMLInputElement)?.value, new TreeNode({ name: 'Khaled', id: '0', children: [] }))
const rmv = () => treeI.removeNodeById((document.getElementById('idText') as HTMLInputElement)?.value)

const moveTo = () => treeI.moveNode((document.getElementById('fromText') as HTMLInputElement)?.value, (document.getElementById('toText') as HTMLInputElement)?.value)

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
  <div>
    TREEI created by adding new instances for each node<br />
    <pre>{{ treeI.getTreeShape(!infoMode) }}</pre>
    <button @click="showInfo">{{ showInfoMSG }}</button>
  </div>
  <hr />
  <div style="margin-top: 30px; margin-bottom: 30px">
    <div>REMOVE BY ID:</div>
    <input type="text" id="idText" name="rText" placeholder="insert id" style="width: 300px" />
    <button @click="rmv" style="margin-left: 20px">REMOVE ........</button>
  </div>
  <hr />
  <div style="margin-top: 30px; margin-bottom: 30px">
    <div>ADD BY ID:</div>
    <input type="text" id="addText" name="rText" placeholder="insert id" style="width: 300px" />
    <button @click="addND" style="margin-left: 20px">ADD ........</button>
  </div>
  <hr />
  <div style="margin-top: 30px; margin-bottom: 30px">
    <div>MOVE NODE:</div>
    <input type="text" id="fromText" name="fText" placeholder="insert id" style="width: 300px" />
    <button @click="moveTo" style="margin-left: 20px">change location</button>
    <input type="text" id="toText" name="tText" placeholder="insert id" style="margin-left: 20px; width: 300px" />
  </div>

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
