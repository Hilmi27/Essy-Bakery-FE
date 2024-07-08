<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const Search = ref("");
const endpoint = import.meta.env.VITE_ENDPOINT;
const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${endpoint}/products/list_best_seller`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    products.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <section
    class="flex flex-col justify-center items-center min-h-screen pt-32 pb-7"
  >
    <div class="mb-5 lg:mb-10">
      <h1
        class="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-700 text-center dark:text-white"
      >
        Best Product
      </h1>
    </div>
    <div class="container flex flex-wrap gap-3 justify-center items-center">
      <div
        class="w-44 shadow rounded-xl border-2 border-gray-200 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-500 md:w-48 lg:w-1/4"
        v-for="product in products"
      >
        <img :src="`src/assets/images/foto2.jpg`" alt="" class="w-full" />
        <div class="card-description p-5 dark:text-white">
          <h3
            class="text-base md:text-lg font-bold mb-1 text-slate-800 dark:text-white lg:text-2xl"
          >
            {{ product.name }}
          </h3>
          <p
            class="text-xs md:text-sm mb-4 text-slate-600 text-justify dark:text-slate-300 lg:text-lg"
          >
            {{ product.description }}
          </p>
          <div
            class="flex justify-between items-center mb-4 pt-4 border-t border-gray-300 dark:border-gray-500"
          >
            <p
              class="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 lg:text-base"
            >
              price: Rp {{ product.price }}
            </p>
            <p
              class="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-100 lg:text-base"
            >
              stock: {{ product.stock }}
            </p>
          </div>
          <RouterLink :to="`/products/${product.id}`">
            <button
              class="px-5 md:px-10 py-2 text-xs md:text-sm rounded-xl bg-sandDollar font-semibold text-slate-100 hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-lg"
              v-if="product.stock > 0"
            >
              Order
            </button>
            <button
              class="px-5 md:px-10 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-slate-100 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-lg"
              disabled
              v-else
            >
              Order
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
