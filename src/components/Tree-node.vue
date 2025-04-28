<script setup lang="ts">
import type { TreeNode } from "../models/classes/TreeNode"; // adjust path if needed
import { defineProps } from 'vue';

const props = defineProps<{
  node: TreeNode;
}>();
</script>

<template>
  <div class="tree-node">
    <div class="node-label">
      {{ node.data.name || 'Unnamed Node' }}
    </div>
    <div class="node-children" v-if="node.data.children.length">
      <TreeNodeView
        v-for="(child, index) in node.data.children"
        :key="index"
        :node="child"
      />
    </div>
  </div>
</template>

<style scoped>
.tree-node {
  margin-left: 20px; /* indent child nodes */
  border-left: 1px dashed #ccc;
  padding-left: 10px;
}

.node-label {
  font-weight: bold;
  margin: 5px 0;
}

.node-children {
  margin-top: 5px;
}
</style>
