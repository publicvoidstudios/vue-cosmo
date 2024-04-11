import Main from "@/components/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import Admin from "@/components/pages/Admin.vue";
import Students from "@/components/pages/Students.vue";
import Articles from "@/components/pages/Articles.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import Profile from "@/components/pages/Profile.vue";
import SignUpPage from "@/components/pages/SignUpPage.vue";
import NotFoundPage from "@/components/pages/NotFoundPage.vue";
import ContentPage from "@/components/pages/students/content_pages/ContentPage.vue";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/students',
        component: Students
    },
    {
        path: '/students/content/:id',
        component: ContentPage
    },
    {
        path: '/articles',
        component: Articles
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/signup',
        component: SignUpPage
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFoundPage
    },
    {
        path: '/404',
        component: NotFoundPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // This will scroll to the top of the page when navigating
    // return null; // This will prevent saving the scroll position
}
})

export default router;