<template>
  <div class="pt-[54px]">
    <div class="mx-auto w-max p-[32px] rounded-[12px] edit-portfolio relative">
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
            v-if="imageFile"
            for="file"
            class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px] mb-[8px]"
          >
            <img src="/icons/upload.svg" alt="upload" />
            <p>Ubah Icon</p>
          </label>
        </div>
        <div class="relative mt-2">
          <div v-show="imageFile" class="border rounded-[8px] p-3">
            <img alt="icon" id="add-icon" class="w-[24px] h-[24px]" />
          </div>
          <InputIcon
            @get-image="getFile"
            v-show="!imageFile"
            class-input="bg-[#A0A3BD]/[5%] border-[1px] border-[#A0A3BD]/10"
          />
        </div>
        <Input
          v-model="value"
          label="Heading 1"
          addClass="mt-[20px]"
          classInput="w-full"
          placeholder="Masukan heading 1 disini"
        />
        <Input
          v-model="name"
          label="Heading 2"
          addClass="mt-[20px]"
          classInput="w-full"
          placeholder="Masukan heading 2 disini"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          btnClass="text-white bg-[#F6B205] text-sm font-semibold !px-[24px] py-[8px] rounded-[8px]"
          @click="OnClickSavePortfolio"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import ListMenu from "~/components/card-menu/list-menu.vue";
import Input from "~/components/atoms/input.vue";
import InputFile from "~/components/atoms/input-file.vue";
import InputIcon from "~/components/atoms/input-file-custom.vue";

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
      name: "",
      value: "",
      isLoading: false,
      imageFile: null,
    };
  },
  methods: {
    getFile(file) {
      this.imageFile = file;
      if (file) {
        const srcImage = URL.createObjectURL(this.imageFile);
        const bannerImage = document.getElementById("add-icon");
        bannerImage.src = srcImage;
      }
    },
    async OnClickSavePortfolio() {
      if (!this.name || !this.value || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoading = true;
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("value", this.value);
        formData.append("file", this.imageFile);
        await this.$axios
          .post("/portfolios", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menambahkan portofolio",
                isSuccess: true,
              });
              this.$router.push("/portfolio");
            } else {
              throw new Error(response);
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menambahkan portofolio",
          isSuccess: false,
        });
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.edit-portfolio {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
