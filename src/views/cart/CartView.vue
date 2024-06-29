<script setup>
import { ref } from "vue";

const images = ["cart1.jpeg", "cart2.jpeg", "cart3.jpeg"];
const isChecked = ref(false);
const clicked = () => {
  isChecked.value = !isChecked.value;
};
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div class="container flex flex-col justify-center p-8">
      <h1 class="text-6xl font-semibold mb-10 text-slate-800 dark:text-white">
        Shopping Cart
      </h1>
      <div class="flex items-center mb-1">
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer ml-2"
          htmlFor="checkbox"
        >
          <input
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            id="checkbox"
            v-on:click="clicked()"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
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
        <h3 class="text-xl ml-1 pt-0.5 font-semibold text-slate-800">
          Select All
        </h3>
      </div>
      <div class="flex w-full gap-5">
        <div class="flex flex-col w-3/4 gap-3">
          <div
            class="flex items-center px-2 py-4 justify-between bg-white shadow-lg rounded-xl"
            v-for="image in images"
          >
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="checkbox"
                :checked="isChecked"
              />
              <span
                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
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
                :src="`src/assets/images/${image}`"
                alt="kok ga keluar bjir"
                class="w-28 rounded-xl ml-5"
              />
              <h3 class="text-lg font-semibold text-slate-800">
                roti enak bjir
              </h3>
              <h3 class="text-lg font-semibold text-slate-800">3</h3>
              <button
                class="py-3 px-4 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
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
            class="flex flex-col items-center justify-center shadow-lg p-8 gap-1"
          >
            <div class="flex justify-between w-full">
              <p class="font-medium text-slate-800">roti enak bjir</p>
              <p class="font-medium text-slate-800">x3</p>
            </div>
            <div class="flex justify-between w-full">
              <p class="font-medium text-slate-800">roti enak bjir</p>
              <p class="font-medium text-slate-800">x3</p>
            </div>
            <div class="flex justify-between w-full">
              <p class="font-medium text-slate-800">roti enak bjir</p>
              <p class="font-medium text-slate-800">x3</p>
            </div>
            <div class="border-t border-slate-300 w-full my-5"></div>
            <div class="flex justify-between w-full">
              <p class="font-medium text-slate-800">Total :</p>
              <p class="font-medium text-slate-800">-</p>
            </div>
          </div>
          <button
            class="w-full bg-beige text-white p-4 text-lg rounded-xl font-semibold transition ease-in-out duration-300 hover:bg-beige/80"
            v-on:click="clicked()"
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
