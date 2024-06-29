<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const persons = [
  "customer3.jpg",
  "customer4.jpg",
  "customer3.jpg",
  "customer4.jpg",
];
</script>

<template>
  <section class="flex justify-center items-center py-20">
    <div
      class="container flex flex-col lg:flex-row justify-center items-center bg-sandDollar/70 rounded-3xl p-20 dark:bg-slate-600"
    >
      <div class="w-full lg:w-2/3 mb-10 lg:mb-0">
        <h1
          class="text-4xl lg:text-7xl text-center lg:text-left font-bold text-slate-700 dark:text-white leading-snug"
        >
          Our Happy
        </h1>
        <h1
          class="text-5xl lg:text-8xl text-center lg:text-left font-bold text-slate-700 dark:text-white"
        >
          Customer
        </h1>
      </div>
      <div class="w-full lg:w-1/2">
        <Swiper
          :spaceBetween="15"
          :slidesPerView="1.5"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay]"
          :loop="true"
          :speed="5000"
        >
          <SwiperSlide v-for="person in persons">
            <div
              class="flex flex-col lg:flex-row items-center bg-white rounded-xl overflow-hidden p-6 border-2 border-slate-200 dark:border-slate-800 dark:bg-slate-700"
            >
              <div class="w-full text-center order-2 lg:text-left lg:order-1">
                <h3
                  class="text-2xl font-bold text-slate-800 mb-1 dark:text-white"
                >
                  Hilmi
                </h3>
                <p class="font-medium text-slate-800/80 dark:text-white">
                  browniesnya enak banget bjir
                </p>
              </div>
              <div
                class="w-full flex justify-center order-1 mb-2 lg:text-left lg:order-2"
              >
                <img
                  :src="`src/assets/images/${person}`"
                  alt="keren bjir"
                  class="w-48 rounded-full"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
