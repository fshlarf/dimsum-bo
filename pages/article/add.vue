<template>
  <div class="wrapper">
    <nuxt-link to="/product" class="lg:hidden">
      <img src="/icons/arrow-back.svg" alt="back" />
    </nuxt-link>
    <div
      class="add-article rounded-[12px] lg:mx-[130px] xl:mx-[184px] mt-[12px] md:mt-[16px] lg:mt-[32px] relative"
    >
      <div class="p-[20px] lg:p-[32px]">
        <header class="title-text font-semibold">Tambah Artikel</header>
      </div>
      <hr />
      <div class="p-[20px] lg:p-[32px]">
        <div class="">
          <div class="flex justify-between items-center">
            <p class="text-sm lg:text-base">Gambar</p>
          </div>
          <div v-show="imageFile" class="flex items-center gap-4">
            <div class="mt-[10px] lg:mt-[15px]">
              <img
                alt=""
                class="max-w-[80px] max-h-[66px] md:max-w-[90px] md:max-h-[80px] lg:max-w-[122px] lg:max-h-[100px]"
                id="image-add-article"
              />
            </div>
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p class="text-sm lg:text-base">Ubah Gambar</p>
            </label>
          </div>
          <div>
            <InputFileCustom
              v-show="!imageFile"
              class-input="border-[1px] border-[#A0A3BD]/10 bg-[#A0A3BD]/[5%] mt-2 rounded-[8px]"
              @get-image="getFile"
            />
          </div>
        </div>
        <Input
          v-model="title"
          label="Judul Artikel"
          class="mt-[20px] text-sm lg:text-base"
          placeholder="Masukkan judul artikel disini"
          class-input="w-full"
        />
        <TextArea
          v-model="content"
          class-text="h-[164px] lg:h-[268px] text-sm lg:text-base"
          label="Konten"
          class="mt-[20px]"
        />
        <div class="text-right mt-[60px]">
          <Button
            class="text-white bg-[#F6B205] px-[20px] py-[8px] button-text font-semibold rounded-[8px]"
            @click="createArticle"
            >Simpan</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormArticle from "~/components/article/form-article.vue";
import Input from "~/components/atoms/input.vue";
import InputFileCustom from "~/components/atoms/input-file-custom.vue";
import Button from "~/components/atoms/button.vue";
import TextArea from "~/components/atoms/text-area.vue";

export default {
  layout: "dashboard",
  components: {
    FormArticle,
    Input,
    InputFileCustom,
    Button,
    TextArea,
  },
  data() {
    return {
      imageFile: null,
      title: "",
      content: "",
      isLoading: false,
    };
  },
  methods: {
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.showInputFile = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const imageArticle = document.getElementById("image-add-article");
        imageArticle.src = srcImage;
      }
    },
    async createArticle() {
      if (!this.title || !this.content || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoading = true;
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("file", this.imageFile);
        await this.$axios
          .post("/articles", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Artikel berhasil di simpan",
                isSuccess: true,
              });
              this.$router.push("/article");
            } else if (response.status == 402) {
              this.$snackbar.show({
                message: "Judul artikel yang sama sudah ada",
                isSuccess: false,
              });
            } else {
              throw new Error(response);
            }
          });
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 402) {
          this.$snackbar.show({
            message: "Judul artikel yang sama sudah ada",
            isSuccess: false,
          });
        } else if (
          error?.response?.status !== 500 &&
          error?.response?.status !== 401
        ) {
          this.$snackbar.show({
            message: "Terjadi kesalahan. Coba beberapa saat lagi",
            isSuccess: false,
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.add-article {
  border: 1px solid #eceef6;
  background: #ffff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
