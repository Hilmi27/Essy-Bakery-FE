<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css";

const photos = ["herosm5.jpeg", "herosm2.jpeg", "herosm3.jpeg", "herosm4.jpeg"];
</script>

<template>
  <section
    id="homeProduct"
    class="flex justify-center items-center bg-sandDollar/70 dark:bg-slate-600 py-20"
  >
    <div class="container flex items-center">
      <Swiper
        class="w-full"
        :modules="[Pagination, Autoplay]"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="true"
        :loop="true"
        speed="1000"
      >
        <SwiperSlide id="swiper best product">
          <div class="w-full flex flex-col gap-1 md:flex-row">
            <div class="w-full md:w-1/2 mb-5 md:mb-0">
              <RouterLink
                to="/products"
                class="flex justify-center flex-wrap gap-2 2xl:gap-4"
              >
                <div
                  class="rounded-lg bg-white p-3 shadow-sm border border-slate-200 flex flex-col justify-center items-center overflow-hidden w-36 lg:w-44 xl:w-56 2xl:w-64 2xl:p-4 dark:bg-gray-800 dark:border-gray-500 xl:rounded-xl 2xl:rounded-2xl"
                  v-for="photo in photos"
                >
                  <img
                    :src="`src/assets/images/${photo}`"
                    alt=""
                    class="rounded-full w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32"
                  />
                  <h3
                    class="text-sm font-bold text-slate-700 text-center mt-2 mb-1 md:text-base lg:text-lg 2xl:text-xl dark:text-white 2xl:mt-3 2xl:mb-2"
                  >
                    Cupcake
                  </h3>
                  <p
                    class="text-xs font-semibold text-slate-700/60 text-center md:text-sm lg:text-base 2xl:text-lg dark:text-white/60"
                  >
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </RouterLink>
            </div>
            <div class="w-full md:w-1/2 text-center md:text-start">
              <h1
                class="text-4xl font-semibold text-slate-700 lg:text-5xl xl:text-6xl 2xl:text-7xl lg:font-bold lg:leading-tight xl:leading-tight 2xl:leading-tight dark:text-white"
              >
                Here's our best selling product
              </h1>
              <p
                class="text-sm font-semibold w-full md:w-3/4 text-slate-700/50 mt-4 mb-5 md:text-justify lg:text-base xl:text-lg 2xl:text-xl 2xl:mt-5 2xl:mb-6 dark:text-white/50"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt cum ab culpa repellat, facere ut.
              </p>
              <RouterLink to="/products">
                <button
                  class="px-5 md:px-10 py-3 text-xs md:text-sm rounded-xl bg-white font-semibold text-sandDollar hover:bg-white/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-white/50 lg:text-base xl:text-lg 2xl:text-xl dark:bg-sandDollar dark:text-white dark:focus:ring-sandDollar/50 dark:hover:bg-sandDollar/80"
                >
                  View All
                </button>
              </RouterLink>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper new product">
          <div class="flex flex-col gap-1 md:flex-row">
            <div class="w-full md:w-1/2 mb-5 md:mb-0">
              <RouterLink
                to="/products"
                class="flex justify-center flex-wrap gap-2 2xl:gap-4"
              >
                <div
                  class="rounded-lg bg-white p-3 shadow-sm border border-slate-200 flex flex-col justify-center items-center overflow-hidden w-36 md:w-32 lg:w-44 xl:w-56 2xl:w-64 2xl:p-4 dark:bg-gray-800 dark:border-gray-500 xl:rounded-xl 2xl:rounded-2xl"
                  v-for="photo in photos"
                >
                  <img
                    :src="`src/assets/images/${photo}`"
                    alt=""
                    class="rounded-full w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32"
                  />
                  <h3
                    class="text-sm font-bold text-slate-700 text-center mt-2 mb-1 md:text-base lg:text-lg 2xl:text-xl dark:text-white 2xl:mt-3 2xl:mb-2"
                  >
                    Cupcake
                  </h3>
                  <p
                    class="text-xs font-semibold text-slate-700/60 text-center md:text-sm lg:text-base 2xl:text-lg dark:text-white/60"
                  >
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </RouterLink>
            </div>
            <div class="w-full md:w-1/2 text-center md:text-start">
              <h1
                class="text-4xl font-semibold text-slate-700 lg:text-5xl xl:text-6xl 2xl:text-7xl lg:font-bold lg:leading-tight xl:leading-tight 2xl:leading-tight dark:text-white"
              >
                Here's our new selling product
              </h1>
              <p
                class="text-sm font-semibold w-full md:w-3/4 text-slate-700/50 mt-4 mb-5 text-center md:text-justify lg:text-base xl:text-lg 2xl:text-xl 2xl:mt-5 2xl:mb-6 dark:text-white/50"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt cum ab culpa repellat, facere ut.
              </p>
              <RouterLink to="/products">
                <button
                  class="px-5 md:px-10 py-3 text-xs md:text-sm rounded-xl bg-white font-semibold text-sandDollar hover:bg-white/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-white/50 lg:text-base xl:text-lg 2xl:text-xl dark:bg-sandDollar dark:text-white dark:focus:ring-sandDollar/50 dark:hover:bg-sandDollar/80"
                >
                  View All
                </button>
              </RouterLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped></style>
