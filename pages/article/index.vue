<template>
  <div class="wrapper lg:px-[40px] xl:px-[120px]">
    <div class="article-wrapper p-[20px] lg:p-[32px] rounded-[12px] relative">
      <header class="md:flex md:justify-between lg:items-center relative">
        <div class="flex justify-between items-center">
          <h1 class="title-text text-[#2D2D2D] font-semibold pt-[12px">
            Artikel
          </h1>
          <nuxt-link class="md:hidden" to="article/add">
            <Button
              class="text-sm text-white bg-[#F6B205] py-[8px] px-[12px] rounded-[8px] whitespace-nowrap"
              >Tambah Artikel</Button
            >
          </nuxt-link>
        </div>
        <div
          class="md:flex lg:flex-row md:items-center gap-[16px] mt-4 md:mt-0"
        >
          <InputSearch
            v-model="filterGetArticles.search"
            placeholder="Search here.."
            classInput="xl:w-[500px] lg:w-[250px] w-full"
            @enter="getArticles"
          />
          <nuxt-link class="hidden md:block" to="article/add">
            <Button
              class="text-sm text-white bg-[#F6B205] p-[12px] rounded-[8px] whitespace-nowrap"
              >Tambah Artikel</Button
            >
          </nuxt-link>
        </div>
      </header>
      <hr
        class="left-0 right-0 absolute border-[1px] border-[#D9D9D9]/20 hidden lg:block lg:mt-[16px]"
      />
      <template v-if="!isLoading">
        <div
          class="mt-[45px] space-y-[16px] lg:space-y-0"
          v-if="articles.list.length > 0"
        >
          <div v-for="(article, id) in articles.list" :key="id">
            <hr v-if="id > 0" class="my-[20px] hidden lg:block" />
            <ListArticle
              :article="article"
              @edit="$router.push(`/article/edit?id=${article.id}`)"
              @preview="$router.push(`/article/preview?id=${article.id}`)"
              @delete="onClickDeleteArticle"
            />
          </div>

          <div class="mt-12 block max-w-max mx-auto">
            <Pagination
              :is-loading="isLoading"
              :pagination="articles.pagination"
              :max-displayed-pages="5"
              @onClickPagination="onClickPagination"
            />
          </div>
        </div>
        <div
          v-else
          class="lg:h-[292px] flex justify-center items-center mt-[100px] lg:mt-[45px]"
        >
          <div>
            <img class="mx-auto" src="/icons/not-found.svg" alt="not found" />
            <p class="text-sm text-[#474747]">Oops! Hasil tidak ditemukan.</p>
          </div>
        </div>
      </template>
    </div>

    <ModalConfirmation ref="modalConfirmation" />
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import InputSearch from "~/components/atoms/input-search.vue";
import ListArticle from "~/components/article/list-article.vue";
import Pagination from "~/components/molleculs/pagination.vue";
import ModalConfirmation from "~/components/atoms/modal-confirmation.vue";

export default {
  layout: "dashboard",
  middleware: ["auth"],
  components: {
    Button,
    ListArticle,
    Pagination,
    InputSearch,
    ModalConfirmation,
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
    async onClickDeleteArticle(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus artikel",
        message: "Ingin menghapus artikel?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (confirmation) {
        this.deleteArticle(id);
      }
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
