<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ModalDeleteCart from "../../components/modal/User/deleteProductCart.vue";

const endpoint = import.meta.env.VITE_ENDPOINT;
const carts = ref([]);
const selectAll = ref(false);
const token = localStorage.getItem("token");
const showModal = ref(false);
const productId = ref();

const fetchCart = async () => {
  try {
    const res = await axios.get(`${endpoint}/carts/list`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    carts.value = res.data.data;
    console.log(carts.value);
  } catch (error) {
    console.log(error);
  }
};

const product = {
  id: Math.random() * 100000,
  // name: "Brownies bjir",
  // price: totalPrice.value,
  // quantity: 1,
  // description:
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit officiis quis praesentium velit dolores, adipisci tempore cum atque fuga ratione unde quidem voluptas nesciunt laboriosam aspernatur ducimus asperiores pariatur.",
};

const sandBox = () => {
  const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
  const clientKey = "SB-Mid-client-YQ2tO6H7qxJtzQxU";

  const script = document.createElement("script");
  script.src = snapScript;
  script.setAttribute("data-client-key", clientKey);
  script.async = true;

  document.body.appendChild(script);
};

const checkout = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/transaction/add`,
      // {
      //   id: product.id,
      //   name: nameProduct.value,
      //   price: totalPrice.value,
      //   quantity: product.quantity,
      // }
      {
        products: carts.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );

    // const transactionCode = res.data.data.transaction.transaction_code;
    // const code = btoa("SB-Mid-server-s3hTwds5JCKZJstD4VdZRtAu" + ":");
    // console.log(btoa("SB-Mid-server-s3hTwds5JCKZJstD4VdZRtAu" + ":"));
    // setTimeout(async () => {
    //   const res2 = await axios.get(
    //     `https://api.sandbox.midtrans.com/v2/${transactionCode}/status`,
    //     {
    //       headers: {
    //         Accept: "application / json",
    //         "Content-Type": "application / json",
    //         Authorization: `Basic ${code}`,
    //       },
    //     }
    //   );
    //   console.log(res2);
    // }, 5000);
    window.snap.pay(res.data.data.token.token);
    fetchCart();
  } catch (error) {
    console.log(error);
  }
};
const toggleSelectAll = () => {
  // toast.success("waw ke check semua bjir", {
  //   position: "top-center",
  //   autoClose: 5000,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   theme: "light",
  //   transition: "bounce",
  // });
  selectAll.value = !selectAll.value;
  carts.value.forEach((item) => {
    item.is_checked = selectAll.value;
  });
};

const toggleItemChecked = (index) => {
  carts.value[index].is_checked = !carts.value[index].is_checked;
  // totalItem.value = carts.value
  //   .filter((e) => e.is_checked)
  //   .reduce((a, b) => a + b.quantity, 0);
  // nameProduct.value = carts.value
  //   .filter((e) => e.is_checked)
  //   .map((e) => e.name);
  // console.log(nameProduct.value);
};

const showModalDelete = async (id) => {
  showModal.value = true;
  productId.value = id;
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

watch(
  carts,
  (newCarts) => {
    selectAll.value = newCarts.every((item) => item.is_checked);
  },
  { deep: true }
);

onMounted(() => {
  fetchCart();
  sandBox();
});
</script>

<template>
  <section class="flex justify-center items-center min-h-screen pt-20">
    <div class="container flex flex-col justify-center p-8">
      <h1
        class="text-4xl lg:text-6xl font-semibold mb-10 text-gray-800 dark:text-white"
      >
        Shopping Cart
      </h1>
      <div class="flex items-center mb-3">
        <label
          class="relative flex items-center p-3 rounded-full cursor-pointer ml-2"
          htmlFor="checkbox"
        >
          <input
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 dark:checked:border-gray-300 dark:checked:bg-gray-300"
            id="checkbox"
            v-model="selectAll"
            v-on:click="toggleSelectAll"
          />
          <span
            class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 dark:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <h3
          class="text-xl ml-1 pt-0.5 font-semibold text-gray-800 dark:text-white"
        >
          Select All
        </h3>
      </div>
      <div class="flex flex-col w-full gap-5 lg:flex-row">
        <div class="flex flex-col w-full lg:w-3/4 gap-3">
          <div
            class="flex items-center px-2 py-4 justify-between bg-white shadow-lg rounded-xl dark:bg-gray-600"
            v-for="(cart, index) in carts"
          >
            <label
              class="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10 dark:checked:border-gray-300 dark:checked:bg-gray-300"
                id="checkbox"
                :checked="cart.is_checked"
                v-on:change="toggleItemChecked(index)"
              />
              <span
                class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 dark:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <div class="flex items-center justify-between w-full gap-10">
              <img
                :src="endpoint + cart.product_picture"
                alt="kok ga keluar bjir"
                class="w-28 rounded-xl ml-5"
              />
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ cart.name }}
              </h3>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ cart.quantity }}
              </h3>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ rupiah(cart.price) }}
              </h3>
              <button
                class="py-3 px-4 bg-red-500 text-lg text-white rounded-lg mr-5 transition ease-in-out duration-300 hover:bg-red-500/80"
                v-on:click="showModalDelete(cart.id)"
              >
                <font-awesome-icon
                  :icon="'fa-regular fa-trash-can'"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full lg:w-1/4 gap-5">
          <div
            class="flex flex-col items-center justify-center shadow-lg p-8 gap-1 rounded-lg dark:bg-gray-600"
          >
            <div
              class="flex justify-between w-full"
              v-for="cart in carts.filter((e) => e.is_checked)"
            >
              <p class="font-medium text-gray-800 dark:text-white">
                {{ cart.name }}
              </p>
              <p class="font-medium text-gray-800 dark:text-white">
                x{{ cart.quantity }}
              </p>
            </div>

            <div class="border-t border-gray-300 w-full my-5"></div>
            <div class="flex justify-between w-full">
              <p class="font-medium text-gray-800 dark:text-white">Total :</p>
              <p class="font-medium text-gray-800 dark:text-white">
                {{
                  rupiah(
                    carts
                      .filter((e) => e.is_checked)
                      .reduce((a, b) => a + b.price * b.quantity, 0)
                  )
                }}
              </p>
            </div>
          </div>
          <button
            class="w-full bg-beige text-white p-4 text-lg rounded-xl font-semibold transition ease-in-out duration-300 hover:bg-beige/80"
            v-on:click="checkout()"
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
    <ModalDeleteCart
      :productId="productId"
      :fetchCart="fetchCart"
      v-model:showModal="showModal"
      v-if="showModal"
    ></ModalDeleteCart>
  </section>
</template>
