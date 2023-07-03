<script >
import categoryApi from "@/libs/apis/category";
import product from "@/libs/apis/product";
export default {
  data() {
    return {
      categories: [],
      name: "",
      desc: "",
      imageUrl: "",

      selectedCategory: null,
      shownUpdateCateModal: false,
      // newCate: {
      //   name: "",
      //   desc: "",
      //   imageUrl: "",
      // }
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const { name, desc, imageUrl } = this;
      const result = await categoryApi.create({ name, desc, imageUrl });
      if (!result) {
        alert(result.error);
        return;
      }

      this.categories = await categoryApi.all();
      this.name = this.desc = this.imageUrl = "";
    },
    async deleteCategory(category) {
      const result = await categoryApi.delete(category._id);
      if (!result) {
        alert(result.error)
        return;
      }
      this.categories = await categoryApi.all();
      this.name = this.desc = this.imageUrl = "";
    },
    async updateCategoryView(category) {
      this.selectedCategory = { ...category };
      this.shownUpdateCateModal = true
    },
    async onUpdate(e) {
      e.preventDefault();
      const result = await categoryApi.update(this.selectedCategory)
      if (!result) {
        alert(result)
        return;
      }
      this.categories = await categoryApi.all();
      this.name = this.desc = this.imageUrl = "";
      this.shownUpdateCateModal = false; 
      this.selectedCategory = null
    }

  },

  async mounted() {
    this.categories = await categoryApi.all();
  },
};
</script>

<template >
  <main >
    <div class="bg-gray-500 text-white py-2 text-lg text-center">
      <h1>Category</h1>
    </div>

    <div class="py-2">
      <form @submit="onSubmit" method="post">
        <div class="flex flex-row py-2 px-2 space-x-2 bg-gray-100">
          <div>
            <input v-model="name" name="name" type="text" placeholder="Name" required />
          </div>
          <div>
            <input v-model="desc" name="desc" type="text" placeholder="Description" required />
          </div>
          <div>
            <input v-model="imageUrl" name="imageUrl" type="text" placeholder="ImageURL" required />
          </div>
          <div>
            <button type="submit" class="bg-blue-500 text-white p-1 px-2 rounded-md">
              Add new
            </button>
          </div>
        </div>
      </form>
    </div>
    <div>
      <table id="customers">
        <tr class="bg-gray-200">
          <th>Name</th>
          <th class="max-w-[30rem] overflow-auto">Description</th>
          <th class="max-w-[30rem] overflow-auto">ImageURL</th>
          <th>Action</th>
        </tr>

        <tr v-for="cate in categories" :key="cate.name">
          <td>{{ cate.name }}</td>
          <td class="max-w-[30rem] overflow-auto">{{ cate.desc }}</td>
          <td class="max-w-[30rem] overflow-auto">{{ cate.imageUrl }}</td>
          <td class="flex flex-col gap-2 items-center">
            <button @click="deleteCategory(cate)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" style="height: 1.23rem;">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg></button>
            <button @click="updateCategoryView(cate)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" style="height: 1.23rem;">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="shownUpdateCateModal && selectedCategory">
      <Teleport to="body">
        <div class="h-[100vh] absolute top-0 w-full opacity-70percents  flex justify-center ">
          <div class="p-6 bg-gray-500 border-2 w-fit h-fit border-white absolute top-[15vh]">
            <form method="post" @submit="onUpdate">
              <div class="flex  w-fit py-2 px-2 space-x-2 bg-gray-100">
                <div>
                  <input v-model="selectedCategory.name" name="name" type="text" placeholder="Name" required />
                </div>
                <div>
                  <input v-model="selectedCategory.desc" name="desc" type="text" placeholder="Description" required />
                </div>
                <div>
                  <input v-model="selectedCategory.imageUrl" name="imageUrl" type="text" placeholder="ImageURL"
                    required />
                </div>

              </div>
              <div class="w-full flex justify-evenly pt-4 ">
                <button type="submit" class="bg-blue-500 text-white p-1 px-4 rounded-md">
                  OK
                </button>
                <button @click="() => { shownUpdateCateModal = false; selectedCategory = null }" type="button"
                  class="bg-blue-500 text-white p-1 px-4 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </main>
</template>

<style>
.opacity-70percents {
  background-color: rgba(0, 0, 0, 0.7);

}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}
</style>