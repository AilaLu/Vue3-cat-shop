import { createApp } from "vue";
import "virtual:windi.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

import App from "./App.vue";

createApp(App).mount("#app");
// createApp是一個function, 傳進App.vue裡的所有東西, 掛載在html的id = "app那裡"

/*
宣傳一個體物件 在掛載在DOM節點
  const vm = createApp(App)
vm.mount('#app')
*/
