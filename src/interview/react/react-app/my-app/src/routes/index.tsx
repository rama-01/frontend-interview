const routes = [
    {
        path: '/test',
        element: () => import('../pages/test/index.tsx'),
    },
    {
        path: '/test2',
        element: () => import('../pages/test2/index.tsx'),
    },
]

export default routes
