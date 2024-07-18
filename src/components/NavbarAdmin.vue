<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import axios from "axios";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const id = localStorage.getItem("id");
const token = localStorage.getItem("token");
const endpoint = import.meta.env.VITE_ENDPOINT;
const user = ref({});

const getAdmin = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/details_by_id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    user.value = res.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getAdmin();
});
</script>
<template>
  <div
    class="absolute top-0 left-0 w-full pl-80 flex items-center bg-gray-100 z-4 py-1 dark:bg-gray-600"
  >
    <div class="flex items-center justify-between w-full py-5 px-8">
      <div>
        <h1 class="font-medium text-gray-600 dark:text-white">good morning,</h1>
        <h1 class="text-2xl font-medium text-gray-800 dark:text-white">
          {{ user.fullname }}
        </h1>
      </div>
      <div class="flex justify-end gap-5 w-1/6">
        <button
          v-on:click="toggleDark()"
          class="text-xl w-1/5 text-gray-700 transition ease-in-out duration-200 hover:text-sandDollar dark:text-white dark:hover:text-sandDollar"
        >
          <font-awesome-icon
            :icon="`fa-solid fa-${isDark ? 'sun' : 'moon'}`"
          ></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>
