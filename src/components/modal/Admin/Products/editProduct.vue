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
  productId: {
    type: String,
  },
  fetchProducts: {
    type: Function,
  },
});

const image = ref();
const endpoint = import.meta.env.VITE_ENDPOINT;

const token = localStorage.getItem("token");
const product = ref({});

const emit = defineEmits(["update:showEdit"]);

const toggleShow = () => {
  emit("update:showEdit", !props.showEdit);
};

const getFile = (e) => {
  image.value = e.target.files[0];
  console.log(image.value);
};

const editProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("name", product.value.name);
    formData.append("description", product.value.description);
    formData.append("price", product.value.price);
    formData.append("stock", product.value.stock);
    formData.append("product_picture", image.value);

    await axios.put(
      `${endpoint}/products/update/${props.productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      }
    );
    toast.success("Success Edit Product", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    emit("update:showEdit", !props.showEdit);
    props.fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/products/detail/${props.productId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InN1cGVyYWRtaW4iLCJmdWxsbmFtZSI6bnVsbCwiZW1haWwiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImFsYW1hdCI6bnVsbCwicGhvbmUiOm51bGwsInBhc3N3b3JkIjoiJDJhJDEwJFJwVFVGR3A0U1dhWjBYUVI2R3hmai5qZ1FjSzVVejV5b3BWVHNSOGoucFhoOUs4VEdEcEM2IiwiaWF0IjoxNzE5ODEwODI2fQ.hTX89qTJ2mvA3Gc-2pSwkzNE5kd3CA4LFM7A9FtkVk0`,
        },
      }
    );
    product.value = res.data.data;
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
        edit product
      </h1>
      <form v-on:submit.prevent="editProduct">
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
            v-model="product.name"
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
            v-model="product.description"
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
            v-model="product.price"
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
            v-model="product.stock"
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
            class="py-2 px-5 bg-yellow-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-yellow-500/80"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
