<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
// import ModalEditUser from "../../components/modal/Admin/Users/editUser.vue";
// import ModalDeleteUser from "../../components/modal/Admin/Users/deleteUser.vue";
import ModalDetailHistory from "../../components/modal/Admin/history/detailHistory.vue";

const endpoint = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem("token");
const histories = ref([]);
const historyDetail = ref([]);
const showDetail = ref(false);
const search = ref("");

const id = localStorage.getItem("id");
const fetchHistories = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/transaction/list`,
      {
        user_id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    histories.value = res.data.data;
    console.log(histories.value);
  } catch (error) {
    console.log(error);
  }
};

// const filteredUsers = async () => {
//   try {
//     const res = await axios.post(
//       `${endpoint}/user/list`,
//       {
//         fullname: search.value,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `bearer ${token}`,
//         },
//       }
//     );
//     users.value = res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const openDetail = (id) => {
  showDetail.value = true;

  const detail = histories.value.find(
    (history) => history.transaction_id === id
  );

  historyDetail.value = detail.transaction_detail;
  console.log(historyDetail.value);
};

onMounted(() => {
  fetchHistories();
});
</script>

<template>
  <section class="flex justify-center min-h-screen pt-32 pb-7">
    <div class="flex container">
      <div class="w-full flex flex-col px-8 py-5">
        <div class="w-full flex justify-between mb-6 h-11">
          <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
            History
          </h1>
          <div class="flex items-center justify-between">
            <div class="flex w-full">
              <input
                type="text"
                class="w-full text-gray-600 font-semibold h-12 rounded-s-xl p-5 flex bg-gray-200 outline-none dark:bg-gray-600 placeholder:text-gray-600 dark:placeholder:text-gray-300 dark:text-gray-300"
                placeholder="Search..."
              />
              <span
                class="flex items-center text-xl rounded-e-xl px-4 bg-gray-200 text-gray-500 lg:w-10 dark:bg-gray-600 dark:text-gray-300 lg:px-0"
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
                  Transaction Code
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
                  class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800 pl-8"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(history, index) in histories"
                class="border-b border-gray-300 dark:border-gray-800"
              >
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ index + 1 }}
                </td>
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ history.transaction_code }}
                </td>
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ history.fullname }}
                </td>
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ history.email }}
                </td>
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ history.phone }}
                </td>
                <td class="text-start p-3 text-gray-800 dark:text-white">
                  {{ history.alamat }}
                </td>
                <td class="text-center p-3 text-gray-800 dark:text-white">
                  <button
                    class="py-2 px-3 bg-gray-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-gray-500/80"
                    v-on:click="openDetail(history.transaction_id)"
                  >
                    <font-awesome-icon
                      :icon="'fa-solid fa-magnifying-glass'"
                    ></font-awesome-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <!-- <ModalEditUser
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
  ></ModalDeleteUser> -->
  <ModalDetailHistory
    v-model:showDetail="showDetail"
    v-if="showDetail"
    :historyDetail="historyDetail"
  ></ModalDetailHistory>
</template>
