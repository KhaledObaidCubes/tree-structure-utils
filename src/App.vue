<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TreeNode } from './models/classes/TreeNode'

const treeI = reactive(new TreeNode())
treeI.data.name = 'treeI root'
const node1 = new TreeNode({ name: '1', id: '', children: [] })
const node2 = new TreeNode({ name: '2', id: '', children: [] })
const node3 = new TreeNode({ name: '1.1', id: '', children: [] })
const node4 = new TreeNode({
  name: '1.2',
  id: '',
  children: [new TreeNode({ name: '1.2.1', id: '', children: [] }), new TreeNode({ name: '1.2.2', id: '', children: [] }), new TreeNode({ name: '1.2.3', id: '', children: [] })]
})
const node5 = new TreeNode({ name: '1.3', id: '', children: [] })
const node6 = new TreeNode({ name: '3', id: '', children: [] })
const node7 = new TreeNode({ name: '2.1', id: '', children: [] })

treeI.addChild(node1)
treeI.addChild(node2)
treeI.addChild(node6)
node1.addChild(node3)
node1.addChild(node4)
node1.addChild(node5)
node6.addChild(node7)

const infoMode = ref(true)
const showInfoMSG = ref('SHOW INFO')

const showInfo = () => {
  infoMode.value = !infoMode.value
  showInfoMSG.value = !infoMode.value ? 'SHOW INFO' : 'HIDE INFO'
}

const rmv = () => treeI.removeNodeById((document.getElementById('idText') as HTMLInputElement)?.value)

const moveTo = () => treeI.moveNode((document.getElementById('fromText') as HTMLInputElement)?.value, (document.getElementById('toText') as HTMLInputElement)?.value)
</script>

<template>
  <div>
    TreeI Description<br />
    <pre>{{ treeI.getTreeShape(!infoMode) }}</pre>
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
    <div>MOVE NODE:</div>
    <input type="text" id="fromText" name="fText" placeholder="insert id" style="width: 300px" />
    <button @click="moveTo" style="margin-left: 20px">change location</button>
    <input type="text" id="toText" name="tText" placeholder="insert id" style="margin-left: 20px; width: 300px" />
  </div>
  <!-- <div>
    <pre>{{ treeI.getTreeShape(!infoMode) }}</pre>
  </div> -->
</template>

<style scoped></style>
