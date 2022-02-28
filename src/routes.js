export default [
    {
        name: 'Home',
        path: '/',
        component: () => import('./components/PageHome.vue'),
    },
    {
        name: 'Published',
        path: '/published',
        component: () => import('./components/PageHome.vue'),
    },
    {
        name: 'Drafts',
        path: '/drafts',
        component: () => import('./components/PageDrafts.vue'),
    },
    {
        name: 'Test',
        path: '/test',
        component: () => import('./components/PageTest.vue'),
    },
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        component:  () => import('./components/PageNotFound.vue'),
    },
]