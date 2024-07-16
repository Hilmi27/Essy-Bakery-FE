<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const search = ref("");

const products = ref([]);

const endpoint = import.meta.env.VITE_ENDPOINT;

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${endpoint}/products/list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data);
    products.value = res.data.data;
  } catch (error) {
    console.log();
  }
};

const filteredProducts = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/products/list/?name=${search.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    products.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
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
        class="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-700 text-center dark:text-white"
      >
        All Product
      </h1>
    </div>
    <div class="flex w-1/2 max-w-[1500px] mb-8">
      <input
        type="text"
        class="w-full text-gray-600 font-semibold h-10 rounded-s-xl p-5 flex bg-gray-200 outline-none dark:bg-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-300 dark:text-gray-300"
        placeholder="Search..."
        v-model="search"
        v-on:keyup="filteredProducts()"
      />
      <span
        class="flex items-center text-xl rounded-e-xl px-4 bg-gray-200 text-gray-500 lg:w-10 dark:bg-gray-600 dark:text-gray-300 lg:px-0"
      >
        <font-awesome-icon :icon="`fa-solid fa-search`"></font-awesome-icon>
      </span>
    </div>
    <div class="container flex flex-wrap gap-3 justify-center items-center">
      <div
        class="w-44 shadow rounded-xl border-2 border-gray-200 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-500 md:w-48 lg:w-1/4"
        v-for="product in products"
      >
        <img
          :src="endpoint + product.product_picture"
          alt=""
          class="w-full mb-1"
        />
        <div class="card-description p-5 dark:text-white">
          <h3
            class="text-base md:text-lg font-bold mb-1 text-gray-800 dark:text-white lg:text-2xl"
          >
            {{ product.name }}
          </h3>
          <p
            class="text-xs md:text-sm mb-4 text-gray-700 text-justify dark:text-gray-300 lg:text-base"
          >
            {{ product.description }}
          </p>
          <div
            class="flex justify-between items-center mb-4 pt-4 border-t border-gray-300 dark:border-gray-500"
          >
            <p
              class="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-100 lg:text-base"
            >
              price: {{ rupiah(product.price) }}
            </p>
            <p
              class="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-100 lg:text-base"
            >
              stock: {{ product.stock }}
            </p>
          </div>
          <RouterLink :to="`/products/${product.id}`">
            <button
              class="px-5 md:px-10 py-2 text-xs md:text-sm rounded-xl bg-sandDollar font-semibold text-gray-100 hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-lg"
              v-if="product.stock > 0"
            >
              Order
            </button>
            <button
              class="px-5 md:px-10 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-gray-100 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-lg"
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
