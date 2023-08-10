<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="add-article rounded-[12px] w-max relative">
      <div class="p-[32px]">
        <header class="text-[20px] font-semibold">Tambah Artikel</header>
      </div>
      <hr />
      <div class="w-[700px] p-[32px]">
        <div class="">
          <div class="flex justify-between items-center">
            <p>Gambar</p>
          </div>
          <div v-show="imageFile" class="flex items-center gap-4">
            <div class="">
              <img
                alt=""
                class="max-w-[122px] max-h-[100px]"
                id="image-add-article"
              />
            </div>
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p>Ubah Gambar</p>
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
          class="mt-[20px]"
          placeholder="Masukkan judul artikel disini"
          class-input="w-full"
        />
        <TextArea
          v-model="content"
          class-text="h-[268px]"
          label="Konten"
          class="mt-[20px]"
        />
        <div class="text-right mt-[60px]">
          <Button
            class="text-white bg-[#F6B205] px-[20px] py-[8px] text-sm font-semibold rounded-[8px]"
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
        this.$snackbar.show({
          message: "Terjadi kesalahan. Coba beberapa saat lagi",
          isSuccess: false,
        });
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
