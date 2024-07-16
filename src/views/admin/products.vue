<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import ModalAddProduct from "../../components/modal/Admin/Products/addProduct.vue";
import ModalEditProduct from "../../components/modal/Admin/Products/editProduct.vue";
import ModalDeleteProduct from "../../components/modal/Admin/Products/deleteProduct.vue";

const endpoint = import.meta.env.VITE_ENDPOINT;
const products = ref([]);
const show = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);
const productId = ref();
const search = ref("");
const fetchProducts = async () => {
  try {
    const res = await axios.get(`${endpoint}/products/list`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    products.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const filteredProducts = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/products/list/?name=${search.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    products.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const openEdit = (id) => {
  showEdit.value = true;
  productId.value = id;
};

const openDelete = (id) => {
  showDelete.value = true;
  productId.value = id;
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div
    class="pl-80 flex pt-24 h-screen bg-gray-100 overflow-y-scroll dark:bg-gray-600"
  >
    <div class="w-full flex flex-col px-8 py-5">
      <div class="w-full flex justify-between mb-6 h-11">
        <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
          Products
        </h1>
        <div class="flex items-center justify-between">
          <div class="flex w-[75%]">
            <input
              type="text"
              class="w-full text-gray-600 font-semibold h-12 rounded-s-xl p-5 flex bg-gray-200 outline-none dark:bg-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-300 dark:text-gray-300"
              placeholder="Search..."
              v-model="search"
              v-on:keyup="filteredProducts()"
            />
            <span
              class="flex items-center text-xl rounded-e-xl px-4 bg-gray-200 text-gray-500 lg:w-10 dark:bg-gray-700 dark:text-gray-300 lg:px-0"
            >
              <font-awesome-icon
                :icon="`fa-solid fa-search`"
              ></font-awesome-icon>
            </span>
          </div>
          <button
            class="font-medium text-white bg-green-500 py-2 px-4 rounded-lg h-11 transition ease-in-out duration-300 hover:bg-green-500/80 hover:text-white/80"
            v-on:click="show = true"
          >
            add
          </button>
        </div>
      </div>
      <div class="rounded-lg border border-gray-300 dark:border-gray-800">
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                No
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Name
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Description
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Price
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Stock
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Image
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 pl-8 dark:text-white dark:border-gray-800"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              class="border-b border-gray-300 dark:border-gray-800"
            >
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ index + 1 }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.name }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.description }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.price }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.stock }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                <img
                  :src="endpoint + product.product_picture"
                  alt="kok ga keluar bjir"
                  class="w-20 h-20 rounded-lg"
                />
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                <button
                  class="py-2 px-3 bg-yellow-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-yellow-500/80"
                  v-on:click="openEdit(product.id)"
                >
                  <font-awesome-icon
                    :icon="'fa-regular fa-pen-to-square'"
                  ></font-awesome-icon>
                </button>
                <button
                  class="py-2 px-3 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
                  v-on:click="openDelete(product.id)"
                >
                  <font-awesome-icon
                    :icon="'fa-regular fa-trash-can'"
                  ></font-awesome-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <ModalAddProduct
    v-model:show="show"
    :fetchProducts="fetchProducts()"
    v-if="show"
  ></ModalAddProduct>
  <ModalEditProduct
    v-model:showEdit="showEdit"
    :productId="productId"
    :fetchProducts="fetchProducts()"
    v-if="showEdit"
  ></ModalEditProduct>
  <ModalDeleteProduct
    v-model:showDelete="showDelete"
    :productId="productId"
    :fetchProducts="fetchProducts()"
    v-if="showDelete"
  ></ModalDeleteProduct>
</template>
