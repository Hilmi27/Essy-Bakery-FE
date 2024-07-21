<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const endpoint = import.meta.env.VITE_ENDPOINT;
const route = useRoute();
const router = useRouter();
const product = ref({});
const image = ref("");
const quantity = ref();
const busy = ref(false);
const token = localStorage.getItem("token");
const comment = ref("");
const fetchDetailProduct = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/products/detail/${route.params.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    product.value = res.data.data;
    image.value = res.data.data.product_picture;
  } catch (error) {
    console.log(error);
  }
};

const order = async () => {
  if (token === null) {
    toast.error(`Please Login!`, {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    setTimeout(() => {
      router.push("/login");
    }, 800);
    return;
  }

  if (
    quantity.value < 1 ||
    quantity.value > product.value.stock ||
    !quantity.value
  ) {
    toast.error(`Quantity Cant ${quantity.value}`, {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "auto",
      transition: "bounce",
    });
    return;
  }
  try {
    busy.value = !busy.value;
    await axios.post(
      `${endpoint}/carts/add`,
      {
        product_id: route.params.id,
        quantity: quantity.value,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    toast.success(`Added To Cart!`, {
      autoClose: 4000,
      position: "top-center",
      transition: "bounce",
      theme: "light",
    });
    setTimeout(() => {
      router.push("/cart");
    }, 500);
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

// const getImage = (imageName) => {
//   return new URL(`../assets/images/${imageName}`, import.meta.url).href;
// };

onMounted(() => {
  fetchDetailProduct();
});
</script>

<template>
  <section
    class="flex flex-col justify-center items-center min-h-screen lg:pt-30 pb-7"
  >
    <div
      class="container flex flex-col items-center bg-white rounded-2xl shadow-lg p-10 w-full lg:w-3/4 lg:flex-row dark:bg-gray-800"
    >
      <div
        class="flex justify-center items-end w-full h-96 mb-6 lg:w-1/2 lg:mb-0 lg:items-start"
      >
        <img
          :src="endpoint + image"
          alt="kok ga keluar bjir"
          class="rounded-xl shadow-lg h-3/4 lg:h-full"
        />
      </div>
      <div class="flex flex-col items-start gap-4 w-full h-96 lg:w-1/2">
        <h1
          class="text-2xl font-bold text-gray-800 border-b-2 border-gray-800 w-full text-center pb-3 lg:text-3xl lg:w-3/4 lg:text-start dark:text-white dark:border-gray-400"
        >
          {{ product.name }}
        </h1>
        <div class="flex justify-between w-full lg:w-3/4 mb-0 lg:mb-1">
          <p
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-1 dark:text-white"
          >
            Price : {{ rupiah(product.price) }}
          </p>
          <p
            class="text-lg lg:text-xl font-semibold text-gray-800 mb-1 dark:text-white"
          >
            Stock : {{ product.stock }}
          </p>
        </div>
        <div class="flex flex-col w-full lg:w-3/4">
          <label
            for=""
            class="text-sm font-medium text-gray-800 mb-1 md:text-base lg:text-lg dark:text-white"
            >Quantity</label
          >
          <input
            type="number"
            placeholder="minimum 1 piece"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 mb-2 border-gray-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-base focus:outline-none md:text-base dark:bg-gray-600 dark:border-gray-800 dark:text-gray-200"
            v-model="quantity"
          />
        </div>
        <RouterLink>
          <button
            class="px-5 md:px-11 py-2 text-xs md:text-sm rounded-xl bg-sandDollar font-semibold text-gray-100 hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
            v-on:click="order()"
            v-if="product.stock > 0 && busy === false"
          >
            add to cart
          </button>
          <button
            class="px-5 md:px-20 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-gray-100 transition flex justify-center items-center text-center ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
            v-on:click="order()"
            v-else-if="busy === true"
            disabled
          >
            <div
              class="animate-spin h-7 w-7 border-4 border-t-transparent border-gray-600 rounded-full"
            >
              <!-- ... -->
            </div>
          </button>
          <button
            class="px-5 md:px-11 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-gray-100 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
            v-on:click="order()"
            v-else
          >
            add to cart
          </button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
