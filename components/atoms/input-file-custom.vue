<template>
  <div :class="`${addClass} relative`">
    <label v-if="label" for="file">{{ label }}</label>
    <div :class="`relative h-full pt-[8px] w-full`">
      <label
        for="file"
        :class="`w-full absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center ${classInput} cursor-pointer`"
      >
        <img src="/icons/upload-file.svg" alt="upload" />
        <h3 class="text-base text-[#2D2D2D]">Upload Gambar</h3>
      </label>
      <input
        type="file"
        name=""
        id="file"
        class="h-full w-full opacity-0 p-[12px] cursor-pointer"
        @change="getImage"
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
  },
  methods: {
    getImage(event) {
      const imageFiles = event.target.files;
      this.$emit("get-image", imageFiles[0]);
    },
  },
};
</script>
