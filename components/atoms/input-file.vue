<template>
  <div :class="`${addClass} relative`">
    <label v-if="label" for="file">{{ label }}</label>
    <div class="relative h-full pt-[8px]">
      <div
        :class="`input-file ${classInput} h-full w-full absolute rounded-[8px] cursor-pointer flex justify-between items-center px-[16px]`"
      >
        <div class="w-max">
          <img
            alt=""
            id="icon-portfolio"
            class="w-[24px] h-[24px]"
            :class="`${classImage}`"
          />
        </div>
        <label for="file" class="flex items-center gap-[4px] cursor-pointer">
          <img src="/icons/upload.svg" alt="upload" />
          <h3 class="text-sm text-[#00B5D4]">{{ textInput }}</h3>
        </label>
      </div>
      <input
        type="file"
        name=""
        id="file"
        class="w-full rounded-[8px] py-[10px] opacity-0 cursor-pointer"
        @input="getImage"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      typeof: String,
      default: "",
    },
    addClass: {
      typeof: String,
      default: "",
    },
    classInput: {
      typeof: String,
      default: "",
    },
    textInput: {
      typeof: String,
      default: "",
    },
    classImage: {
      typeof: String,
      default: "",
    },
  },
  data() {
    return {
      addIcon: false,
    };
  },
  methods: {
    getImage(event) {
      this.addIcon = true;
      const imageFiles = event.target.files;
      const srcIcon = URL.createObjectURL(imageFiles[0]);
      const iconPortfolio = document.getElementById("icon-portfolio");
      iconPortfolio.src = srcIcon;
    },
  },
};
</script>
<style scoped>
.input-file {
  border: 1px solid rgba(160, 163, 189, 0.3);
}
</style>
