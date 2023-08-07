<template>
  <div>
    <div class="flex justify-between gap-[48px] items-start">
      <div class="flex gap-[12px]">
        <img
          :src="imgArticle"
          alt="dimsum"
          class="w-[88px] h-[74px] rounded-[5px]"
        />
        <div class="w-[610px]">
          <h1 class="text-base text-[#2D2D2D] font-semibold">
            {{ title }}
          </h1>
          <p class="text-sm text-[#474747] truncate">
            {{ text }}
          </p>
          <p class="text-[#A0A3BD] text-xs pt-[16px]">
            Diposting pada {{ createdAt }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-[12px]">
        <img
          src="/icons/article/eye.svg"
          alt="icon"
          class="cursor-pointer"
          @click="$emit('clickPreview')"
        />
        <img
          src="/icons/article/icon-edit.svg"
          alt="edit"
          class="cursor-pointer"
          @click="$emit('clickEdit')"
        />
        <img
          src="/icons/article/trash.svg"
          alt="delete"
          class="cursor-pointer"
          @click="$emit('clickDelete')"
        />
      </div>
    </div>
    <hr v-if="!isTheLastItem" class="my-[20px]" />
  </div>
</template>
<script>
export default {
  props: {
    imgArticle: {
      typeof: String,
      default: "",
    },
    title: {
      typeof: String,
      default: "",
    },
    text: {
      typeof: String,
      default: "",
    },
    createdAt: {
      typeof: String,
      default: "",
    },
    createdAt: {
      typeof: String,
      default: "",
    },
    isTheLastItem: {
      typeof: Boolean,
      default: false,
    },
  },
};
</script>
