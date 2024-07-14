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
const quantity = ref();
const busy = ref(false);
const token = localStorage.getItem("token");
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
  } catch (error) {
    console.log(error);
  }
};

const order = async () => {
  if (token === null) {
    toast.error(`login dulu bjir`, {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
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
      autoClose: 4000,
      position: "top-center",
      transition: "bounce",
      theme: "light",
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
    toast.success(`added to cart!`, {
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

onMounted(() => {
  fetchDetailProduct();
});
</script>

<template>
  <section class="flex justify-center items-center min-h-screen pt-30 pb-7">
    <div
      class="container flex items-center bg-white rounded-2xl shadow-lg p-10 w-3/4"
    >
      <div class="flex justify-center w-1/2 h-96">
        <img
          src="../../assets/images/herosm5.jpeg"
          alt=""
          class="rounded-xl shadow-lg w-3/4"
        />
      </div>
      <div class="flex flex-col items-start gap-4 w-1/2 h-96">
        <h1
          class="text-3xl font-bold text-slate-800 border-b border-slate-800 w-3/4 pb-3"
        >
          {{ product.name }}
        </h1>
        <div class="flex justify-between w-3/4 mb-1">
          <p class="text-xl font-semibold text-slate-800 mb-1">
            Price : Rp. {{ product.price }}
          </p>
          <p class="text-xl font-semibold text-slate-800 mb-1">
            Stock : {{ product.stock }}
          </p>
        </div>
        <div class="flex flex-col w-3/4 mb-2">
          <label
            for=""
            class="text-sm font-medium text-gray-800 mb-1 md:text-base lg:text-lg 2xl:mb-2"
            >Quantity</label
          >
          <input
            type="number"
            placeholder="minimum 1 piece"
            class="text-sm text-gray-800 font-medium p-2 rounded-lg bg-gray-100 border-2 border-gray-300 placeholder:font-medium placeholder:text-sm placeholder:text-gray-400 2xl:placeholder:text-base focus:outline-none md:text-base"
            v-model="quantity"
          />
        </div>
        <RouterLink>
          <button
            class="px-5 md:px-11 py-2 text-xs md:text-sm rounded-xl bg-sandDollar font-semibold text-slate-100 hover:bg-sandDollar/80 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
            v-on:click="order()"
            v-if="product.stock > 0 && busy === false"
          >
            add to cart
          </button>
          <button
            class="px-5 md:px-20 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-slate-100 transition flex justify-center items-center text-center ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
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
            class="px-5 md:px-11 py-2 text-xs md:text-sm rounded-xl bg-sandDollar/70 font-semibold text-slate-100 transition ease-in-out duration-200 focus:ring-2 focus:outline-none focus:ring-sandDollar/50 lg:text-base"
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
