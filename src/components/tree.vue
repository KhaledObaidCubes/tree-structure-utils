<template>
  <div class="tree-node">
    <slot :node="manager"></slot>
    <Tree v-for="(child, index) in manager.children" :manager="child" :key="index">
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </Tree>
  </div>
</template>

<script setup lang="ts" generic="T">
import { TreeManager } from '@/shared'

const props = defineProps<{
  manager: TreeManager<T>
}>()

// Infer the actual data type from TreeManager
type TreeDataType = typeof props.manager extends TreeManager<infer T> ? T : never

defineSlots<{
  default(props: { node: TreeManager<TreeDataType> }): any
}>()

// const Node = defineAsyncComponent(() => import('../components/Tree.vue'))
</script>
<style scoped>
.tree-node {
  padding-left: 10px;
}
</style>
