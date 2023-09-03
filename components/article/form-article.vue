<template>
  <div class="">
    <header>{{ title }}</header>
    <hr class="absolute left-0 right-0 my-[24px]" />
    <div class="mt-[48px] w-[700px]">
      <div class="relative h-[100px]">
        <div class="flex justify-between items-center">
          <p>Gambar</p>
          <label
            v-if="!uploadImage"
            for="file"
            class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
          >
            <img src="/icons/upload.svg" alt="upload" />
            <p>Ubah Gambar</p>
          </label>
        </div>
        <img
          v-show="!uploadImage"
          alt=""
          class="w-[122px] h-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          id="image-add-article"
        />
        <div>
          <InputFileCustom
            v-show="uploadImage"
            class-input="border-[1px] border-[#A0A3BD]/10 bg-[#A0A3BD]/[5%]  h-[100px]"
            @get-image="getFile"
          />
        </div>
      </div>
      <Input
        label="Judul Artikel"
        class="mt-[30px]"
        placeholder="Masukkan judul artikel disini"
        class-input="w-full"
      />
      <TextArea class-text="h-[268px]" label="Konten" class="mt-[20px]" />
      <div class="text-right mt-[20px]">
        <Button
          class="text-white bg-[#F6B205] px-[20px] py-[8px] text-sm font-semibold rounded-[8px]"
          @click="$emit('clickBtnSave')"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Input from "~/components/atoms/input.vue";
import InputFileCustom from "../atoms/input-file-custom.vue";
import Button from "~/components/atoms/button.vue";
import TextArea from "../atoms/text-area.vue";
export default {
  components: {
    Input,
    InputFileCustom,
    Button,
    TextArea,
  },
  data() {
    return {
      uploadImage: true,
      imageFile: {},
    };
  },
  props: {
    title: {
      typeof: String,
      default: "",
    },
  },
  methods: {
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.uploadImage = false;
        this.showInputFile = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const imageArticle = document.getElementById("image-add-article");
        imageArticle.src = srcImage;
      }
    },
  },
};
</script>
