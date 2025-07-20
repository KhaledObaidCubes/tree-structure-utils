<template>
  DIRECT

  <TreeView :treeManager v-slot="{ node }" class="tree" :subtreeAttrs="{ id: 'children' }">
    <div class="tree-content">
      <!-- {{ node.state.value.checked }} -->
      <span> <input v-model="node.state.value.title" type="text" /> [{{ node.children.length }}] </span>

      <div>
        <button @click="node.remove()">X</button>
        <button @click="add(node)">+</button>
        <span style="padding-top: 5px">
          <input
            type="checkbox"
            :checked="node.state.value.checked"
            :indeterminate="node.state.value.indeterminate"
            @change="checkAction(node as TreeManagerWithCheckBox<T>, !node.state.value.checked)"
          />
        </span>
      </div>
    </div>
  </TreeView>
  <pre>{{ treeManager.state.value }}</pre>
  <button @click="logState(JSON.parse(JSON.stringify(data2)))">PRINT</button>
</template>

<script setup lang="ts" generic="T extends TCheckedTree">
import TreeView from './components/tree.vue'
import { TCheckedTree } from './domain/meta/i-tree'
// import { TreeManager } from './domain/TreeManager'
import { TreeManagerWithCheckBox } from './domain/TreeManagerWithCheckBox'
const data2 = {
  title: 'ROOT',
  children: [
    {
      title: 'Palestine',
      checked: false,
      indeterminate: false,
      children: [
        { title: 'Nablus', checked: false, indeterminate: false },
        { title: 'Jeneen', checked: false, indeterminate: false }
      ]
    }
  ]
}
const treeManager = new TreeManagerWithCheckBox({
  title: 'ROOT',
  children: [
    {
      title: 'UAE',
      checked: false,
      indeterminate: false,
      children: [
        { title: 'DUBAI', checked: false, indeterminate: false },
        { title: 'ABU DHABI', checked: false, indeterminate: false }
      ]
    }
  ]
})

const add = async (node: typeof treeManager) => {
  node.addNode(new TreeManagerWithCheckBox({ title: `${node.state.value.title}-${Math.floor(Math.random() * 100)}`, checked: false, indeterminate: false, children: [] }))
}

const logState = (newModel: any) => {
  console.log(data2)

  treeManager.reset(newModel)
}
const checkAction = (treeNode: TreeManagerWithCheckBox<T>, checked: boolean) => {
  treeNode.checkMe(checked)
}
</script>
<style>
.tree {
  padding: 10px;
  margin: 10px;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: 1px 1px 2px #222;
}
.tree-content {
  display: flex;
  justify-content: space-between;
}
input[type='checkbox'] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(1.5); /* IE */
  -moz-transform: scale(1.5); /* FF */
  -webkit-transform: scale(1.5); /* Safari and Chrome */
  -o-transform: scale(1.5); /* Opera */
  transform: scale(1.5);
  padding: 10px;
}

/* Might want to wrap a span around your checkbox text */
.checkboxtext {
  /* Checkbox text */
  font-size: 110%;
  display: inline;
}
</style>
