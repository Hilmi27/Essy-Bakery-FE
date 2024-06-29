import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import ProductView from "../views/product/AllProductView.vue";
import NewProductView from "../views/product/NewProductView.vue";
import BestProductView from "../views/product/BestProductView.vue";
import OurStoreView from "../views/ourstore/OurStoreView.vue";
import GuideView from "../views/guide/GuideView.vue";
import Login from "../views/auth/Login.vue";
import Profile from "../views/profile/ProfileView.vue";
import Register from "../views/auth/Register.vue";
import CartView from "../views/cart/CartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/allproducts",
      name: "allproducts",
      component: ProductView,
    },
    {
      path: "/bestproducts",
      name: "bestproducts",
      component: BestProductView,
    },
    {
      path: "/newproducts",
      name: "newproducts",
      component: NewProductView,
    },
    {
      path: "/ourstore",
      name: "ourstore",
      component: OurStoreView,
    },
    {
      path: "/guide",
      name: "guide",
      component: GuideView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
});

const authenticated = localStorage.getItem("authenticated");

if (authenticated === null) {
  localStorage.setItem("authenticated", false);
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
  if (to.path === "/profile" && isAuthenticated === false) next("/login");
  if (to.path === "/cart" && isAuthenticated === false) next("/login");
  if (to.path === "/login" && isAuthenticated === true) next("/");
  if (to.path === "/register" && isAuthenticated === true) next("/");
  else next();
});

export default router;
