<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import ModalEditUser from "../../components/modal/Admin/Users/editUser.vue";
import ModalDeleteUser from "../../components/modal/Admin/Users/deleteUser.vue";

const endpoint = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem("token");
const users = ref([]);
const showEdit = ref(false);
const showDelete = ref(false);
const userId = ref();
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
    users.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const filteredUsers = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/user/list`,
      {
        fullname: search.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    users.value = res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const openEdit = (id) => {
  showEdit.value = true;
  userId.value = id;
};

const openDelete = (id) => {
  showDelete.value = true;
  userId.value = id;
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div
    class="pl-80 flex pt-24 h-screen bg-gray-100 overflow-y-scroll dark:bg-gray-600"
  >
    <div class="w-full flex flex-col px-8 py-5">
      <div class="w-full flex justify-between mb-6 h-11">
        <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
          User
        </h1>
        <div class="flex items-center justify-between">
          <div class="flex w-full">
            <input
              type="text"
              class="w-full text-gray-600 font-semibold h-12 rounded-s-xl p-5 flex bg-gray-200 outline-none dark:bg-gray-700 placeholder:text-gray-600 dark:placeholder:text-gray-300 dark:text-gray-300"
              placeholder="Search..."
              v-model="search"
              v-on:keyup="filteredUsers()"
            />
            <span
              class="flex items-center text-xl rounded-e-xl px-4 bg-gray-200 text-gray-500 lg:w-10 dark:bg-gray-700 dark:text-gray-300 lg:px-0"
            >
              <font-awesome-icon
                :icon="`fa-solid fa-search`"
              ></font-awesome-icon>
            </span>
          </div>
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
                FullName
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Email
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Phone
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Address
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Role
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800 pl-8"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in users"
              class="border-b border-gray-300 dark:border-gray-800"
            >
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ index + 1 }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ user.fullname }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ user.email }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ user.phone }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ user.alamat }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ user.ms_role_id }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                <button
                  class="py-2 px-3 bg-yellow-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-yellow-500/80"
                  v-on:click="openEdit(user.user_id)"
                >
                  <font-awesome-icon
                    :icon="'fa-regular fa-pen-to-square'"
                  ></font-awesome-icon>
                </button>
                <button
                  class="py-2 px-3 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
                  v-on:click="openDelete(user.user_id)"
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
  <ModalEditUser
    v-model:showEdit="showEdit"
    v-if="showEdit"
    :userId="userId"
    :fetchUsers="fetchUsers"
  ></ModalEditUser>
  <ModalDeleteUser
    v-model:showDelete="showDelete"
    v-if="showDelete"
    :userId="userId"
    :fetchUsers="fetchUsers"
  ></ModalDeleteUser>
</template>
