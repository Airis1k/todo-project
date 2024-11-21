import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import PageNotFoundView from "@/views/PageNotFoundView.vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "Main",
         component: MainView,
      },
      {
         path: "/:catchAll(.*)",
         name: "PageNotFound",
         component: PageNotFoundView,
      },
   ],
});

export default router;
