import "./assets/style.css";
import "../node_modules/hamburgers/dist/hamburgers.css";
import "../node_modules/aos/dist/aos.css";
import "../src/assets/main.css";
import AOS from "aos";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faMoon,
  faSun,
  faCartShopping,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
/* add icons to the library */
library.add(
  faMoon,
  faSun,
  faCartShopping,
  faUser,
  faFacebook,
  faInstagram,
  faTwitter,
  faSearch
);

AOS.init();

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
