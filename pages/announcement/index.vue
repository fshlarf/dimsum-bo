<template>
  <div class="pt-[54px] wrapper relative">
    <div
      id="announcement"
      class="lg:max-w-[500px] xl:max-w-[736px] p-[20px] lg:p-[32px] mx-auto relative"
    >
      <header>
        <h1 class="title-text text-[#2D2D2D] font-medium">Pengumuman</h1>
      </header>
      <hr
        class="absolute left-0 right-0 border-[1px] border-[#D9D9D9]/20 mt-[16px]"
      />
      <div class="mt-[40px]">
        <Input
          v-model="name"
          label="Keterangan"
          placeholder="Masukkan keterangan disini"
          class-input="w-full text-base text-[#A0A3BD]"
        />
        <div class="mt-[20px] h-[70px] md:-[100px] lg:h-[176px] relative">
          <div class="flex justify-between items-center">
            <p class="text-sm lg:text-base">Gambar</p>
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p class="text-sm lg:text-base">Ubah Gambar</p>
            </label>
          </div>
          <InputFile
            v-show="!imageFile"
            class-input="bg-[#A0A3BD]/[5%] border-[#A0A3BD]/10 border-[1px]  !h-full rounded-[8px] mt-[8px] z-40"
            id="input-file"
            @get-image="getFile"
          />
          <div
            v-show="imageFile"
            class="bg-white w-full h-full rounded-[8px] border lg:p-3 mt-2"
          >
            <img alt="banner" class="h-full mx-auto" id="announcement-banner" />
          </div>
        </div>
      </div>
      <div class="text-right mt-[50px]">
        <Button
          @click="onSaveAnnouncement"
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
  middleware: ["auth"],
  components: {
    Input,
    InputFile,
    Button,
  },
  data() {
    return {
      imageFile: null,
      showInputFile: true,
      announcement: {},
      isLoading: true,
      name: "",
      isLoadingSaveAnnouncement: false,
    };
  },
  mounted() {
    this.getAnnouncement();
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
    async getAnnouncement() {
      this.isLoading = true;
      try {
        const getAnnouncement = await this.$axios.get("/announcements");
        if (getAnnouncement.data) {
          this.announcement = getAnnouncement.data.data;
          this.name = this.announcement.name;
          if (this.announcement) {
            await this.getAnnouncementPoster(this.announcement.fileName);
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async getAnnouncementPoster(fileName) {
      if (fileName) {
        const url = `bucket/images/announcement/${fileName}`;
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
            const bannerImage = document.getElementById("announcement-banner");
            bannerImage.src = srcImage;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    onSaveAnnouncement() {
      if (this.announcement && this.announcement.id) {
        this.updateAnnouncement();
      } else {
        this.createAnnouncement();
      }
    },
    async createAnnouncement() {
      if (!this.name || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingSaveAnnouncement = true;
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("file", this.imageFile);
        await this.$axios
          .post("/announcements", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menyimpan pengumuman",
                isSuccess: true,
              });
              this.getAnnouncement();
            } else {
              throw new Error(response);
            }
          });
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menyimpan pengumuman",
          isSuccess: false,
        });
      }
      this.isLoadingSaveAnnouncement = false;
    },
    async updateAnnouncement() {
      if (!this.name || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingSaveAnnouncement = true;
      try {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("file", this.imageFile);
        await this.$axios
          .patch(`/announcements/${this.announcement.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menyimpan pengumuman",
                isSuccess: true,
              });
              this.getAnnouncement();
            } else {
              throw new Error(response);
            }
          });
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menyimpan pengumuman",
          isSuccess: false,
        });
      }
      this.isLoadingSaveAnnouncement = false;
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
