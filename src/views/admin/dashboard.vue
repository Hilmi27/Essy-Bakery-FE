<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const endpoint = import.meta.env.VITE_ENDPOINT;
const token = localStorage.getItem("token");

const histories = ref([]);
const allTransactionDetails = ref([]);
const totalPrice = ref(0);
const totalProduct = ref(0);
const sortedTransactionDetails = ref([]);
const fetchHistories = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/transaction/list`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    histories.value = res.data.data;
    allTransactionDetails.value = histories.value.flatMap(
      (e) => e.transaction_detail
    );
    console.log(allTransactionDetails.value);
    totalPrice.value = allTransactionDetails.value.reduce((sum, detail) => {
      return sum + detail.quantity * detail.price;
    }, 0);
    totalProduct.value = allTransactionDetails.value.reduce((sum, detail) => {
      return sum + detail.quantity;
    }, 0);
    console.log(totalProduct.value);
    console.log(totalPrice.value);
    sortedTransactionDetails.value = [...allTransactionDetails.value].sort(
      (a, b) => {
        return b.quantity - a.quantity; // Urutkan dari quantity terbesar ke terkecil
      }
    );
    console.log(sortedTransactionDetails.value);
  } catch (error) {
    console.log(error);
  }
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

onMounted(() => {
  fetchHistories();
});
</script>
<template>
  <div
    class="pl-80 flex flex-col pt-24 h-screen overflow-y-scroll bg-gray-100 dark:bg-gray-600"
  >
    <div class="flex flex-col gap-12 w-full px-8 py-5">
      <div
        class="w-full flex h-96 items-center overflow-hidden p-4 bg-sandDollar/70 rounded-2xl shadow-md dark:bg-gray-700"
      >
        <div class="w-1/2 flex justify-center">
          <div class="flex flex-col gap-5">
            <h1 class="text-4xl font-medium text-gray-800 dark:text-white">
              Here's everything that happen <br />
              in your sales 👋
            </h1>
            <h1 class="text-2xl font-medium text-gray-800 dark:text-white">
              {{ rupiah(totalPrice) }}
              <span class="text-lg text-gray-800 dark:text-white"
                >sales profit</span
              >
            </h1>
            <h1 class="text-xl font-medium text-gray-800 dark:text-white">
              {{ totalProduct }} Products are sold and its a big increase
            </h1>
          </div>
        </div>
        <div class="w-1/2 flex justify-center">
          <img
            src="../../assets/images/dashboardimage.png"
            alt=""
            class="w-2/3"
          />
        </div>
      </div>
      <div class="rounded-lg border border-gray-300 dark:border-gray-800">
        <h1
          class="text-3xl font-medium pl-3 mt-8 mb-8 pb-8 border-b border-gray-300 text-gray-800 dark:text-white dark:border-gray-800"
        >
          Top selling products
        </h1>
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
                Products
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Stock
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Price
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Sales
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Earnings
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in sortedTransactionDetails"
              class="border-b border-gray-300 dark:border-gray-800"
            >
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ index + 1 }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                <img
                  :src="endpoint + product.product_picture"
                  alt=""
                  class="w-20 h-20 rounded-lg"
                />
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.name }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.price }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.quantity }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ product.price * product.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
