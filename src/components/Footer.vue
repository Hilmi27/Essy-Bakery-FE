<script setup></script>

<template>
  <footer
    class="absolute w-full bg-white flex justify-center items-center dark:bg-slate-700"
  >
    <div
      class="container flex flex-col items-center justify-between py-5 lg:flex-row border-t border-slate-200 dark:border-slate-900"
    >
      <p
        class="text-sm font-semibold text-slate-700 dark:text-white md:text-base"
      >
        &copy; 2024 Essy Bakery. All rights reserved.
      </p>
      <div class="links flex items-center justify-center gap-4">
        <button
          class="w-full h-10 text-lg flex justify-center items-center text-slate-700 transition ease-in-out duration-200 md:text-xl hover:text-sandDollar dark:text-white lg:w-10 lg:block dark:hover:text-sandDollar"
        >
          <font-awesome-icon
            :icon="`fa-brands fa-facebook`"
          ></font-awesome-icon>
        </button>
        <button
          class="w-full h-10 text-lg flex justify-center items-center text-slate-700 transition ease-in-out duration-200 md:text-xl hover:text-sandDollar dark:text-white lg:w-10 lg:block dark:hover:text-sandDollar"
        >
          <font-awesome-icon :icon="`fa-brands fa-twitter`"></font-awesome-icon>
        </button>
        <button
          class="w-full h-10 text-lg flex justify-center items-center text-slate-700 transition ease-in-out duration-200 md:text-xl hover:text-sandDollar dark:text-white lg:w-10 lg:block dark:hover:text-sandDollar"
        >
          <font-awesome-icon
            :icon="`fa-brands fa-instagram`"
          ></font-awesome-icon>
        </button>
      </div>
    </div>
  </footer>
</template>
