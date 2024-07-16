<script setup>
import { defineProps, defineEmits } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps({
  showDelete: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: String,
  },
  fetchProducts: {
    type: Function,
  },
});

const endpoint = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem("token");

const emit = defineEmits(["update:showDelete"]);

const toggleShow = () => {
  emit("update:showDelete", !props.showDelete);
};

const deleteProduct = async () => {
  try {
    await axios.delete(`${endpoint}/products/delete/${props.productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    toast.success("Success Delete Product", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    emit("update:showDelete", !props.showDelete);
    props.fetchProducts();
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
        Delete Product
      </h1>
      <div class="flex flex-col items-center mb-5">
        <div>
          <img
            src="../../../../assets/images/notifdelete.png"
            alt="gambar delete"
          />
        </div>
        <p class="text-lg font-medium text-gray-800">
          are you sure want to delete ?
        </p>
      </div>
      <div class="flex justify-between">
        <button
          class="py-2 px-5 bg-red-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-red-500/80"
          v-on:click="toggleShow"
        >
          No
        </button>
        <button
          type="submit"
          class="py-2 px-5 bg-green-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-green-500/80"
          v-on:click="deleteProduct"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
