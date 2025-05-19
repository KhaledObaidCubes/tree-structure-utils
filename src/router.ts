import { createRouter, createWebHashHistory } from 'vue-router'

// import GenericConcept from './src/pages/TreeManager.vue'
// import Concept1 from './src/pages/concept-1.vue'
// import Concept2 from './src/pages/concept-2.vue'
// import Concept3 from './src/pages/concept-3.vue'
// import Concept4 from './src/pages/concept-4.vue'
// import Concept5 from './src/pages/concept-5.vue'

const GenericConcept = () => import('./pages/TreeManager.vue')
const Concept1 = () => import('./pages/concept-1.vue')
const Concept2 = () => import('./pages/concept-2.vue')
const Concept3 = () => import('./pages/concept-3.vue')
const Concept4 = () => import('./pages/concept-4.vue')
const Concept5 = () => import('./pages/concept-5.vue')

const routes = [
  { path: '/', name: 'generic-tree', component: GenericConcept },
  { path: '/Concept-I', name: 'Concept-1', component: Concept1 },
  { path: '/Concept-II', name: 'Concept-2', component: Concept2 },
  { path: '/Concept-III', name: 'Concept-3', component: Concept3 },
  { path: '/Concept-IV', name: 'Concept-4', component: Concept4 },
  { path: '/Concept-V', name: 'Concept-5', component: Concept5 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
