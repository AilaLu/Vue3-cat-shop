<script setup>
/*我們想要做的事：
1.到src的App.vue就是這裡！
2.到public看看list.json看到我們的資料是一個物件裡有name, price, 照片
3.在script用ref宣告響應式的物件
4.在script fetch到要的陣列
5.接著在template加上指令 像是最基本的值出在textContent放{{ }}, v-for, v-on, v-bind, 再到script寫出相對應的javascript function
6.在 <section class="container mt-4">先用v-for長出貓咪卡片, name, price用 {{ }}, 照片就需要用v-bind
-----------------------------------------------------------------
*/

import { ref, computed, watch } from "vue";
// ref: 可被觀察的物件，響應式物件
const list = ref([]); //這是貓咪卡片的6個物件包在一個陣列
const cart = ref([]); //這是購物車裡的每個物件包在一個陣列

fetch("/list.json") //抓的外部資料 可以是政府開放平台 也可以是這些貓咪物件
  .then((data) => data.json()) //
  .then((resource) => {
    list.value = resource; //轉乘我們可以用的陣列包著物件！
  });

/*黃色貓咪鈕:-----------------------------------------------------
<template>的貓咪卡片<button>上用v-on設下click事件, 會執行addToCart function
<template>在<tbody>裡的<tr>就是長出來的欄位, 也要用v-for長出所有的欄位
<script> addToCart 判斷點擊的的名字是否已經出現在我們宣告的cart, 如果有找到 amount++, 沒有找到 抓回整個item,解構 給它amount! 長出一個有amount的欄位
*/
const addToCart = (newItem) => {
  const idx = cart.value.findIndex((item) => item.name === newItem.name);
  if (idx !== -1) {
    //findIndex如果找不到回傳-1, 所以!==1就是有找到 就是已經有欄位了
    cart.value[idx].amount++;
  } else {
    cart.value.push({
      ...newItem, //抓回整個item,解構
      amount: 1, //給它amount這個key, 下一次他在被點擊時就可以有amoun次數了
    });
  }
};

/*紅色刪除鍵：-----------------------------------------------------
<template>在<tbody>裡的<tr>就是長出來的欄位, 刪除單欄位就是在紅色按鈕<button>上用v-on設下click事件 @click="clearItem(item)", 會執行clearItem function
<script>在cart陣列裡刪除這個物件
*/
const clearItem = (clearItem) => {
  cart.value.splice(cart.value.indexOf(clearItem), 1);
};

//總價-------------------------------------------------------------
//<template>總價的地方設{{ }}

const total = computed(() => {
  let result = 0;
  cart.value.forEach((item) => (result += item.price * item.amount));
  return result.toFixed(2);
});

//綠色按鈕清空購物車;-----------------------------------------------------
//<template>綠色button加上  @click="resetCart()"
const resetCart = () => {
  cart.value = [];
};
</script>

<template>
  <main>
    <!-- <pre>  {{ list }}</pre> -->
    <header>
      <nav class="bg-light navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"
            ><i class="fas fa-gem"></i> 賺很大商店</a
          >
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="m-0 navbar-nav">
              <li class="nav-item inline">
                <a
                  class="p-4 no-underline inline-block nav-link active hover:(bg-gray-300)"
                  aria-current="page"
                  href="#"
                  >商品</a
                >
              </li>
              <li class="nav-item inline">
                <a
                  class="p-4 no-underline inline-block nav-link hover:(bg-gray-300)"
                  href="#"
                  >當日特價</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <section class="container mt-4">
      <div class="row items">
        <div v-for="item in list" :key="item" class="col-sm-2">
          <!-- v-for 下在要重複的HTML最外層 -->
          <div class="card" data-product-id="624946E">
            <img v-bind:src="item.cover" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title fw-light fs-6">{{ item.name }}</h5>
              <p class="price">${{ item.price }}</p>
              <button
                v-on:click="addToCart(item)"
                class="btn btn-sm btn-warning fw-light"
              >
                <!-- v-on:下在事件上 -->
                <i class="fas fa-cat"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <section class="cart">
        <h2>購物車</h2>
        <table class="table cart-item-table">
          <thead>
            <tr>
              <th scope="col">項目</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item">
              <td>{{ item.name }}</td>
              <td>
                <input
                  type="number"
                  class="quantity"
                  min="1"
                  v-model="item.amount"
                />
              </td>
              <td>${{ item.price }}</td>
              <td>${{ item.price * item.amount }}</td>
              <td>
                <button
                  @click="clearItem(item)"
                  data-id="D014739"
                  class="remove-item-btn btn btn-danger btn-sm"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"></td>
              <td>總價</td>
              <td>
                <span class="total-price">${{ total }}</span>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <button @click="resetCart()" class="btn btn-lg btn-success empty-cart">
          <i class="fas fa-baby-carriage"></i> 清空購物車
        </button>
      </section>
    </section>
  </main>
</template>
