<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = () => {
  localStorage.setItem("authenticated", false);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");

  toast.success("Success Logout", {
    position: "top-center",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "auto",
    transition: "bounce",
  });

  setTimeout(() => {
    router.push("/");
  }, 800);
};
</script>
<template>
  <aside
    class="w-1/6 flex flex-col items-center justify-between px-7 py-1 min-h-screen absolute left-0 bg-white border-r-2 border-gray-200 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:text-white"
  >
    <RouterLink
      class="flex justify-center w-full p-5 border-b-2 border-gray-200 dark:border-gray-800"
      to="/admin"
      ><img src="../assets/images/logo.png" alt="" class="w-20"
    /></RouterLink>
    <div class="w-full" style="height: 700px">
      <ul class="w-full flex flex-col gap-2 items-center justify-center">
        <RouterLink
          class="text-gray-500 text-lg font-medium w-full p-4 rounded-2xl transition ease-in-out duration-200 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
          to="/admin"
        >
          <li>
            <font-awesome-icon
              class="mr-1"
              :icon="'fa-solid fa-house'"
            ></font-awesome-icon>
            Dashboard
          </li>
        </RouterLink>
        <RouterLink
          class="text-gray-500 text-lg font-medium w-full p-4 rounded-2xl transition ease-in-out duration-200 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
          to="/admin/products"
        >
          <li>
            <font-awesome-icon
              class="mr-1"
              :icon="'fa-solid fa-shopping-bag'"
            ></font-awesome-icon>
            Products
          </li>
        </RouterLink>
        <RouterLink
          class="text-gray-500 text-lg font-medium w-full p-4 rounded-2xl transition ease-in-out duration-200 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
          to="/admin/users"
        >
          <li>
            <font-awesome-icon
              class="mr-1"
              :icon="'fa-solid fa-user'"
            ></font-awesome-icon>
            User
          </li>
        </RouterLink>
        <RouterLink
          class="text-gray-500 text-lg font-medium w-full p-4 rounded-2xl transition ease-in-out duration-200 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
          to="/admin/histories"
        >
          <li>
            <font-awesome-icon
              class="mr-1"
              :icon="'fa-solid fa-book'"
            ></font-awesome-icon>
            History
          </li>
        </RouterLink>
      </ul>
    </div>

    <button
      class="text-xl font-medium w-full text-center p-5 text-gray-700 border-t-2 border-gray-200 hover:text-gray-700/70 transition ease-in-out duration-300 dark:text-white dark:hover:text-white/70 dark:border-gray-800"
      v-on:click="handleLogout()"
    >
      <font-awesome-icon
        class="mr-1"
        :icon="'fa-solid fa-arrow-right-from-bracket'"
      ></font-awesome-icon>
      Logout
    </button>
  </aside>
</template>
