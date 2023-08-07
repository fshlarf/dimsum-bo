<template>
  <div class="pt-[54px] w-max mx-auto relative">
    <div id="announcement" class="p-[32px]">
      <header>
        <h1 class="text-[20px] text-[#2D2D2D] font-medium">Pengumuman</h1>
      </header>
      <hr
        class="absolute left-0 right-0 border-[1px] border-[#D9D9D9]/20 mt-[16px]"
      />
      <div class="mt-[40px] w-[742px]">
        <Input
          label="Keterangan"
          placeholder="Masukkan keterangan disini"
          class-input="w-full text-base text-[#A0A3BD]"
        />
        <div class="mt-[20px] h-[152px] relative">
          <div class="flex justify-between items-center">
            <p>Gambar</p>
            <label
              v-if="!showInputFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p>Ubah Gambar</p>
            </label>
          </div>
          <InputFile
            v-show="showInputFile"
            class-input="bg-[#A0A3BD]/[5%] border-[#A0A3BD]/10 border-[1px]  h-[152px] rounded-[8px] mt-[8px] z-40"
            id="input-file"
            @get-image="getFile"
          />
          <img
            v-show="!showInputFile"
            alt="banner"
            class="w-full h-full absolute top-[30px] left-0 right-0 bottom-0"
            id="announcement-banner"
          />
        </div>
      </div>
      <div class="text-right mt-[50px]">
        <Button
          class="bg-[#F6B205] text-white rounded-[8px] !px-[24px] py-[8px]"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Input from "~/components/atoms/input.vue";
import InputFile from "~/components/atoms/input-file-custom.vue";

import Button from "~/components/atoms/button.vue";
export default {
  layout: "dashboard",
  components: {
    Input,
    InputFile,
    Button,
  },
  data() {
    return {
      imageFile: {},
      showInputFile: true,
    };
  },
  methods: {
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.showInputFile = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const bannerImage = document.getElementById("announcement-banner");
        bannerImage.src = srcImage;
      }
    },
  },
};
</script>
<style scoped>
#announcement {
  border-radius: 12px;
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
