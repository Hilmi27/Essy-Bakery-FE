<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const endpoint = import.meta.env.VITE_ENDPOINT;
const carts = ref([]);
const selectAll = ref(false);

const fetchCart = async () => {
  try {
    const res = await axios.get(`${endpoint}/carts/list`, {
      headers: {
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN1cGVyYWRtaW4iLCJmdWxsbmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImFsYW1hdCI6bnVsbCwicGhvbmUiOm51bGwsInBhc3N3b3JkIjoiJDJhJDEwJFJwVFVGR3A0U1dhWjBYUVI2R3hmai5qZ1FjSzVVejV5b3BWVHNSOGoucFhoOUs4VEdEcEM2IiwiaWF0IjoxNzE5ODEwODI2fQ.hTX89qTJ2mvA3Gc-2pSwkzNE5kd3CA4LFM7A9FtkVk0`,
      },
    });
    carts.value = res.data.data;
    console.log(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

const toggleSelectAll = () => {
  toast.success("waw ke check semua bjir", {
    autoClose: 4000,
    position: "top-center",
    transition: "bounce",
    theme: "dark",
  });
  selectAll.value = !selectAll.value;
  carts.value.forEach((item) => {
    item.is_checked = selectAll.value;
  });
};

const toggleItemChecked = (index) => {
  carts.value[index].is_checked = !carts.value[index].is_checked;
};

const deleteCart = async (id) => {
  try {
    await axios.delete(`${endpoint}/carts/delete/${id}`, {
      headers: {
        Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN1cGVyYWRtaW4iLCJmdWxsbmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImFsYW1hdCI6bnVsbCwicGhvbmUiOm51bGwsInBhc3N3b3JkIjoiJDJhJDEwJFJwVFVGR3A0U1dhWjBYUVI2R3hmai5qZ1FjSzVVejV5b3BWVHNSOGoucFhoOUs4VEdEcEM2IiwiaWF0IjoxNzE5ODEwODI2fQ.hTX89qTJ2mvA3Gc-2pSwkzNE5kd3CA4LFM7A9FtkVk0`,
      },
    });
    toast.success("waw ke hapus bjir", {
      autoClose: 4000,
      position: "top-center",
      transition: "bounce",
      theme: "dark",
    });
    fetchCart();
  } catch (error) {
    console.log(error);
  }
};

watch(
  carts,
  (newCarts) => {
    selectAll.value = newCarts.every((item) => item.is_checked);
  },
  { deep: true }
);

onMounted(() => {
  fetchCart();
});
</script>

<template>
  <section class="flex justify-center items-center min-h-screen pt-28">
    <div class="container flex flex-col justify-center p-8">
      <h1 class="text-6xl font-semibold mb-10 text-slate-800 dark:text-white">
        Shopping Cart
      </h1>
      <div class="flex items-center mb-3">
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer ml-2"
          htmlFor="checkbox"
        >
          <input
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 dark:checked:border-gray-300 dark:checked:bg-gray-300"
            id="checkbox"
            v-model="selectAll"
            v-on:click="toggleSelectAll"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 dark:text-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <h3
          class="text-xl ml-1 pt-0.5 font-semibold text-slate-800 dark:text-white"
        >
          Select All
        </h3>
      </div>
      <div class="flex w-full gap-5">
        <div class="flex flex-col w-3/4 gap-3">
          <div
            class="flex items-center px-2 py-4 justify-between bg-white shadow-lg rounded-xl dark:bg-slate-600"
            v-for="(cart, index) in carts"
          >
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 dark:checked:border-gray-300 dark:checked:bg-gray-300"
                id="checkbox"
                :checked="cart.is_checked"
                v-on:change="toggleItemChecked(index)"
              />
              <span
                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 dark:text-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <div class="flex items-center justify-between w-full gap-10">
              <img
                :src="`src/assets/images/cart1.jpeg`"
                alt="kok ga keluar bjir"
                class="w-28 rounded-xl ml-5"
              />
              <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
                {{ cart.name }}
              </h3>
              <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
                {{ cart.quantity }}
              </h3>
              <h3 class="text-lg font-semibold text-slate-800 dark:text-white">
                Rp. {{ cart.price }}
              </h3>
              <button
                class="py-3 px-4 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
                v-on:click="deleteCart(cart.id)"
              >
                <font-awesome-icon
                  :icon="'fa-regular fa-trash-can'"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/4 gap-5">
          <div
            class="flex flex-col items-center justify-center shadow-lg p-8 gap-1 rounded-lg dark:bg-slate-600"
          >
            <div
              class="flex justify-between w-full"
              v-for="cart in carts.filter((e) => e.is_checked)"
            >
              <p class="font-medium text-slate-800 dark:text-white">
                {{ cart.name }}
              </p>
              <p class="font-medium text-slate-800 dark:text-white">
                x{{ cart.quantity }}
              </p>
            </div>

            <div class="border-t border-slate-300 w-full my-5"></div>
            <div class="flex justify-between w-full">
              <p class="font-medium text-slate-800 dark:text-white">Total :</p>
              <p class="font-medium text-slate-800 dark:text-white">
                Rp.
                {{
                  carts
                    .filter((e) => e.is_checked)
                    .reduce((a, b) => a + b.price * b.quantity, 0)
                }}
              </p>
            </div>
          </div>
          <button
            class="w-full bg-beige text-white p-4 text-lg rounded-xl font-semibold transition ease-in-out duration-300 hover:bg-beige/80"
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
