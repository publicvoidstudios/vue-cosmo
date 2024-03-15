import Main from "@/components/pages/Main.vue";
import {createRouter, createWebHistory} from "vue-router";
import Admin from "@/components/pages/Admin.vue";
import Students from "@/components/pages/Students.vue";


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
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;