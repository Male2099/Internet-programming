<script >
import categoryApi from "@/libs/apis/category";
import productApi from "@/libs/apis/product";
import itemApi from "@/libs/apis/item";
export default {
  components: {},
  data() {
    return {
      categories: [],
      products: null,
      selectedItem: null
    };
  },
  async mounted() {
    this.categories = await categoryApi.categorized_items();
    console.log(this.categories);
  },
  methods: {
    async getProductByItem(item) {
      this.selectedItem = item
      const result = await itemApi.getById(item._id);
      //  if(result[0]===undefined){
      //   alert(result)
      //   return;
      //  }
      console.log(result);
      this.products = result.products
    }
  },
};
</script>

<template>
  <main>
    <div class="bg-gray-100 py-2 text-center text-lg relative">
      TopOne.com
      <a href="/login"
        class="  absolute  text-white  right-2  top-2  bg-gray-400  hover:bg-yellow-400  px-2 py-[1px] rounded-md  cursor-pointer">
        Login
      </a>
    </div>

    <div class="app">
      <div class="wrapper">
        <section class="sec-left">
          <div class="ctg-box pl-2" v-for="cate in categories" :key="cate.name">
            <div>
              <div class=" overflow-hidden h-4 w-4">
                <img :src="cate.imageUrl" class=" object-fill w-full">
              </div>
              <strong>{{ cate.name }}</strong>
            </div>
            <ul>
              <li v-for="item in cate.items" :key="item.name" @click="getProductByItem(item)" class="hover:cursor-pointer">
                {{ item.name }}
              </li>
            </ul>
          </div>

        </section>
        <section class="sec-right">
          <div class="box-wrapper">
            <div v-if="products === null" class="h-full w-full  flex justify-center items-center">
              select any item to see data
            </div>
            <div v-if="products != null && products.length == 0" class="h-full w-full  flex justify-center items-center">
              No data about {{ selectedItem.name }}
            </div>
            <div class="box" v-for="product in products" :key="product.title">
              <div class="data-wrapper">
                <div class="img-wrap"><img :src="product.imageUrl" height="100%"></div>
                <div class="title"><strong>{{ product.title }}</strong></div>
                <div style="overflow: auto !important; height: 100%">
                  <ul class="shop-price">
                    <li v-for="price in product.prices" :key="price.source">
                      <span>{{ price.source }}</span>
                      <span>{{ price.price }}$</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  /* box-sizing: border-box; */
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  border: 0.01vh solid rgb(114, 114, 114);
  border-radius: 1rem;
  margin-block: 1rem;
  margin-inline: 3rem;

}

::-webkit-scrollbar-thumb {
  border: 0.01vh solid rgb(114, 114, 114);
  border-radius: 1rem;

  background-image: linear-gradient(120deg, #4b4b4b 10%, hsl(0, 0%, 39%) 100%);
}

::-webkit-scrollbar-thumb:hover {
  background-image: linear-gradient(120deg, #636363 10%, hsl(0, 0%, 44%) 100%);
}

/* ::-webkit-scrollbar-thumb:active {
  background-image: linear-gradient(120deg, #eda143 10%, hsl(36, 95%, 30%) 100%);
} */

.app {
  height: 100vh;
  width: 100%;

  overflow: hidden;
}

.head {
  width: 100%;
  height: 6%;

}

.head h1 {
  margin: auto;
  width: fit-content;
}

.wrapper {
  height: 94%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sec-right {
  padding: 1rem;
  height: calc(100% - 2rem);
  width: calc(86% - 2rem);
  border: 2px solid black;
  border-left: none;

  overflow: auto;
}



.sec-left {
  border: 2px solid black;
  padding-top: 1rem;

  height: calc(100% - 2rem);
  width: calc(15% - 2rem);
  border: 2px solid black;
  overflow: auto;
}


.ctg-box>:first-child {
  width: 100%;
  display: flex;
  gap: .3rem;

}

.ctg-box ul {
  display: flex;
  flex-direction: column;
  margin-top: .6rem;
  margin-left: 0;
  padding: 0;
  list-style: none;
}

.ctg-box li {
  padding: .2rem 2.2rem
}

.ctg-box li::before {
  content: "- ";
}

.ctg-box li:hover {
  /* border-color:black ; */
  background-color: grey;
}

.sec-right {
  padding: 1rem;
  height: calc(100% - 2rem);
  width: calc(86% - 2rem);
  border: 2px solid black;
  border-left: none;

  overflow: auto;
}

.box-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
}

.box {
  width: 10rem;
  height: 16rem;
  border: 2px solid black;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 1px 3px 4px hsl(0, 0%, 60%);
}

.box:hover {
  box-shadow: 2px 2px 5px hsl(0, 0%, 0%);
}

.data-wrapper {
  height: 100%;
  /* overflow: auto; */
}

.img-wrap {
  height: 40%;;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-wrap img {
  object-fit: contain;
  height: 100%;
  ;

}

.title {
  padding: .7rem 0 0 0;
  text-align: center;
}

.shop-price {
  padding: 0 .3rem 0 .3rem;
  overflow: auto;
  list-style: none;
  margin-top: .4rem;
}

.shop-price li {
  padding: 0;
  display: flex;
  justify-content: space-between;

}



.sec-left {
  border: 2px solid black;
  padding-top: 1rem;

  height: calc(100% - 2rem);
  width: calc(15% - 2rem);
  border: 2px solid black;
  overflow: auto;
}


.ctg-box>:first-child {
  width: 100%;
  display: flex;
  gap: .3rem;

}

.ctg-box ul {
  display: flex;
  flex-direction: column;
  margin-top: .6rem;
  margin-left: 0;
  padding: 0;
  list-style: none;
}

.ctg-box li {
  padding: .2rem 2.2rem
}

.ctg-box li::before {
  content: "- ";
}

.ctg-box li:hover {
  /* border-color:black ; */
  background-color: grey;
}</style>