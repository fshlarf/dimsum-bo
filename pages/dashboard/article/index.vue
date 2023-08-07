<template>
  <div class="pt-[54px] w-max max-w-[100%] mx-auto">
    <div
      v-if="!addArticle"
      class="article-wrapper p-[32px] rounded-[12px] w-max relative"
    >
      <header
        class="flex justify-between items-center w-[900px]"
        @click="dataArticle = !dataArticle"
      >
        <h1 class="text-[20px] text-[#2D2D2D] font-semibold">Artikel</h1>
        <div class="flex items-center gap-[16px]">
          <div class="relative">
            <img
              src="/icons/search.svg"
              alt="search"
              class="absolute left-[12px] top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Cari artikel disini.."
              class="text-xs border-[1px] border-[#F8FAFB] bg-[#F8FAFB] focus:outline-none rounded-[8px] py-[12px] pl-[40px] w-[244px] focus:border-[#F6B205]/40"
            />
          </div>
          <nuxt-link to="article/add-article">
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
      <div class="mt-[45px]" v-if="dataArticle">
        <ListArticle
          img-article="/images/product/dimsum-ayam.png"
          title=" Apa Manfaat Dimsum Untuk Tubuh ?"
          text=" Mungkin sudah banyak yang tahu Dimsum merupakan salah satu kudapan khas
          Tiongkok, Cina awd"
          createdAt="13/07/2023"
          @clickEdit="$router.push('/dashboard/article/edit-article')"
          @clickPreview="$router.push('/preview-article')"
        />
        <ListArticle
          img-article="/images/product/dimsum-ayam.png"
          title=" Apa Manfaat Dimsum Untuk Tubuh ?"
          text=" Mungkin sudah banyak yang tahu Dimsum merupakan salah satu kudapan khas
        Tiongkok, Cina awd"
          createdAt="13/07/2023"
        />
        <ListArticle
          img-article="/images/product/dimsum-ayam.png"
          title=" Apa Manfaat Dimsum Untuk Tubuh ?"
          text=" Mungkin sudah banyak yang tahu Dimsum merupakan salah satu kudapan khas
      Tiongkok, Cina awd"
          createdAt="13/07/2023"
        />
        <ListArticle
          img-article="/images/product/dimsum-ayam.png"
          title=" Apa Manfaat Dimsum Untuk Tubuh ?"
          text=" Mungkin sudah banyak yang tahu Dimsum merupakan salah satu kudapan khas
    Tiongkok, Cina awd"
          createdAt="13/07/2023"
          is-the-last-item="true"
        />
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
export default {
  layout: "dashboard",
  components: {
    Button,
    ListArticle,
  },

  data() {
    return {
      addArticle: false,
      dataArticle: true,
    };
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
