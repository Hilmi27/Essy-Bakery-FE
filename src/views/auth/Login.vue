<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const router = useRouter();

const atribut = ref({
  email: "",
  password: "",
});
const endpoint = import.meta.env.VITE_ENDPOINT;
const login = async () => {
  try {
    const res = await axios.post(`${endpoint}/user/login`, atribut.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.data.status === 204) {
      const pesan = res.data.message;
      toast.error(pesan, {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: "bounce",
      });
    } else {
      const data = res.data.data;
      const token = data[0].token;
      const role = data[0].ms_role_id;
      const id = data[0].id;
      console.log(data);

      toast.success("berhasil masuk bjir", {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "light",
        transition: "bounce",
      });

      setTimeout(() => {
        if (role === "user") {
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("role", role);
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          router.push({
            name: "home",
          });
        } else {
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("role", role);
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          router.push({
            name: "admin",
          });
        }
      }, 800);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section
    class="flex bg-white justify-center items-center min-h-screen dark:bg-gray-700"
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
        <form v-on:submit.prevent="login()">
          <h1
            class="text-2xl font-semibold text-gray-800 mt-5 mb-2 md:text-3xl lg:text-4xl 2xl:text-5xl 2xl:mb-4 dark:text-white"
          >
            Welcome Back 👋
          </h1>
          <p
            class="text-sm font-semibold text-gray-700 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-1 dark:text-white"
          >
            Lets get your fresh bread Today
          </p>
          <p
            class="text-sm font-semibold text-gray-700 mb-3 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-6 dark:text-white"
          >
            Sign in to start shopping
          </p>
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
          <div class="flex flex-col mb-6 2xl:mb-8">
            <label
              for=""
              class="text-sm font-semibold text-gray-800 mb-1 md:text-base lg:text-lg 2xl:text-xl 2xl:mb-2 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              placeholder="At least 8 Characters"
              class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium 2xl:p-3 placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-lg focus:outline-none md:text-base lg:text-lg 2xl:text-xl dark:bg-gray-600 dark:border-gray-800 dark:text-gray-300"
              v-model="atribut.password"
            />
          </div>
          <button
            class="bg-beige w-full rounded-xl text-white font-medium p-2 mb-6 md:text-lg lg:text-xl lg:p-3 2xl:text-xl"
            type="submit"
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
            class="w-full text-center text-sm text-gray-800 md:text-base lg:text-lg 2xl:text-xl dark:text-white"
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
