<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
// import ModalAddProduct from "../../components/modal/addProduct.vue";
// import ModalEditProduct from "../../components/modal/Admin/Products/editProduct.vue";
// import ModalDeleteProduct from "../../components/modal/Admin/Products/deleteProduct.vue";

const endpoint = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem("token");
const users = ref([]);
const show = ref(false);
const showEdit = ref(false);
const showDelete = ref(false);
const productId = ref();
const search = ref("");
const fetchUsers = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/user/list`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    console.log(res.data.data);
    users.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// const filteredProducts = async () => {
//   try {
//     const res = await axios.get(
//       `${endpoint}/products/list/?name=${search.value}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     products.value = res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const openEdit = (id) => {
  showEdit.value = true;
  productId.value = id;
};

const openDelete = (id) => {
  showDelete.value = true;
  productId.value = id;
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="pl-80 flex pt-24 h-screen bg-gray-100 overflow-y-scroll">
    <div class="w-full flex flex-col px-8 py-5">
      <div class="w-full flex justify-between mb-6 h-11">
        <h1 class="text-4xl font-semibold text-gray-800">User</h1>
        <div class="flex items-center justify-between">
          <div class="flex w-full">
            <input
              type="text"
              class="w-full text-slate-600 font-semibold h-12 rounded-s-xl p-5 flex bg-slate-200 outline-none dark:bg-slate-600 placeholder:text-slate-500 dark:placeholder:text-slate-300 dark:text-slate-300"
              placeholder="Search..."
            />
            <span
              class="flex items-center text-xl rounded-e-xl px-4 bg-slate-200 text-slate-500 lg:w-10 dark:bg-slate-600 dark:text-slate-300 lg:px-0"
            >
              <font-awesome-icon
                :icon="`fa-solid fa-search`"
              ></font-awesome-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="rounded-lg border border-gray-300">
        <table class="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th class="text-start border-b border-gray-300 p-3 text-gray-800">
                No
              </th>
              <th class="text-start border-b border-gray-300 p-3 text-gray-800">
                FullName
              </th>
              <th class="text-start border-b border-gray-300 p-3 text-gray-800">
                Email
              </th>
              <th class="text-start border-b border-gray-300 p-3 text-gray-800">
                Phone
              </th>
              <th class="text-start border-b border-gray-300 p-3 text-gray-800">
                Address
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 pl-8"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" class="border-b border-gray-300">
              <td class="text-start p-3 text-gray-800">
                {{ index + 1 }}
              </td>
              <td class="text-start p-3 text-gray-800">{{ user.fullname }}</td>
              <td class="text-start p-3 text-gray-800">
                {{ user.email }}
              </td>
              <td class="text-start p-3 text-gray-800">{{ user.phone }}</td>
              <td class="text-start p-3 text-gray-800">{{ user.alamat }}</td>
              <td class="text-start p-3 text-gray-800">
                <button
                  class="py-2 px-3 bg-yellow-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-yellow-500/80"
                  v-on:click="openEdit(user.id)"
                >
                  <font-awesome-icon
                    :icon="'fa-regular fa-pen-to-square'"
                  ></font-awesome-icon>
                </button>
                <button
                  class="py-2 px-3 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
                  v-on:click="openDelete(user.id)"
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
  <!-- <ModalAddProduct
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
  ></ModalDeleteProduct> -->
</template>
