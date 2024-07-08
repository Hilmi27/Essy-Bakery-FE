<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  localStorage.setItem("authenticated", "true");
  localStorage.setItem("role", "user");
  router.push("/");
};
</script>

<template>
  <section class="flex justify-center items-center min-h-screen">
    <div
      class="container flex flex-col p-8 justify-center items-center lg:flex-row lg:gap-10 2xl:gap-20"
    >
      <div
        class="w-full h-32 bg-sandDollar rounded-2xl flex items-center pt-2 overflow-hidden lg:order-2 lg:h-full"
      >
        <img src="../../assets/images/login.png" alt="" />
      </div>
      <div class="w-full lg:order-1">
        <form action="">
          <h1
            class="text-2xl font-semibold text-gray-800 mt-5 mb-2 md:text-3xl lg:text-4xl 2xl:text-5xl 2xl:mb-4"
          >
            Welcome Back 👋
          </h1>
          <p
            class="text-sm font-semibold text-gray-700 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-1"
          >
            Lets get your fresh bread Today
          </p>
          <p
            class="text-sm font-semibold text-gray-700 mb-3 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-6"
          >
            Sign in to start shopping
          </p>
          <div class="flex flex-col mb-3">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2"
              >Email</label
            >
            <input
              type="text"
              placeholder="Example@email.com"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg 2xl:text-xl 2xl:p-3 placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <div class="flex flex-col mb-6 2xl:mb-8">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2"
              >Password</label
            >
            <input
              type="password"
              placeholder="At least 8 Characters"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none md:text-base lg:text-lg 2xl:text-xl"
            />
          </div>
          <button
            class="bg-beige w-full rounded-xl text-white font-medium p-2 mb-6 md:text-lg lg:text-xl lg:p-3 2xl:text-xl"
            type="submit"
            v-on:click="login()"
          >
            Sign in
          </button>
          <!-- <p
            class="text-sm text-gray-600 font-semibold w-full text-center flex items-center gap-3 mb-6 md:text-base lg:text-lg 2xl:text-xl"
          >
            <span class="border-t border-gray-300 w-full"></span>
            Or
            <span class="border-t border-gray-300 w-full"></span>
          </p>
          <button
            class="bg-gray-300 w-full rounded-xl text-gray-800 font-medium p-2 mb-8 md:text-lg lg:text-xl lg:p-3"
            type="button"
          >
            <font-awesome-icon
              :icon="`fa-brands fa-google`"
              class="mr-2 text-base text-gray-800"
            ></font-awesome-icon
            >Google
          </button> -->
          <p
            class="w-full text-center text-sm text-gray-800 md:text-base lg:text-lg 2xl:text-xl"
          >
            Don't have an account?
            <RouterLink class="text-sky-500 cursor-pointer" to="/register"
              >Sign up</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
