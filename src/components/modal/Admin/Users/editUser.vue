<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  showEdit: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
  },
  fetchUsers: {
    type: Function,
  },
});

const endpoint = import.meta.env.VITE_ENDPOINT;

const token = localStorage.getItem("token");
const user = ref({});

const emit = defineEmits(["update:showEdit"]);

const toggleShow = () => {
  emit("update:showEdit", !props.showEdit);
};

const editUser = async () => {
  try {
    await axios.post(
      `${endpoint}/user/update`,
      {
        id: props.userId,
        fullname: user.value.fullname,
        email: user.value.email,
        alamat: user.value.alamat,
        phone: user.value.phone,
        ms_role_id: user.value.ms_role_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    toast.success("Success Edit User", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    emit("update:showEdit", !props.showEdit);
    props.fetchUsers();
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/details_by_id/${props.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    user.value = res.data.data[0];
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getDetail();
});
</script>

<template>
  <div
    class="fixed z-50 top-0 w-full flex justify-center items-center h-screen bg-black bg-opacity-50 backdrop-blur-[2px]"
  >
    <div
      class="w-1/3 bg-white rounded-lg p-6 shadow-lg relative dark:bg-gray-700"
    >
      <button
        class="absolute top-4 right-4 h-8 w-8 text-center bg-gray-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-gray-500/80"
        v-on:click="toggleShow"
      >
        x
      </button>
      <h1
        class="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-5 mb-5 dark:text-white"
      >
        Edit User
      </h1>
      <form v-on:submit.prevent="editUser">
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg dark:text-white"
            >FullName</label
          >
          <input
            type="text"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder:text-gray-300 dark:text-gray-300 dark:border-gray-800"
            v-model="user.fullname"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg dark:text-white"
            >Email</label
          >
          <input
            type="text"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder:text-gray-300 dark:text-gray-300 dark:border-gray-800"
            v-model="user.email"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg dark:text-white"
            >Phone</label
          >
          <input
            type="text"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder:text-gray-300 dark:text-gray-300 dark:border-gray-800"
            v-model="user.phone"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg dark:text-white"
            >Adress</label
          >
          <input
            type="text"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder:text-gray-300 dark:text-gray-300 dark:border-gray-800"
            v-model="user.alamat"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg dark:text-white"
            >Role</label
          >
          <input
            type="text"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder:text-gray-300 dark:text-gray-300 dark:border-gray-800"
            v-model="user.ms_role_id"
          />
        </div>
        <div class="flex justify-between">
          <button
            class="py-2 px-5 bg-red-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-red-500/80"
            v-on:click="toggleShow"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="py-2 px-5 bg-yellow-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-yellow-500/80"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
