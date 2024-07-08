<script setup>
import { onMounted, ref, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRouter } from "vue-router";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const themeChanged = ref(false);
const router = useRouter();

const reload = () => {
  toggleDark();
  window.location.reload();
};

// watch(isDark, (newValue) => {
//   console.log(newValue);
//   // if (newValue) {
//   //   document.body.classList.add("dark");
//   // } else {
//   //   document.body.classList.remove("dark");
//   // }
//   themeChanged.value = true;
//   localStorage.setItem("theme", true);
//   setTimeout(() => {
//     themeChanged.value = false;
//   }, 0); // sedikit delay untuk memastikan re-render selesai
// });

const handleClick = () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.classList.toggle("is-active");
  navMenu.classList.toggle("hidden");
};

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// onMounted(() => {
//   reload();
// });
</script>

<template>
  <header
    class="bg-transparent absolute top-0 left-0 w-full flex justify-center items-center z-50"
  >
    <div class="container flex items-center justify-between relative py-4">
      <div class="navbar-left px-4 lg:px-0">
        <RouterLink
          class="text-xl font-bold text-slate-700 transition ease-in-out duration-200 hover:text-sandDollar dark:text-white dark:hover:text-sandDollar"
          to="/"
          >Essy Bakery</RouterLink
        >
      </div>
      <div class="flex px-1">
        <button
          id="hamburger"
          name="hamburger"
          type="button"
          class="hamburger hamburger--spring"
          @click="handleClick()"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        <nav
          id="nav-menu"
          class="hidden absolute text-slate-800 dark:bg-slate-700 dark:bg-opacity-90 bg-opacity-90 shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none dark:lg:bg-transparent bg-white"
        >
          <ul class="block py-2 lg:flex">
            <li class="group">
              <RouterLink
                class="text-base mx-8 flex py-2 group-hover:text-sandDollar font-semibold transition ease-in-out duration-200 justify-center dark:text-white"
                to="/"
                >Home</RouterLink
              >
            </li>
            <li class="relative" x-data="{ dropdownOpen: false }">
              <RouterLink
                to=""
                x-on:click="dropdownOpen = !dropdownOpen"
                x-on:click.away="dropdownOpen = false"
                class="text-base mx-8 flex py-2 hover:text-sandDollar font-semibold transition ease-in-out duration-200 justify-center items-center dark:text-white"
                >Products
                <font-awesome-icon
                  class="ml-2"
                  x-bind:class="dropdownOpen ? 'rotate-180 duration-300' : 'duration-300'"
                  :icon="`fa-solid fa-chevron-down`"
                ></font-awesome-icon>
              </RouterLink>
              <div
                class="absolute right-11 font-semibold bg-white w-40 px-3 py-5 rounded-lg shadow text-center z-20 lg:right-0"
                x-show="dropdownOpen"
                x-transition:enter="ease-out duration-300"
                x-transition:enter-start="opacity-0 -translate-y-5 scale-90"
                x-transition:enter-end="opacity-100 translate-y-0 scale-100"
                x-transition:leave="ease-in duration-300"
                x-transition:leave-start="opacity-100 translate-y-0 scale-100"
                x-transition:leave-end="opacity-0 -translate-y-5 scale-90"
              >
                <ul>
                  <li>
                    <RouterLink
                      class="hover:text-sandDollar transition ease-in-out duration-200"
                      to="/allproducts"
                      >All Products</RouterLink
                    >
                  </li>
                  <li class="my-1">
                    <RouterLink
                      class="hover:text-sandDollar transition ease-in-out duration-200"
                      to="/bestproducts"
                      >Best Products</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink
                      class="hover:text-sandDollar transition ease-in-out duration-200"
                      to="/newproducts"
                      >New Products</RouterLink
                    >
                  </li>
                </ul>
              </div>
            </li>
            <li class="group">
              <RouterLink
                class="text-base mx-7 flex py-2 group-hover:text-sandDollar font-semibold transition ease-in-out duration-200 justify-center dark:text-white"
                to="/ourstore"
                >Our Store</RouterLink
              >
            </li>
            <li class="group">
              <RouterLink
                class="text-base mx-8 flex py-2 group-hover:text-sandDollar font-semibold transition ease-in-out duration-200 justify-center dark:text-white"
                to="/guide"
                >Guide</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/profile">
                <button
                  class="w-full h-10 text-xl flex justify-center items-center text-slate-700 transition ease-in-out duration-200 hover:text-sandDollar dark:text-white lg:w-10 lg:block lg:mx-5 dark:hover:text-sandDollar"
                >
                  <font-awesome-icon
                    :icon="`fa-solid fa-user`"
                  ></font-awesome-icon>
                </button>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/cart">
                <button
                  class="w-full h-10 text-xl flex justify-center items-center text-slate-700 transition ease-in-out duration-200 hover:text-sandDollar dark:text-white lg:w-10 lg:block lg:mx-5 dark:hover:text-sandDollar"
                >
                  <font-awesome-icon
                    :icon="`fa-solid fa-cart-shopping`"
                  ></font-awesome-icon>
                </button>
              </RouterLink>
            </li>
            <li>
              <button
                class="w-full h-10 text-xl flex justify-center items-center text-slate-700 transition ease-in-out duration-200 hover:text-sandDollar dark:text-white lg:w-10 lg:block lg:mx-5 dark:hover:text-sandDollar"
                @click="reload()"
              >
                <font-awesome-icon
                  :icon="`fa-solid fa-${isDark ? 'sun' : 'moon'}`"
                ></font-awesome-icon>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  height: 3px;
  width: 35px;
  background-color: #777;
}

.hamburger {
  display: none;
}

@media screen and (max-width: 1024px) {
  .hamburger {
    display: block;
  }
}
</style>
