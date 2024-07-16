<script setup>
import { defineProps, defineEmits, ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  fetchProducts: {
    type: Function,
  },
});

const image = ref();

const endpoint = import.meta.env.VITE_ENDPOINT;

const newProducts = ref({
  name: "",
  description: "",
  price: 0,
  stock: 0,
});

const emit = defineEmits(["update:show"]);
const token = localStorage.getItem("token");

const toggleShow = () => {
  emit("update:show", !props.show);
};

const getFile = (e) => {
  image.value = e.target.files[0];
  console.log(image.value);
};

const addProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", newProducts.value.name);
    formData.append("description", newProducts.value.description);
    formData.append("price", newProducts.value.price);
    formData.append("stock", newProducts.value.stock);
    formData.append("product_picture", image.value);

    await axios.post(`${endpoint}/products/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`,
      },
    });
    toast.success("Success Add Product", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    emit("update:show", !props.show);
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div
    class="fixed z-50 top-0 w-full flex justify-center items-center h-screen bg-black bg-opacity-50 backdrop-blur-[2px]"
  >
    <div class="w-1/3 bg-white rounded-lg p-6 shadow-lg relative">
      <button
        class="absolute top-4 right-4 h-8 w-8 text-center bg-gray-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-gray-500/80"
        v-on:click="toggleShow"
      >
        x
      </button>
      <h1
        class="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-5 mb-5"
      >
        Add Product
      </h1>
      <form v-on:submit.prevent="addProduct">
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg"
            >Name</label
          >
          <input
            type="text"
            placeholder="GoodCake"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            v-model="newProducts.name"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg"
            >Description</label
          >
          <input
            type="text"
            placeholder="Cake With Cholocate"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            v-model="newProducts.description"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg"
            >Price</label
          >
          <input
            type="number"
            placeholder="10000"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            v-model="newProducts.price"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg"
            >Stock</label
          >
          <input
            type="number"
            placeholder="minimum 1 piece"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            v-model="newProducts.stock"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label
            for=""
            class="text-sm font-semibold text-gray-800 pl-1 mb-1 md:text-base lg:text-lg"
            >Image</label
          >
          <input
            type="file"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 md:text-base lg:text-lg placeholder:font-medium placeholder:text-sm 2xl:placeholder:text-lg placeholder:text-gray-400 focus:outline-none"
            v-on:change="getFile"
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
            class="py-2 px-5 bg-green-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-green-500/80"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
