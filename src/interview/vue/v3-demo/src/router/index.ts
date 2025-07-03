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
        path: '/',
        component: layouts,
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/views/index.vue')
            },
            {
                path: '/test1',
                name: 'Test1',
                component: () => import('@/views/test1.vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

registerNavigationGuard(router)
