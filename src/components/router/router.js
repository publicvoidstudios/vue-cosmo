import Main from "@/components/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import Admin from "@/components/pages/Admin.vue";
import Students from "@/components/pages/Students.vue";
import Articles from "@/components/pages/Articles.vue";
import LoginPage from "@/components/pages/LoginPage.vue";
import Profile from "@/components/pages/Profile.vue";
import SignUpPage from "@/components/pages/SignUpPage.vue";


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
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;