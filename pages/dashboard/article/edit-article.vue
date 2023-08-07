<template>
  <div class="w-max mx-auto pt-[54px]">
    <div class="relative edit-article p-[32px] rounded-[12px] w-max">
      <header>Edit Artikel</header>
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
          <div class="flex w-full my-[20px]">
            <InputFile
              add-class="w-max"
              class-input="  !border-none !px-0 !justify-start gap-[12px]"
              text-input="Ubah Gambar"
              class-image="!w-[122px] !h-[100px]"
              @get-image="getFile"
            />
          </div>
        </div>
        <Input
          label="Judul Artikel"
          class="mt-[40px]"
          placeholder="Masukkan judul artikel disini"
          class-input="w-full"
        />
        <TextArea class-text="h-[268px]" label="Konten" class="mt-[20px]" />
        <div class="text-right mt-[60px]">
          <Button
            class="text-white bg-[#F6B205] px-[20px] py-[8px] text-sm font-semibold rounded-[8px]"
            @click="$emit('clickBtnSave')"
            >Simpan</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "~/components/atoms/input.vue";
import InputFile from "~/components/atoms/input-file.vue";
import Button from "~/components/atoms/button.vue";
import TextArea from "~/components/atoms/text-area.vue";
export default {
  layout: "dashboard",
  components: {
    Input,
    InputFile,
    Button,
    TextArea,
  },
  data() {
    return {
      uploadImage: true,
      imageFile: {},
    };
  },
  //   methods: {
  //     getFile(file) {
  //       this.imageFile = file;
  //       console.log(file);
  //       if (file) {
  //         this.uploadImage = false;
  //         this.showInputFile = false;
  //         const srcImage = URL.createObjectURL(this.imageFile);
  //         const imageArticle = document.getElementById("image-edit-article");
  //         imageArticle.src = srcImage;
  //       }
  //     },
  //     getImage(event) {
  //       const imageFiles = event.target.files;
  //       this.$emit("get-image", imageFiles[0]);
  //     },
  //   },
};
</script>
<style scoped>
.edit-article {
  border: 1px solid #eceef6;
  background: #ffff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
