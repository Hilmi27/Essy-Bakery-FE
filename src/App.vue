<script setup>
import { RouterView, RouterLink } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="dark:bg-slate-700 overflow-hidden">
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped></style>
