import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutUs from '../views/AboutUs.vue'
import NotFound from '../views/NotFound.vue'
import MovieTrivia from '../views/MovieTrivia.vue'

const history = createWebHistory()
const routes = [
    {path:'/' , name:'Home' , component:Home},
    {path:'/AboutUs' , name:'AboutUs' , component:AboutUs},
    {path: '/MovieTrivia', name:'MovieTrivia', component:MovieTrivia},

    {path: '/:catchNotMatchPath(.*)' , name: 'NotFound' , component: NotFound},
]

const router = createRouter({ history, routes })
export default router