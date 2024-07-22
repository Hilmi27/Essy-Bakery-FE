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
import DetailProduct from "../views/product/DetailProduct.vue";
import Dashboard from "../views/admin/dashboard.vue";
import Products from "../views/admin/products.vue";
import Users from "../views/admin/userAdmin.vue";
import History from "../views/admin/History.vue";
import HistoryView from "../views/History/HistoryView.vue";
import ThanksView from "../views/FinishPayment/ThanksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      meta: {
        role: "user",
      },
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "allproducts",
          name: "allproducts",
          component: ProductView,
        },
        {
          path: "bestproducts",
          name: "bestproducts",
          component: BestProductView,
        },
        {
          path: "newproducts",
          name: "newproducts",
          component: NewProductView,
        },
        {
          path: "products/:id",
          name: "detailproduct",
          component: DetailProduct,
        },
        {
          path: "ourstore",
          name: "ourstore",
          component: OurStoreView,
        },
        {
          path: "guide",
          name: "guide",
          component: GuideView,
        },
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "cart",
          name: "cart",
          component: CartView,
        },
        {
          path: "history",
          name: "history",
          component: HistoryView,
        },
      ],
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
      path: "/thanks",
      name: "thanks",
      component: ThanksView,
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
      path: "/admin/",
      meta: {
        role: "admin",
      },
      children: [
        {
          path: "",
          name: "admin",
          component: Dashboard,
        },
        {
          path: "products",
          name: "products",
          component: Products,
        },
        {
          path: "users",
          name: "users",
          component: Users,
        },
        {
          path: "histories",
          name: "histories",
          component: History,
        },
      ],
    },
  ],
});

const authenticated = localStorage.getItem("authenticated");

if (authenticated === null) {
  localStorage.setItem("authenticated", false);
}

router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("authenticated"));
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("isAuthenticated:", isAuthenticated);
  console.log("userRole:", userRole);
  console.log("to.path:", to.path);

  if (
    to.meta.role === "admin" &&
    isAuthenticated === true &&
    token !== null &&
    userRole !== "admin"
  )
    next("/");
  if (
    to.meta.role === "user" &&
    isAuthenticated === true &&
    token !== null &&
    userRole !== "user"
  )
    next("/admin");
  if (to.path === "/profile" && isAuthenticated === false && token === null)
    next("/login");
  if (to.path === "/cart" && isAuthenticated === false && token === null)
    next("/login");
  if (to.path === "/history" && isAuthenticated === false && token === null)
    next("/login");
  if (to.path === "/admin" && isAuthenticated === false && token === null)
    next("/login");
  if (to.path === "/login" && isAuthenticated === true && token !== null)
    next("/");
  if (to.path === "/register" && isAuthenticated === true && token !== null)
    next("/");
  else next();
});

export default router;
