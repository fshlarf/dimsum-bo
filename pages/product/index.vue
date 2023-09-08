<template>
  <div class="wrapper lg:px-[70px] xl:px-[120px]">
    <!-- <div @click="isSwitch = !isSwitch" class="w-max mx-auto">
      <TogleTitle :toggle="isSwitch" />
    </div> -->
    <div class="relative">
      <div
        class="p-[20px] lg:p-[32px] rounded-[12px] mx-auto"
        id="product-wrapper"
      >
        <header class="flex justify-between items-center relative">
          <h1 class="title-text text-[#2D2D2D] font-semibold whitespace-nowrap">
            Daftar Produk
          </h1>
          <div class="flex items-center gap-[16px]">
            <div
              class="absolute left-0 right-0 top-[100%] w-full lg:relative mt-[16px] lg:mt-0"
            >
              <img
                src="/icons/search.svg"
                alt="search"
                class="absolute left-[12px] top-1/2 -translate-y-1/2"
              />
              <input
                v-model="filterProduct.search"
                type="text"
                placeholder="Cari produk disini.."
                class="text-xs border-[1px] border-[#F8FAFB] bg-[#F8FAFB] focus:outline-none rounded-[8px] py-[12px] pl-[40px] w-full lg:w-[244px] focus:border-[#F6B205]/40"
                @keyup.enter="onSearchProduct"
              />
            </div>
            <Button
              @click="$router.push('product/add')"
              class="button-text text-white bg-[#F6B205] p-[12px] rounded-[8px] whitespace-nowrap"
              >Tambah Produk</Button
            >
          </div>
        </header>
        <hr
          class="left-0 right-0 hidden lg:block absolute border-[1px] border-[#D9D9D9]/20 mt-[16px]"
        />
        <div
          v-if="!isLoading"
          class="mt-[72px] lg:mt-[40px] flex justify-between items-center relative"
        >
          <div
            v-for="(category, id) in categories"
            :key="id"
            class="pb-[15px] w-[221px] text-center relative transition-all ease-linear duration-200 cursor-pointer"
            @click="onSelectCategory(category)"
          >
            <h1
              class="text-sm font-medium"
              :class="{ 'text-[#E5B223]': categoryId === category.id }"
            >
              {{ category.name }}
            </h1>
            <div
              class="h-[4px] bg-[#E5B223] rounded-[20px] absolute bottom-[-2px] z-30 opacity-0 transition-all duration-200 ease-in-out"
              :class="[
                categoryId === category.id ? 'w-full opacity-[100]' : 'w-0',
              ]"
            ></div>
          </div>
          <hr class="absolute bottom-0 left-0 right-0" />
        </div>
        <div v-if="!isLoading" class="mt-[45px]">
          <div
            v-if="products.list.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-[16px] gap-y-[20px]"
          >
            <CardProduct
              v-for="(product, id) in products.list"
              :key="id"
              :product="product"
              @onSelectOption="onSelectProductOption"
              @onClickFavorite="onClickFavorite"
            />
          </div>
          <div v-else class="w-full h-[292px] flex justify-center items-center">
            <div>
              <img class="mx-auto" src="/icons/not-found.svg" alt="not found" />
              <p class="text-sm text-[#474747]">Oops! Hasil tidak ditemukan.</p>
            </div>
          </div>
          <div
            v-if="products.list.length > 0"
            class="mt-[50px] max-w-max mx-auto"
          >
            <Pagination
              :is-loading="isLoading"
              :pagination="products.pagination"
              :max-displayed-pages="5"
              @onClickPagination="onClickPagination"
            />
          </div>
        </div>
      </div>
    </div>

    <ModalConfirmation ref="modalConfirmation" />
  </div>
</template>

<script>
import TogleTitle from "~/components/product/togle-title.vue";
import ProductWrapper from "~/components/product/product-wrapper.vue";
import CardProduct from "~/components/product/card-product.vue";
import Pagination from "~/components/molleculs/pagination.vue";
import ModalConfirmation from "~/components/atoms/modal-confirmation.vue";

export default {
  layout: "dashboard",
  middleware: ["auth"],
  components: {
    TogleTitle,
    ProductWrapper,
    CardProduct,
    Pagination,
    ModalConfirmation,
  },
  data() {
    return {
      filterProduct: {
        page: 1,
        limit: 8,
        search: "",
        categoryId: null,
      },
      categories: [],
      products: {
        list: [],
        pagination: {},
      },
      isLoading: true,
      isLoadingProduct: true,
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    onSearchProduct() {
      this.filterProduct = {
        ...this.filterProduct,
        page: 1,
      };
      this.getProducts();
    },
    onClickPagination(page) {
      this.filterProduct = {
        ...this.filterProduct,
        page: page,
      };
      this.getProducts();
    },
    onSelectCategory(category) {
      this.categoryId = category.id;
      this.filterProduct = {
        ...this.filterProduct,
        page: 1,
        categoryId: category.id,
      };
      this.getProducts();
    },
    async getCategories() {
      this.isLoading = true;
      try {
        const getCategories = await this.$axios.get("/categories");
        if (getCategories.data) {
          this.categories = getCategories.data.data;
          this.categoryId = this.categories[0].id;
          this.filterProduct = {
            ...this.filterProduct,
            categoryId: this.categoryId,
          };
          await this.getProducts();
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async getProducts() {
      this.isLoadingProduct = true;
      try {
        const getProducts = await this.$axios.get("/products", {
          params: this.filterProduct,
        });
        if (getProducts.data) {
          const { data, pagination } = getProducts.data;
          // let list = [];
          // data.map((product) => {
          //   product.variants.map((variant) => {
          //     list.push({
          //       ...product,
          //       variant: variant,
          //     });
          //   });
          // });
          // console.log(data);
          // console.log(list);
          this.products = {
            list: data,
            pagination,
          };
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoadingProduct = false;
    },
    onClickFavorite(product) {
      if (product.isFavorited) {
        this.removeProductFromFavorited(product.id);
      } else {
        this.addProductToFavorited(product.id);
      }
    },
    onSelectProductOption(option, product) {
      if (option.value == "edit") {
        this.$router.push(`/product/edit?id=${product.id}`);
      } else if (option.value == "delete") {
        this.onClickDeleteProduct(product.id);
      }
    },
    async onClickDeleteProduct(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus produk",
        message: "Ingin menghapus produk?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (confirmation) {
        this.deleteProduct(id);
      }
    },
    async addProductToFavorited(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Tambah ke daftar favorit",
        message: "Ingin menambah produk ke daftar favorit?",
        confirmText: "Ya, tambah",
        cancelText: "Batal",
      });
      if (!confirmation) {
        return;
      }
      try {
        await this.$axios.patch(`/products/${id}/favorited/add`);
        this.$snackbar.show({
          message: "Produk ditambahkan ke daftar favorit",
          isSuccess: true,
        });
        this.getProducts();
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menambahkan ke daftar favorit",
          isSuccess: false,
        });
      }
    },
    async removeProductFromFavorited(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus dari daftar favorit",
        message: "Ingin menghapus produk dari daftar favorit?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (!confirmation) {
        return;
      }
      try {
        await this.$axios.patch(`/products/${id}/favorited/remove`);
        this.$snackbar.show({
          message: "Produk dihapus dari daftar favorit",
          isSuccess: true,
        });
        this.getProducts();
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menghapus dari daftar favorit",
          isSuccess: false,
        });
      }
    },
    async deleteProduct(id) {
      this.isLoadingDeleteProduct = true;
      try {
        await this.$axios.delete(`/products/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus produk",
              isSuccess: true,
            });
            this.getProducts();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menghapus produk",
          isSuccess: false,
        });
      }
      this.isLoadingDeleteProduct = false;
    },
  },
};
</script>
