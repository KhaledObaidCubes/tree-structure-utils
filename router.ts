import { createRouter, createWebHashHistory } from 'vue-router'

import GenericConcept from './src/pages/TreeManager.vue'
import Concept1 from './src/pages/concept-1.vue'
import Concept2 from './src/pages/concept-2.vue'
import Concept3 from './src/pages/concept-3.vue'
import Concept4 from './src/pages/concept-4.vue'
import Concept5 from './src/pages/concept-5.vue'

const routes = [
  { path: '/', name: 'Generic Tree', component: GenericConcept },
  { path: '/Concept-I', name: 'Concept 1', component: Concept1 },
  { path: '/Concept-II', name: 'Concept2', component: Concept2 },
  { path: '/Concept-III', name: 'Concept3', component: Concept3 },
  { path: '/Concept-IV', name: 'Concept4', component: Concept4 },
  { path: '/Concept-V', name: 'Concept5', component: Concept5 }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
