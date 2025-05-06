<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TreeNode } from './models/classes/TreeNode'
import { ALeveled } from './data/demo-data'

//----------------- create tree from json directly from data stored in demo-data.ts ---------------------
const treeII = reactive(new TreeNode(ALeveled))
treeII.data.name = 'treeII root'

const infoMode = ref(true)
const showInfoMSG = ref('SHOW INFO')

const showInfo = () => {
  infoMode.value = !infoMode.value
  showInfoMSG.value = !infoMode.value ? 'SHOW INFO' : 'HIDE INFO'
}

const rmv = () => treeII.removeNodeById((document.getElementById('idText') as HTMLInputElement)?.value)
const addTo = () => treeII.addNodeByID((document.getElementById('addText') as HTMLInputElement)?.value, new TreeNode({ name: 'KhaledOBJ', id: '0', children: [] }))

const moveTo = () => treeII.moveNode((document.getElementById('fromText') as HTMLInputElement)?.value, (document.getElementById('toText') as HTMLInputElement)?.value)
</script>

<template>
  <h3>JSON Tree</h3>
  <div>
    TREEII created by adding new instances for each node<br />
    <pre>{{ treeII.getTreeShape(!infoMode) }}</pre>
    <button @click="showInfo">{{ showInfoMSG }}</button>
  </div>
  <hr />
  <div style="margin-top: 30px; margin-bottom: 30px">
    <div>REMOVE BY ID:</div>
    <input type="text" id="idText" name="rText" placeholder="insert id" style="width: 300px" />
    <button @click="rmv" style="margin-left: 20px">remove ........</button>
  </div>
  <hr />
  <div style="margin-top: 30px; margin-bottom: 30px">
    <div>ADD BY ID:</div>
    <input type="text" id="addText" name="rText" placeholder="insert id" style="width: 300px" />
    <button @click="addTo" style="margin-left: 20px">ADD ........</button>
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

<style scoped></style>
