<script setup>
import { ref } from "vue";

const image = ref("shopping1.png");

const handleClick = (e) => {
  const p1 = document.getElementById("p1");
  const p2 = document.getElementById("p2");
  const p3 = document.getElementById("p3");
  const p4 = document.getElementById("p4");

  const button1 = document.getElementById("button1");
  const button2 = document.getElementById("button2");
  const button3 = document.getElementById("button3");
  const button4 = document.getElementById("button4");

  if (e == 1) {
    image.value = "shopping1.png";
    p1.classList.add("li-active");
    p2.classList.remove("li-active");
    p3.classList.remove("li-active");
    p4.classList.remove("li-active");

    button1.classList.add("button-active");
    button2.classList.remove("button-active");
    button3.classList.remove("button-active");
    button4.classList.remove("button-active");
  } else if (e == 2) {
    image.value = "shopping2.png";
    p1.classList.remove("li-active");
    p2.classList.add("li-active");
    p3.classList.remove("li-active");
    p4.classList.remove("li-active");

    button1.classList.remove("button-active");
    button2.classList.add("button-active");
    button3.classList.remove("button-active");
    button4.classList.remove("button-active");
  } else if (e == 3) {
    image.value = "shopping1.png";
    p1.classList.remove("li-active");
    p2.classList.remove("li-active");
    p3.classList.add("li-active");
    p4.classList.remove("li-active");

    button1.classList.remove("button-active");
    button2.classList.remove("button-active");
    button3.classList.add("button-active");
    button4.classList.remove("button-active");
  } else {
    image.value = "shopping2.png";
    p1.classList.remove("li-active");
    p2.classList.remove("li-active");
    p3.classList.remove("li-active");
    p4.classList.add("li-active");

    button1.classList.remove("button-active");
    button2.classList.remove("button-active");
    button3.classList.remove("button-active");
    button4.classList.add("button-active");
  }
};
</script>

<template>
  <section class="flex flex-col justify-center items-center py-20">
    <div class="container flex flex-col items-center justify-center py-10">
      <div class="mb-10 lg:mb-20">
        <h1
          class="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl xl:mb-1 font-bold text-slate-700 text-center dark:text-white"
        >
          How To
        </h1>
        <h1
          class="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-slate-700 text-center dark:text-white"
        >
          Shopping
        </h1>
      </div>
      <div class="flex flex-col gap-1 lg:flex-row">
        <img
          :src="`src/assets/images/${image}`"
          alt="yauda si bjir"
          class="w-full lg:w-1/2 rounded-3xl mb-5 bg-slate-600/20 dark:bg-slate-600"
        />
        <div class="flex justify-center items-center w-full lg:w-1/2">
          <ul class="list-disc leading-relaxed flex flex-col gap-1">
            <li
              id="button1"
              @click="handleClick(1)"
              class="cursor-pointer hover:bg-slate-100 p-7 rounded-2xl button-active text-center lg:text-left dark:hover:bg-slate-600"
            >
              <h1
                class="text-xl md:text-2xl font-semibold text-slate-800/50 mb-2 dark:text-white/50"
              >
                01
              </h1>
              <p
                id="p1"
                class="text-lg md:text-xl font-semibold text-slate-800/50 dark:text-white/50 li-active"
              >
                pilihlah product yang ingin dibeli
              </p>
            </li>
            <li
              id="button2"
              @click="handleClick(2)"
              class="cursor-pointer hover:bg-slate-100 p-8 rounded-2xl text-center lg:text-left dark:hover:bg-slate-600"
            >
              <h1
                class="text-xl md:text-2xl font-semibold text-slate-800/50 mb-2 dark:text-white/50"
              >
                02
              </h1>
              <p
                id="p2"
                class="text-lg md:text-xl font-semibold text-slate-800/50 dark:text-white/50"
              >
                masukkan product yang dipilih ke keranjang
              </p>
            </li>
            <li
              id="button3"
              @click="handleClick(3)"
              class="cursor-pointer hover:bg-slate-100 p-8 rounded-2xl text-center lg:text-left dark:hover:bg-slate-600"
            >
              <h1
                class="text-xl md:text-2xl font-semibold text-slate-800/50 mb-2 dark:text-white/50"
              >
                03
              </h1>
              <p
                id="p3"
                class="text-lg md:text-xl font-semibold text-slate-800/50 dark:text-white/50"
              >
                pilih metode pembayaran
              </p>
            </li>
            <li
              id="button4"
              @click="handleClick(4)"
              class="cursor-pointer hover:bg-slate-100 p-8 rounded-2xl text-center lg:text-left dark:hover:bg-slate-600"
            >
              <h1
                class="text-xl md:text-2xl font-semibold text-slate-800/50 mb-2 dark:text-white/50"
              >
                04
              </h1>
              <p
                id="p4"
                class="text-lg md:text-xl font-semibold text-slate-800/50 dark:text-white/50"
              >
                lakukan pembayaran
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
