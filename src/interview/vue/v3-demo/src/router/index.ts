import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import {registerNavigationGuard} from './guard'

const layouts = () => import('@/layouts/index.vue')

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/test1',
        component: () => import('@/views/Test1.vue')
    },
    {
        path: '/',
        component: layouts,
        redirect: '/Index',
        children: [
            {
                path: 'Index',
                component: () => import('@/views/index.vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

registerNavigationGuard(router)
