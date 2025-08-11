<template>
  <div class="wrapper">
    <nuxt-link to="/product" class="lg:hidden">
      <img src="/icons/arrow-back.svg" alt="back" />
    </nuxt-link>
    <div
      class="add-article rounded-[12px] mt-[12px] md:mt-[16px] lg:mt-[32px] relative"
    >
      <div class="p-[20px] lg:p-[32px]">
        <header class="title-text font-semibold">Edit Artikel</header>
      </div>
      <hr />
      <div class="p-[20px] lg:p-[32px]">
        <div class="">
          <div class="flex justify-between items-center text-sm lg:text-base">
            <p class="text-sm lg:text-base">Gambar</p>
          </div>
          <div v-show="imageFile" class="flex items-center gap-3 lg:gap-4">
            <div class="mt-[10px] lg:mt-[15px]">
              <img
                alt=""
                class="max-w-[80px] max-h-[66px] md:max-w-[90px] md:max-h-[80px] lg:max-w-[122px] lg:max-h-[100px]"
                id="image-edit-article"
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
        <div class="text-right mt-[20px]">
          <Button
            :loading="isLoadingEditArticle"
            class="text-white bg-[#F6B205] px-[20px] py-[8px] button-text font-semibold rounded-[8px]"
            @click="editArticle"
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
      isLoading: true,
      article: {},
      isLoadingEditArticle: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.getArticleById(id);
    }
  },
  methods: {
    async getArticleById(id) {
      this.isLoading = true;
      try {
        const getArticle = await this.$axios.get(`/articles/${id}`);
        if (getArticle.data) {
          this.article = getArticle.data.data;
          this.title = this.article.title;
          this.content = this.article.content;
          await this.getArticleImage(this.article.fileName);
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async getArticleImage(fileName) {
      if (fileName) {
        // const url = `bucket/images/articles/${fileName}`;
        const url = fileName;
        await this.$axios
          .get(url, {
            responseType: "blob",
          })
          .then((response) => {
            const responseType = response.headers["content-type"];
            const responseData = response.data;

            // Convert the response data to a Blob
            const blob = new Blob([responseData], { type: responseType });

            // Create a new File object with the Blob
            this.imageFile = new File([blob], fileName, {
              type: responseType,
            });

            const srcImage = URL.createObjectURL(this.imageFile);
            const bannerImage = document.getElementById("image-edit-article");
            bannerImage.src = srcImage;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.showInputFile = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const imageArticle = document.getElementById("image-edit-article");
        imageArticle.src = srcImage;
      }
    },
    async editArticle() {
      if (!this.title || !this.content || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingEditArticle = true;
      try {
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("isActive", true);
        formData.append("file", this.imageFile);
        await this.$axios
          .patch(`/articles/${this.article.id}`, formData, {
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
      this.isLoadingEditArticle = false;
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
