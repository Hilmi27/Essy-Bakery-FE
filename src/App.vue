<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import SideBar from "./components/SideBar.vue";
import NavbarAdmin from "./components/NavbarAdmin.vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);
</script>

<template>
  <div
    class="dark:bg-gray-700 overflow-hidden"
    v-if="
      route.name !== 'login' &&
      route.name !== 'register' &&
      route.meta.role === 'user'
    "
  >
    <Navbar />
    <RouterView />
    <Footer />
  </div>
  <div v-else-if="route.name === 'login'">
    <Login />
  </div>
  <div
    v-else-if="
      route.name !== 'login' &&
      route.name !== 'register' &&
      route.meta.role === 'admin'
    "
  >
    <NavbarAdmin />
    <SideBar />
    <RouterView />
  </div>
  <div v-else>
    <Register />
  </div>
</template>

<style scoped></style>
