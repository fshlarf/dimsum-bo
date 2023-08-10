<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="add-article rounded-[12px] w-max relative">
      <div class="p-[32px]">
        <header class="text-[20px] font-semibold">Edit Artikel</header>
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
                id="image-edit-article"
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
        const url = `bucket/images/articles/${fileName}`;
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
        this.$snackbar.show({
          message: "Terjadi kesalahan. Coba beberapa saat lagi",
          isSuccess: false,
        });
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
