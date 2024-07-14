<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const endpoint = import.meta.env.VITE_ENDPOINT;

const atribut = ref({
  fullname: "",
  email: "",
  password: "",
  phone: 0,
  alamat: "",
});

const createUser = async () => {
  try {
    const res = await axios.post(`${endpoint}/user/register`, atribut.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 204) {
      toast.error(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: "bounce",
      });
    } else {
      toast.success("berhasil bikin akun bjir", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: "bounce",
      });

      setTimeout(() => {
        router.push("/login");
      }, 800);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section
    class="bg-white flex justify-center items-center min-h-screen dark:bg-gray-700"
  >
    <div
      class="container flex flex-col p-8 justify-center items-center lg:flex-row lg:gap-10 2xl:gap-20"
    >
      <div
        class="w-full h-32 bg-sandDollar rounded-2xl flex items-center pt-2 overflow-hidden lg:order-2 lg:h-full"
      >
        <img src="../../assets/images/login.png" alt="" />
      </div>
      <div class="w-full lg:order-1">
        <form v-on:submit.prevent="createUser()">
          <h1
            class="text-2xl font-semibold text-gray-800 mt-5 mb-2 md:text-3xl lg:text-4xl 2xl:text-5xl 2xl:mb-4 dark:text-white"
          >
            Hello there 👋
          </h1>
          <p
            class="text-sm font-semibold text-gray-700 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-1 dark:text-white"
          >
            Lets get your fresh bread Today
          </p>
          <p
            class="text-sm font-semibold text-gray-700 mb-3 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-6 dark:text-white"
          >
            Sign up to create an account
          </p>
          <div class="flex flex-col mb-3">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Full Name</label
            >
            <input
              type="text"
              placeholder="Faris Oldie"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg 2xl:text-xl 2xl:p-3 placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300"
              v-model="atribut.fullname"
            />
          </div>
          <div class="flex flex-col mb-3">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Email</label
            >
            <input
              type="text"
              placeholder="Example@email.com"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg 2xl:text-xl 2xl:p-3 placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300"
              v-model="atribut.email"
            />
          </div>
          <div class="flex flex-col mb-6 2xl:mb-3">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              placeholder="At least 8 Characters"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300 md:text-base lg:text-lg 2xl:text-xl"
              v-model="atribut.password"
            />
          </div>
          <div class="flex flex-col mb-6 2xl:mb-3">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Phone</label
            >
            <input
              type="text"
              placeholder="+62**********"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300 md:text-base lg:text-lg 2xl:text-xl"
              v-model="atribut.phone"
            />
          </div>
          <div class="flex flex-col mb-6 2xl:mb-8">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Adress</label
            >
            <input
              type="text"
              placeholder="mulawarman, tembalang, semarang"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300 md:text-base lg:text-lg 2xl:text-xl"
              v-model="atribut.address"
            />
          </div>
          <button
            class="bg-beige w-full rounded-xl text-white font-medium p-2 mb-6 md:text-lg lg:text-xl lg:p-3 2xl:text-xl"
            type="submit"
          >
            Sign up
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
            class="w-full text-center text-sm text-gray-800 md:text-base lg:text-lg 2xl:text-xl dark:text-white"
          >
            Already have an account?
            <RouterLink class="text-sky-500 cursor-pointer" to="/login"
              >Sign in</RouterLink
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
