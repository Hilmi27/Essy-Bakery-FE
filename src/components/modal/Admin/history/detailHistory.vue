<script setup>
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  showDetail: {
    type: Boolean,
  },
  historyDetail: {
    type: Object,
  },
});

const endpoint = import.meta.env.VITE_ENDPOINT;

const historyDetails = ref(props.historyDetail);

const emit = defineEmits(["update:showDetail"]);

const toggleShow = () => {
  emit("update:showDetail", !props.showDetail);
};
</script>
<template>
  <div
    class="fixed z-50 top-0 w-full flex justify-center items-center h-screen bg-black bg-opacity-50 backdrop-blur-[2px]"
  >
    <div
      class="w-2/3 bg-white rounded-lg p-6 shadow-lg relative dark:bg-gray-700"
    >
      <button
        class="absolute top-5 right-5 h-8 w-8 text-center bg-gray-500 text-lg text-white rounded-lg transition ease-in-out duration-300 hover:bg-gray-500/80"
        v-on:click="toggleShow"
      >
        x
      </button>
      <h1
        class="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-5 mb-5 dark:text-white"
      >
        List Item
      </h1>
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
                Image
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Price
              </th>
              <th
                class="text-start border-b border-gray-300 p-3 text-gray-800 dark:text-white dark:border-gray-800"
              >
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(historyDetail, index) in historyDetails"
              class="border-b border-gray-300 dark:border-gray-800"
            >
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ index + 1 }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ historyDetail.name }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                <img
                  :src="endpoint + historyDetail.product_picture"
                  alt=" gambar detail"
                  class="w-20 rounded-xl"
                />
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ historyDetail.price }}
              </td>
              <td class="text-start p-3 text-gray-800 dark:text-white">
                {{ historyDetail.quantity }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
