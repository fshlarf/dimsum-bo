<template>
  <div class="pt-[54px] w-max max-w-[100%] mx-auto">
    <div class="article-wrapper p-[32px] rounded-[12px] w-max relative">
      <header class="flex justify-between items-center w-[900px]">
        <h1 class="text-[20px] text-[#2D2D2D] font-semibold">Artikel</h1>
        <div class="flex items-center gap-[16px]">
          <div class="relative">
            <img
              src="/icons/search.svg"
              alt="search"
              class="absolute left-[12px] top-1/2 -translate-y-1/2"
            />
            <input
              v-model="filterGetArticles.search"
              type="text"
              name=""
              id=""
              placeholder="Cari artikel disini.."
              class="text-xs border-[1px] border-[#F8FAFB] bg-[#F8FAFB] focus:outline-none rounded-[8px] py-[12px] pl-[40px] w-[244px] focus:border-[#F6B205]/40"
            />
          </div>
          <nuxt-link to="article/add">
            <Button
              class="text-sm text-white bg-[#F6B205] p-[12px] rounded-[8px]"
              >Tambah Artikel</Button
            >
          </nuxt-link>
        </div>
      </header>
      <hr
        class="left-0 right-0 absolute border-[1px] border-[#D9D9D9]/20 mt-[16px]"
      />
      <div class="mt-[45px]" v-if="!isLoading">
        <div v-for="(article, id) in articles.list" :key="id">
          <hr v-if="id > 0" class="my-[20px]" />
          <ListArticle
            :article="article"
            @edit="$router.push(`/article/edit?id=${article.id}`)"
            @preview="$router.push(`/article/preview?id=${article.id}`)"
            @delete="deleteArticle"
          />
        </div>

        <div class="mt-12 mx-auto max-w-max">
          <Pagination
            :is-loading="isLoading"
            :pagination="articles.pagination"
            :max-displayed-pages="5"
            @onClickPagination="onClickPagination"
          />
        </div>
      </div>
      <div v-else class="w-[900px] h-[292px] flex justify-center items-center">
        <div>
          <img src="/icons/article/not-found.svg" alt="not found" />
          <p class="text-sm text-[#474747]">Oops! Hasil tidak ditemukan.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import ListArticle from "~/components/article/list-article.vue";
import Pagination from "~/components/molleculs/pagination.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    ListArticle,
    Pagination,
  },
  data() {
    return {
      articles: {
        list: [],
        pagination: {},
      },
      filterGetArticles: {
        page: 1,
        limit: 10,
        search: "",
      },
      isLoading: true,
      isLoadingDeleteArticle: false,
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      this.isLoading = true;
      try {
        const getArticles = await this.$axios.get("/articles", {
          params: this.filterGetArticles,
        });
        if (getArticles.data) {
          const { data, pagination } = getArticles.data;
          this.articles = {
            ...this.articles,
            list: data,
            pagination,
          };
        }
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Terjadi kesalahan",
          isSuccess: false,
        });
      }
      this.isLoading = false;
    },
    onClickPagination(page) {
      this.filterGetArticles = {
        ...this.filterGetArticles,
        page: page,
      };
      this.getArticles();
    },
    async deleteArticle(id) {
      this.isLoadingDeleteArticle = true;
      try {
        await this.$axios.delete(`/articles/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus artikel",
              isSuccess: true,
            });
            this.getArticles();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menghapus artikel",
          isSuccess: false,
        });
      }
      this.isLoadingDeleteArticle = false;
    },
  },
};
</script>

<style scoped>
.article-wrapper {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
