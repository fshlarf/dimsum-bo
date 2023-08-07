<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="edit-product p-[32px] rounded-[12px] w-max relative">
      <header>Edit Produk</header>
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
        <SelectDropdown
          label="Kategori Produk"
          :options="['Dimsum', 'Saus', 'Menu Lainnya']"
        />
        <Input
          label="Produk"
          class="mt-[30px]"
          placeholder="Masukkan nama produk disini"
          class-input="w-full"
        />
        <div class="flex items-end gap-[16px] mt-[30px]">
          <Input
            placeholder="Masukkan isi"
            class-input="w-full"
            add-class="w-full"
            label="isi"
          />
          <SelectDropdown :options="['Pcs']" add-class="!mt-0 w-full" />
        </div>
        <SelectDropdown label="Kemasan" :options="['Box']" />
        <Input
          label="Harga Reseller"
          class="mt-[30px]"
          placeholder="Masukkan harga untuk reseller disini"
          class-input="w-full"
        />
        <Input
          label="Harga Agent"
          class="mt-[30px]"
          placeholder="Masukkan harga untuk agent disini"
          class-input="w-full"
        />
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
import Button from "~/components/atoms/button.vue";
import SelectDropdown from "~/components/atoms/select-dropdown.vue";
import InputFile from "~/components/atoms/input-file.vue";
export default {
  layout: "dashboard",
  components: {
    Input,
    InputFile,
    Button,
    SelectDropdown,
  },
  data() {
    return {
      uploadImage: true,
    };
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
<style scoped>
.edit-product {
  border: 1px solid #eceef6;
  background: #ffff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
