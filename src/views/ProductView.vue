<script setup>
import { ref } from "vue";

const Search = ref("");

// const photos = [
//   "foto1.jpg",
//   "foto2.jpg",
//   "foto3.jpg",
//   "foto1.jpg",
//   "foto2.jpg",
//   "foto3.jpg",
// ];

const cakes = [
  {
    id: 1,
    name: "Brownies",
    photo: "foto1.jpg",
  },
  {
    id: 2,
    name: "Cupcake",
    photo: "foto2.jpg",
  },
  {
    id: 3,
    name: "Chiffon",
    photo: "foto3.jpg",
  },
  {
    id: 1,
    name: "Brownies",
    photo: "foto1.jpg",
  },
  {
    id: 2,
    name: "Cupcake",
    photo: "foto2.jpg",
  },
  {
    id: 3,
    name: "Chiffon",
    photo: "foto3.jpg",
  },
  {
    id: 1,
    name: "Brownies",
    photo: "foto1.jpg",
  },
  {
    id: 2,
    name: "Cupcake",
    photo: "foto2.jpg",
  },
  {
    id: 3,
    name: "Chiffon",
    photo: "foto3.jpg",
  },
];

// matchingCakes = computed(() => {
//   return cakes.map((cake) => {
//     cake.name.valueOf.filter((name) =>
//       name.includes(Search.value.toLowerCase())
//     );
//   });
// });

// console.log(matchingCakes);
</script>

<template>
  <section
    class="flex flex-col justify-center items-center min-h-screen pt-32 pb-7"
  >
    <div class="flex w-1/2 max-w-[1500px] mb-8">
      <input
        type="text"
        class="w-full text-slate-600 font-semibold h-10 rounded-s-xl p-5 flex bg-slate-200 outline-none dark:bg-slate-600 placeholder:text-slate-500 dark:placeholder:text-slate-300 dark:text-slate-300"
        placeholder="Search..."
      />
      <span
        class="flex items-center text-xl rounded-e-xl px-4 bg-slate-200 text-slate-500 lg:w-10 dark:bg-slate-600 dark:text-slate-300 lg:px-0"
      >
        <font-awesome-icon :icon="`fa-solid fa-search`"></font-awesome-icon>
      </span>
    </div>
    <div class="container flex flex-wrap gap-3 justify-center items-center">
      <div
        class="w-44 shadow rounded-xl border-2 border-gray-200 overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-500 md:w-48 lg:w-1/4"
        v-for="cake in cakes"
      >
        <img :src="`src/assets/images/${cake.photo}`" alt="" class="w-full" />
        <div class="card-description p-5 dark:text-white">
          <h3
            class="text-base md:text-lg font-bold mb-1 text-slate-800 dark:text-white lg:text-2xl"
          >
            {{ cake.name }}
          </h3>
          <p
            class="text-xs md:text-sm mb-4 text-slate-600 text-justify dark:text-slate-300 lg:text-lg"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
            molestiae.
          </p>
          <p
            class="text-xs md:text-sm font-semibold mb-3 text-slate-800 dark:text-slate-100 lg:text-lg"
          >
            price: Rp 50.000
          </p>
          <button
            class="px-5 md:px-10 py-2 text-xs md:text-sm rounded-xl bg-sandDollar font-semibold text-slate-100 hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-lg"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
