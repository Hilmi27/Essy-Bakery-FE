<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const endpoint = import.meta.env.VITE_ENDPOINT;
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
const router = useRouter();
const user = ref({});
const handleLogout = () => {
  localStorage.setItem("authenticated", false);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");

  toast.success("berhasil keluar bjir", {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: "bounce",
  });

  setTimeout(() => {
    router.push("/");
  }, 800);
};

const getUser = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/details_by_id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    const data = res.data.data[0];
    user.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <section class="flex justify-center items-center min-h-screen pt-16 lg:pt-10">
    <div
      class="container flex flex-col justify-center items-center p-8 lg:flex-row lg:gap-12"
    >
      <div
        class="flex flex-col justify-center items-center px-8 py-4 bg-gray-100 rounded-3xl w-full lg:w-1/3 lg:py-6 2xl:py-10 dark:bg-gray-600"
      >
        <img
          src="../../assets/images/customer4.jpg"
          alt=""
          class="rounded-full w-32 lg:w-40 2xl:w-48"
        />
        <h1
          class="text-xl text-gray-800 font-semibold my-4 md:text-2xl xl:text-3xl 2xl:text-4xl lg:my-5 2xl:my-6 dark:text-white"
        >
          {{ user.fullname }}
        </h1>
        <button
          class="border-t-2 pt-4 border-gray-200 w-full text-gray-400 font-semibold cursor-pointer md:text-lg xl:text-xl transition ease-in-out duration-300 hover:text-gray-400/70"
          v-on:click="handleLogout()"
        >
          <font-awesome-icon
            :icon="'fa-solid fa-arrow-right-from-bracket'"
          ></font-awesome-icon>
          LogOut
        </button>
      </div>
      <div class="w-full lg:w-2/3">
        <h1
          class="text-2xl text-gray-800 font-semibold mb-4 mt-6 lg:mb-6 xl:mb-8 2xl:mb-10 text-center md:text-3xl lg:text-4xl xl:text-5xl lg:text-left dark:text-white"
        >
          Welcome, {{ user.fullname }}!
        </h1>
        <div class="flex flex-col w-full lg:flex-row lg:gap-6">
          <div class="flex flex-col mb-3 w-full lg:w-1/2">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Full Name</label
            >
            <input
              type="text"
              class="text-sm text-gray-400 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg 2xl:text-xl 2xl:p-3 placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-800"
              v-model="user.fullname"
              disabled
            />
          </div>
          <div class="flex flex-col mb-3 w-full lg:w-1/2 xl:mb-4">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Phone</label
            >
            <input
              type="text"
              class="text-sm text-gray-400 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none md:text-base lg:text-lg 2xl:text-xl dark:bg-gray-600 dark:border-gray-800"
              v-model="user.phone"
              disabled
            />
          </div>
        </div>
        <div class="flex flex-col mb-3 xl:mb-4">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
            >Email</label
          >
          <input
            type="text"
            placeholder="Hilmi31@gmail.com"
            class="text-sm text-gray-400 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg 2xl:text-xl 2xl:p-3 placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-800"
            v-model="user.email"
            disabled
          />
        </div>

        <div class="flex flex-col mb-6 2xl:mb-8">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
            >Adress</label
          >
          <input
            class="text-sm text-gray-400 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none md:text-base lg:text-lg 2xl:text-xl dark:bg-gray-600 dark:border-gray-800"
            v-model="user.alamat"
            disabled
          />
        </div>
      </div>
    </div>
  </section>
</template>
