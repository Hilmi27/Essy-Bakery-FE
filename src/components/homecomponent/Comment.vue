<script setup>
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/autoplay";
const comments = ref([]);

const endpoint = import.meta.env.VITE_ENDPOINT;

const getComments = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/comment/list`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    comments.value = res.data.data;
    console.log(comments.value);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getComments();
});
</script>

<template>
  <section class="flex justify-center items-center py-20">
    <div
      class="container flex flex-col lg:flex-row justify-center items-center bg-sandDollar/70 rounded-3xl p-20 dark:bg-gray-600"
    >
      <div class="w-full lg:w-2/3 mb-10 lg:mb-0">
        <h1
          class="text-4xl lg:text-7xl text-center lg:text-left font-bold text-gray-700 dark:text-white leading-snug"
        >
          Our Happy
        </h1>
        <h1
          class="text-5xl lg:text-8xl text-center lg:text-left font-bold text-gray-700 dark:text-white"
        >
          Customer
        </h1>
      </div>
      <div class="w-full lg:w-1/2">
        <Swiper
          :spaceBetween="15"
          :slidesPerView="1.75"
          :autoplay="{
            delay: 0,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay]"
          :loop="true"
          :speed="5000"
        >
          <SwiperSlide v-for="comment in comments" :key="comment.id">
            <div>
              <div
                class="flex flex-col lg:flex-row items-center bg-white rounded-xl overflow-hidden p-6 border-2 border-gray-200 dark:border-gray-800 dark:bg-gray-700"
              >
                <div
                  class="w-full flex flex-col justify-between h-28 text-center order-2 lg:text-left lg:order-1 lg:w-3/4"
                >
                  <div>
                    <h3
                      class="text-xl font-bold text-gray-800 mb-1 dark:text-white"
                    >
                      {{ comment.product_name }}
                    </h3>
                    <p class="font-medium text-gray-800/80 dark:text-white">
                      {{ comment.comment }}
                    </p>
                  </div>
                  <p
                    class="text-lg font-medium text-gray-800/80 dark:text-white"
                  >
                    - {{ comment.fullname }}
                  </p>
                </div>
                <div
                  class="w-full flex justify-center order-1 mb-2 lg:text-left lg:order-2 lg:w-1/4"
                >
                  <img
                    :src="endpoint + comment.product_picture"
                    alt="keren bjir"
                    class="w-36 rounded-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>
