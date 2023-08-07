<template>
  <div class="pt-[54px]">
    <div
      class="mx-auto w-max p-[32px] rounded-[12px]"
      id="card-option"
      v-if="!editPortfolio && !addReward"
    >
      <div>
        <section class="flex justify-between items-center">
          <h3 class="text-base lg:text-[20px] text-[#2D2D2D] font-semibold">
            Portofolio
          </h3>
          <Button
            @click="addReward = true"
            class="bg-[#F6B205] text-white font-semibold text-sm py-[10px] px-[16px] rounded-[8px]"
            >Tambah Portofolio</Button
          >
        </section>
        <section
          class="border-[1px] border-[#A0A3BD]/30 mt-[12px] rounded-[10px]"
        >
          <ListMenu title="Portofoliio 1" @clickEdit="editPortfolio = true" />
          <ListMenu title="Portofoliio 12" />
        </section>
      </div>
    </div>
    <div
      v-else-if="addReward"
      class="mx-auto w-max p-[32px] rounded-[12px] edit-portfolio relative"
    >
      <header class="text-[#2D2D2D] text-[20px] font-semibold">
        Tambah Portofolio
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="w-[710px] mt-[40px]">
        <div class="flex justify-between items-center">
          <p>Icon</p>
          <label
            v-if="!showUploadIcon"
            for="file"
            class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px] mb-[8px]"
          >
            <img src="/icons/upload.svg" alt="upload" />
            <p>Ubah Icon</p>
          </label>
        </div>
        <div class="relative">
          <img
            v-show="!showUploadIcon"
            alt=""
            id="add-icon"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px]"
          />
          <InputIcon
            @get-image="getFile"
            v-show="showUploadIcon"
            class-input="bg-[#A0A3BD]/[5%] border-[1px] border-[#A0A3BD]/10"
          />
        </div>
        <Input
          label="Heading 1"
          addClass="mt-[30px]"
          classInput="w-full"
          placeholder="Masukkan heading 1 disini"
        />
        <Input
          label="Heading 2"
          addClass="mt-[20px]"
          classInput="w-full"
          placeholder="Masukkan heading 2 disini"
        />

        <div class="text-right mt-[24px]">
          <Button
            @click="addReward = false"
            class="bg-[#F6B205] text-white rounded-[8px] !px-[24px] py-[8px]"
            >Simpan</Button
          >
        </div>
      </div>
    </div>
    <div
      v-else
      class="mx-auto w-max p-[32px] rounded-[12px] edit-portfolio relative"
    >
      <heade class="text-[#2D2D2D] text-[20px] font-semibold"
        >Edit Portofolio</heade
      >
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="w-[710px] mt-[40px]">
        <InputFile addClass="" label="Icon" text-input="Ubah Icon" />
        <Input label="Heading 1" addClass="mt-[30px]" classInput="w-full" />
        <Input label="Heading 2" addClass="mt-[20px]" classInput="w-full" />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          @click="editPortfolio = false"
          btnClass="text-white bg-[#F6B205] text-sm font-semibold !px-[24px] py-[8px] rounded-[8px]"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/atoms/button.vue";
import ListMenu from "../../components/card-menu/list-menu.vue";
import Input from "~/components/atoms/input.vue";
import InputFile from "../../components/atoms/input-file.vue";
import InputIcon from "../../components/atoms/input-file-custom.vue";
export default {
  layout: "dashboard",
  components: {
    Button,
    ListMenu,
    Input,
    InputFile,
    InputIcon,
  },
  data() {
    return {
      isOpen: false,
      editPortfolio: false,
      addReward: false,
      showUploadIcon: true,
    };
  },
  methods: {
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.showUploadIcon = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const bannerImage = document.getElementById("add-icon");
        bannerImage.src = srcImage;
      }
    },
  },
};
</script>
<style scoped>
#card-option {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
.edit-portfolio {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
