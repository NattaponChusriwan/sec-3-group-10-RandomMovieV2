import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/AboutUs.vue'
import AddMovie from '../views/AddMovie.vue'
import NotFound from '../views/NotFound.vue'
const history = createWebHistory()
const routes = [
    {path:'/' , name:'Home' , component:Home},
    {path:'/AboutUs' , name:'AboutUs' , component:AboutUs},
    {path:'/AddMovie' , name:'AddMovie' , component:AddMovie},

    {path: '/:catchNotMatchPath(.*)' , name: 'NotFound' , component: NotFound}
]

const router = createRouter({ history, routes })
export default router