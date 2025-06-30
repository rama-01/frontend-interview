import type {Router} from 'vue-router'
import {getToken} from '@/utils/cookies'

const whiteList = ['/login']
export function registerNavigationGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        if (!getToken()) {
            if (whiteList.includes(to.path)) {
                next()
            } else {
                next('/login')
            }
        } else {
            if (to.path === '/login') {
                next('/')
            } else {
                next()
            }
        }
    })
}
