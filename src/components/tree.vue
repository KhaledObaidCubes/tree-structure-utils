<template>
  <Component :is="tag" class="tree-node">
    <slot :node="treeManager"></slot>
    <Tree v-for="(child, index) in treeManager.children" :treeManager="child" :tag :key="index">
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </Tree>
  </Component>
</template>

<script setup lang="ts" generic="T">
import { TreeManager } from '@/shared'

const props = withDefaults(
  defineProps<{
    tag?: string
    treeManager: TreeManager<T>
  }>(),
  { tag: 'div' }
)

// Infer the actual data type from TreeManager
type TreeDataType = typeof props.treeManager extends TreeManager<infer T> ? T : never

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
