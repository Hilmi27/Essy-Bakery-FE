<template>
  <section
    class="bg-white flex justify-center items-center w-screen min-h-screen dark:bg-gray-700"
  >
    <div class="flex flex-col items-center container">
      <img
        src="../../assets/images/thanks.png"
        alt="gambarnya ga keluar mas"
        class="w-1/4"
      />
      <h1 class="text-xl font-semibold text-gray-800 mt-8 dark:text-white">
        thanks for your order!
      </h1>
      <RouterLink to="/">
        <button
          class="mt-5 bg-gray-700 p-3 rounded-xl text-white font-medium transiction duration-300 ease-in-out hover:bg-gray-800/70"
        >
          back to home
        </button>
      </RouterLink>
    </div>
  </section>
</template>
