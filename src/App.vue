<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div
    class="dark:bg-slate-700 overflow-hidden"
    v-if="route.name !== 'login' && route.name !== 'register'"
  >
    <Navbar />
    <RouterView />
    <Footer />
  </div>
  <div v-else-if="route.name === 'login'">
    <Login />
  </div>
  <div v-else>
    <Register />
  </div>
</template>

<style scoped></style>
