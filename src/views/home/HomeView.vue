<script setup>
import Hero from "../../components/homecomponent/Hero.vue";
import HomeProduct from "../../components/homecomponent/HomeProduct.vue";
import HowToShopping from "../../components/homecomponent/HowToShopping.vue";
import Map from "../../components/homecomponent/Map.vue";
import Comment from "../../components/homecomponent/Comment.vue";
import { onMounted } from "vue";

// const sandBox = () => {
//   const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
//   const clientKey = "SB-Mid-client-YQ2tO6H7qxJtzQxU";

//   const script = document.createElement("script");
//   script.src = snapScript;
//   script.setAttribute("data-client-key", clientKey);
//   script.async = true;

//   document.body.appendChild(script);
// };

// onMounted(() => {
//   sandBox();
//   document.body.removeChild(script);
// });
</script>

<template>
  <Hero />
  <HomeProduct />
  <HowToShopping />
  <Map />
  <!-- <Comment /> -->
</template>
