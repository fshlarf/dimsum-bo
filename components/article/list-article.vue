<template>
  <div class="w-full">
    <div class="flex justify-between items-start gap-[12px]">
      <div class="w-[80px] h-[75px] rounded-[5px] overflow-hidden">
        <img
          :id="`article-${article.id}`"
          alt="artikel"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div class="flex gap-[12px] lg:w-[calc(100%-184px)] overflow-hidden">
        <div class="w-full">
          <h1
            class="text-xs md:text-sm lg:text-base text-[#2D2D2D] font-semibold truncate"
          >
            {{ article.title }}
          </h1>
          <p class="hidden lg:block lg:text-sm text-[#474747] truncate">
            {{ article.content }}
          </p>
          <p
            class="text-[#A0A3BD] text-[10px] lg:text-xs pt-[8px] lg:pt-[16px]"
          >
            Diposting pada {{ toddmmyyyy(article.createdAt) }}
          </p>
          <div class="flex items-center gap-[12px] mt-[8px] lg:hidden">
            <img
              src="/icons/article/eye.svg"
              alt="icon"
              class="cursor-pointer"
              @click="$emit('preview')"
            />
            <img
              src="/icons/article/icon-edit.svg"
              alt="edit"
              class="cursor-pointer"
              @click="$emit('edit')"
            />
            <img
              src="/icons/article/trash.svg"
              alt="delete"
              class="cursor-pointer"
              @click="$emit('delete', article.id)"
            />
          </div>
        </div>
      </div>
      <div class="items-center gap-[12px] hidden lg:flex">
        <img
          src="/icons/article/eye.svg"
          alt="icon"
          class="cursor-pointer"
          @click="$emit('preview')"
        />
        <img
          src="/icons/article/icon-edit.svg"
          alt="edit"
          class="cursor-pointer"
          @click="$emit('edit')"
        />
        <img
          src="/icons/article/trash.svg"
          alt="delete"
          class="cursor-pointer"
          @click="$emit('delete', article.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { toddmmyyyy } from "../../helpers/common";

export default {
  props: {
    article: {
      typeof: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imageFile: null,
    };
  },
  mounted() {
    this.getArticleImage();
  },
  methods: {
    async getArticleImage() {
      const fileName = this.article.fileName;
      if (fileName) {
        const url = `bucket/images/articles/${fileName}`;
        await this.$axios
          .get(url, {
            responseType: "blob",
          })
          .then((response) => {
            const responseType = response.headers["content-type"];
            const responseData = response.data;

            // Convert the response data to a Blob
            const blob = new Blob([responseData], { type: responseType });

            // Create a new File object with the Blob
            this.imageFile = new File([blob], fileName, {
              type: responseType,
            });

            const srcImage = URL.createObjectURL(this.imageFile);
            const bannerImage = document.getElementById(
              `article-${this.article.id}`
            );
            bannerImage.src = srcImage;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    toddmmyyyy,
  },
};
</script>
