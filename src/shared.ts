export type { ITreeManager } from './domain/meta/i-tree-manager'

import { App, defineAsyncComponent } from 'vue'

import { TreeManager } from './domain/TreeManager'

const install = (app:App<Element>)=>{
    app.component('VTree',defineAsyncComponent(()=>import('./components/Tree.vue')))
}
    
export { TreeManager , install}
