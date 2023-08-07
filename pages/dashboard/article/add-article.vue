<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="add-article p-[32px] rounded-[12px] w-max relative">
      <FormArticle title="Tambah Artikel" forAddArticle="true" />
    </div>
  </div>
</template>
<script>
import FormArticle from "~/components/article/form-article.vue";
export default {
  layout: "dashboard",
  components: {
    FormArticle,
  },
};
</script>
<style scoped>
.add-article {
  border: 1px solid #eceef6;
  background: #ffff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
