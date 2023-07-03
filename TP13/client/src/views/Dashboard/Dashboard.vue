<script >
import authApi from "@/libs/apis/auth";
export default {
  async mounted() { },
  methods: {
    async onLogout() {
      const result = await authApi.logout();
      if (result) this.$router.push({ name: "auth/login" });
    },
  },
};
</script>

<template >
  <main>
    <div class=" bg-gray-500 text-white py-2 text-lg text-center relative">
      <h1>You're in Dashboard Page</h1>
      <div v-on:click="onLogout()" class="
          absolute
          text-white
          right-2
          top-2
          bg-gray-400
          hover:bg-yellow-400
          px-2
          rounded-md
          cursor-pointer
        ">
        Logout
      </div>
      <a href="/" class="
          absolute
          text-white
          right-[7rem]
          top-2
          bg-gray-400
          hover:bg-yellow-400
          px-2
          rounded-md
          cursor-pointer
        ">
        Go Home
      </a>
    </div>
    <div class="flex flex-row">
      <div class=" p-1">
        <div class="w-[10rem] flex flex-col p-2 space-y-2 bg-gray-200">
          <router-link to="/dashboard/category"  active-class="active-link">
            <div class="px-4 py-2">Category</div>
          </router-link>
          <router-link to="/dashboard/item" active-class="active-link">
            <div class="px-4 py-2">Item</div>
          </router-link>
          <router-link to="/dashboard/product"  active-class="active-link">
            <div class="px-4 py-2">Product</div>
          </router-link>
        </div>
      </div>
      <div class=" w-full">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style>
  .active-link{
    color: white;
    background-color: black;
  }
</style>