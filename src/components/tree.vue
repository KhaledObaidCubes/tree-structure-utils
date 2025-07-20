<template>
  <component :is="tag" v-bind="resolveNodeAttrs(treeManager)"
    ><span>
      {{ treeManager.state.value.title }}
    </span>
    <slot :node="treeManager"></slot>
    <Tree v-for="(child, index) in treeManager.children as TreeManagerWithCheckBox<T>[]" :treeManager="child" :nodeAttrs="nodeAttrs" :tag="tag" v-bind="attrs" :key="index">
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </Tree>
  </component>
</template>

<script setup lang="ts" generic="T extends TCheckedTree">
import { TCheckedTree } from '@/domain/meta/i-tree'
import { TreeManagerWithCheckBox } from '@/domain/TreeManagerWithCheckBox'
import { useAttrs } from 'vue'

const props = withDefaults(
  defineProps<{
    childrenWrapperTag?: string
    subtreeAttrs?: Record<string, any>
    tag?: string
    treeManager: TreeManagerWithCheckBox<T>
    nodeAttrs?: (manager: TreeManagerWithCheckBox<T>, attrs: any, props: any) => Record<string, any>
  }>(),
  { tag: 'div', childrenWrapperTag: 'div', subtreeAttrs: () => ({ id: 'children' }), nodeAttrs: () => ({}) }
)

// Infer the actual data type fromTreeManager
type TreeDataType = typeof props.treeManager extends TreeManagerWithCheckBox<infer T> ? T : never

defineSlots<{
  default(props: { node: TreeManagerWithCheckBox<TreeDataType> }): any
}>()
const attrs = useAttrs()

const resolveNodeAttrs = (manager: TreeManagerWithCheckBox<T>) => {
  return { ...attrs, ...(props.subtreeAttrs || {}), ...(props.nodeAttrs?.(manager, attrs, props) || {}) }
}
</script>
