<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const photos = [
  "heroimage1.jpeg",
  "heroimage2.jpeg",
  "heroimage3.jpeg",
  "heroimage1.jpeg",
];

const photossm = [
  "herosm5.jpeg",
  "herosm2.jpeg",
  "herosm3.jpeg",
  "herosm4.jpeg",
  "herosm5.jpeg",
  "herosm2.jpeg",
  "herosm3.jpeg",
  "herosm4.jpeg",
  "herosm5.jpeg",
  "herosm2.jpeg",
  "herosm3.jpeg",
  "herosm4.jpeg",
];
</script>

<template>
  <section
    id="hero"
    class="flex justify-center items-center min-h-screen pt-28 md:pt-20 lg:pt-24"
  >
    <div class="container flex flex-col justify-center pb-10 lg:hidden">
      <div class="h-1/2 mb-10 md:mb-5">
        <Swiper
          class="mb-3 h-full"
          :slidesPerView="3"
          :spaceBetween="10"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }"
          :loop="true"
          :modules="[Autoplay]"
          :speed="4000"
        >
          <SwiperSlide v-for="photo in photossm">
            <div class="rounded-lg overflow-hidden">
              <img :src="`src/assets/images/${photo}`" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
        <Swiper
          :slidesPerView="3"
          :spaceBetween="10"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :loop="true"
          :modules="[Autoplay]"
          :speed="4000"
        >
          <SwiperSlide v-for="photo in photossm">
            <div class="rounded-lg overflow-hidden">
              <img :src="`src/assets/images/${photo}`" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="text-center px-5">
        <h1
          class="text-4xl font-bold text-slate-700 dark:text-white mb-3 md:text-3xl"
        >
          get your fresh bread <span class="text-sandDollar">easily</span>
        </h1>
        <p class="font-semibold text-slate-500 dark:text-white mb-5 md:text-sm">
          Welcome to our Bakery Store! We offer a wide variety of fresh bread
        </p>
        <RouterLink to="/allproducts">
          <button
            class="px-5 md:px-8 py-3 text-sm rounded-xl bg-sandDollar font-semibold text-white hover:bg-slandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50"
          >
            View All Products
          </button>
        </RouterLink>
      </div>
    </div>
    <div class="container items-center justify-center hidden lg:flex">
      <div
        class="hero-left w-1/4 flex items-center h-screen max-h-screens overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <Swiper
          :slidesPerView="3"
          :direction="'vertical'"
          :loop="true"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay]"
          :speed="4000"
          class="h-full"
        >
          <SwiperSlide v-for="photo in photossm">
            <div class="rounded-lg overflow-hidden w-56 2xl:w-60">
              <img :src="`src/assets/images/${photo}`" alt="keren bener" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        class="hero-right w-3/4 flex flex-col items-center h-screen max-h-screen overflow-hidden"
      >
        <h1
          class="text-8xl 2xl:text-9xl text-center font-bold text-slate-700 dark:text-white mb-8 2xl:leading-tight"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          get your fresh bread <span class="text-sandDollar">easily</span>
        </h1>
        <div class="flex justify-start h-full w-full">
          <Swiper
            :slidesPerView="3"
            :direction="'vertical'"
            :loop="true"
            :autoplay="{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
            }"
            :modules="[Autoplay]"
            :speed="4000"
            class="h-full w-1/4"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <SwiperSlide v-for="photo in photossm">
              <div class="rounded-lg overflow-hidden w-56 2xl:w-60">
                <img :src="`src/assets/images/${photo}`" alt="keren bener" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            class="pl-14 w-3/4 text-justify pt-14"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <p
              class="text-xl 2xl:text-2xl font-semibold text-slate-500 dark:text-white mb-7 w-full leading-10"
            >
              Welcome to our Bakery Store! We offer a wide variety of fresh
              bread made with high-quality ingredients to delight your taste
              buds. Enjoy the delicious bread available in our store.
            </p>
            <RouterLink to="/allproducts">
              <button
                class="px-5 md:px-8 py-3 text-lg rounded-xl bg-sandDollar font-semibold text-white hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 dark:hover:bg-sandDollar/80"
              >
                View All Products
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
