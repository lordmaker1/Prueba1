import { createRouter, createWebHistory } from "vue-router";
import Visualizer from "../views/visualizer.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: "/",
        name: 'Visualizer',
        component: Visualizer,
    },
        
    ],
});

export default router;
