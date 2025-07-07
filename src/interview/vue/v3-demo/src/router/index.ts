import type {RouteRecordRaw} from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import {registerNavigationGuard} from './guard'

const layouts = () => import('@/layouts/index.vue')

const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/',
        component: layouts,
        redirect: '/index',
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/views/dashboard/index.vue')
            },
            {
                path: 'record',
                name: 'Record',
                component: () => import('@/views/record/index.vue')
            },
            {
                path: 'upload',
                name: 'FileUpload',
                component: () => import('@/views/upload/index.vue')
            },
            {
                path: 'worker',
                name: 'Worker',
                component: () => import('@/views/worker/index.vue')
            },
            {
                path: 'optimize',
                name: 'Optimize',
                component: () => import('@/views/optimize/index.vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

registerNavigationGuard(router)
