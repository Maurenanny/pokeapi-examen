import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import ListPokemons from '../../modules/pokemons/adapters/views/ListPokemons.vue'
import App from '../../App.vue'

//Configurar Rutas Navegación
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'pokemon'
  },
  {
    path: '/home',
    name: 'home',
    component:HomeView,
    children: [
      {
        path: '/pokemondb',
        name: 'pokemondb',
        component: () => import(/* webpackChunkName: "about" */ '../../modules/pokemons/adapters/views/GetAllPokemons.vue')
    
      },
     
      {
        path: '/pokemon',
        name: 'pokemon',
        component: ListPokemons
      },
    ] 
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
