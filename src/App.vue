<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { TreeNode } from "./models/classes/TreeNode";
import type{ TNode } from "./models/interfaces/i-types";


const treeI = reactive(new TreeNode());
treeI.data.name = "treeI root";
////////////////////////// CREATE NODE INDIVIDUALLY ///////////////////////////////////
 const node1=new TreeNode({name:'khaled',children:[]})
const node2= new TreeNode({name:'walied',children:[]})
const node3= new TreeNode({name:'Shaikh',children:[]})
const node4= new TreeNode({name:'saleh',children:[]})

treeI.addChild(node1)
 treeI.addChild(node2)
node1.addChild(node3)
node1.addChild(node4)
////////////////////////////JSON DATA////////////////////////////////

const treeII = reactive(new TreeNode());
// treeII.data.name = "treeII root";
// treeII.addChild(
//   {
//     "name": "khaled",
//     "children": [
//       {
//         "name": "Shaikh",
//         "children": [],
//       },
//       {
//         "name": "saleh",
//         "children": [],
//       },
      
//     ],
//   }
// );
// treeII.addChild({ "name": "walied", "children": [] });


treeII.addChild(
  {
    "name": "khaled",
    "children": [
      {
        "name": "Shaikh0",
        "children": [],
      },
      {
        "name": "Shaikh2",
        "children": [],
      },
      {
        "name": "Shaikh3",
        "children": [{"name": "level3", "children": []}],
      }
    ],
  }
);
treeII.addChild({ "name": "walied", "children": [] });


function buildFancyTree(
  node: TreeNode,
  prefix: string = '',
  isLast: boolean = true
): string {
  console.log(
    prefix + (isLast ? '└── ' : '├── ') + `${node.data.name || 'Unnamed'} (depth=${node.depth})`
  );
  let result = prefix + (isLast ? '└── ' : '├── ') + `${node.data.name || 'Unnamed'} (depth=${node.depth}) (IIP=${node.indexInParent}) (DSNT=${node.numDescendants})\n`;

  const children = node.data.children;
  const childCount = children.length;

  children.forEach((child, index) => {
    const isLastChild = index === childCount - 1;
    result += buildFancyTree(
      child as TreeNode,
      prefix + (isLast ? '    ' : '│   '),
      isLastChild
    );
  });

  return result;
}
const treeIString = ref(''); // create a reactive string to print treeI structure
const treeIIString = ref(''); // create a reactive string print treeII structure
const treeIIJson = ref<TNode>() // to store updated JSON

onMounted(() => {
  treeIString.value = buildFancyTree(treeI);
  treeIIString.value = buildFancyTree(treeII);
  treeIIJson.value = treeII.toPureJSON();
});
// console.log(buildFancyTree(tree));
</script>

<template>
  <div>
  TreeI Description<br>
    <pre>{{ treeIString }}</pre>
  </div>
  <hr>
  <div>
  TreeII Description<br>
    <pre>{{ treeIIString }}</pre>
  </div>
  <div>
    <pre>{{ JSON.stringify(treeIIJson, null, 2) }}</pre>
  </div>
</template>

<style scoped>

</style>
