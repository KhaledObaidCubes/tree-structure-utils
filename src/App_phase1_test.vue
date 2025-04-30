<script setup lang="ts">
import { reactive } from 'vue'
import { TreeNode } from './models/classes/TreeNode'
// import { ALeveled, BLeveled } from './data/damo'

// const treeI = reactive(new TreeNode())
// treeI.data.name = 'treeI root'
// ////////////////////////// CREATE NODE INDIVIDUALLY ////////////////////////
// const node1 = new TreeNode({ name: 'khaled', children: [] })
// const node2 = new TreeNode({ name: 'walied', children: [] })
// const node3 = new TreeNode({ name: 'Shaikh', children: [] })
// const node4 = new TreeNode({ name: 'saleh', children: [] })

// treeI.addChild(node1)
// treeI.addChild(node2)
// node1.addChild(node3)
// node1.addChild(node4)
// ////////////////////////////////// JSON DATA ///////////////////////////////

const treeII = reactive(new TreeNode())
treeII.data.name = 'treeII root'
treeII.addChild({
  name: 'khaled',
  children: [
    {
      name: 'Shaikh',
      children: []
    },
    {
      name: 'saleh',
      children: [
        {
          name: 'saleh',
          children: []
        }
      ]
    }
  ]
})
treeII.addChild({ name: 'walied', children: [] })
// treeII.addChild(ALeveled)
// treeII.addChild(BLeveled)
// const infoMode = ref(true)
// const showInfoMSG = ref('HIDE INFO')
// const showInfo = () => {
//   infoMode.value = !infoMode.value
//   showInfoMSG.value = !infoMode.value ? 'SHOW INFO' : 'HIDE INFO'
// }
</script>

<template>
  <!-- <div>
    TreeI Description<br />
    <pre>{{ treeI.getTreeShape(infoMode) }}</pre>
    <button @click="showInfo">{{ showInfoMSG }}</button>
  </div>
  <hr />
  <div>
    TreeII Description<br />
    <pre>{{ treeII.getTreeShape(false) }}</pre>
  </div>
  <div>
    <pre>{{ JSON.stringify(treeII.toJSONFormat(), null, 2) }}</pre>
  </div> -->
</template>

<style scoped></style>
