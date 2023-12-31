<template>
  <div class="wrapper mx-auto lg:max-w-[500px] xl:max-w-[800px]">
    <nuxt-link to="/partner">
      <img src="/icons/arrow-back.svg" alt="back" />
    </nuxt-link>
    <div
      class="add-user p-[20px] lg:p-[32px] rounded-[12px] relative mt-[20px]"
    >
      <header class="text-[#2D2D2D] title-text font-semibold">
        Tambah Mitra
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="mt-[40px]">
        <!-- upload image -->
        <div class="relative">
          <div class="">
            <p class="text-sm lg:text-base">Foto Mitra</p>
          </div>
          <div v-show="imageFile" class="flex gap-4 items-center">
            <img
              alt="foto mitra"
              class="max-w-[122px] max-h-[46px] md:max-h-[70px] lg:max-h-[100px]"
              id="image-add-partner"
            />
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p class="text-sm lg:text-base">Ubah Foto</p>
            </label>
          </div>
          <div class="mt-2">
            <InputFileCustom
              v-show="!imageFile"
              add-class="border-[1px] border-[#A0A3BD]/10 bg-[#A0A3BD]/[5%] h-[46px] lg:h-[100px] text-sm lg:text-base rounded-[8px]"
              @get-image="getFile"
            />
          </div>
        </div>
        <Input
          v-model="name"
          label="Nama Mitra"
          addClass="mt-[20px]"
          placeholder="cth: John Doe"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="phone"
          label="Nomor Handphone (opsional)"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="email"
          type="email"
          label="Email Mitra (opsional)"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="address"
          label="Domisili Mitra"
          placeholder="cth: Semarang, Jawa Tengah"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
        <div class="mt-[20px]">
          <label for="add-join-date-partner"
            >Tanggal Bergabung (opsional)</label
          >
          <input
            id="add-join-date-partner"
            v-model="joinDate"
            type="date"
            class="w-full text-xs md:text-sm border border-[rgba(160, 163, 189, 0.3)] rounded-[8px] mt-[8px] py-[10px] px-[16px] block focus:outline-[#F6B205]/40"
          />
        </div>
        <div class="mt-[20px]">
          <label for="add-partner-testimony">Testimoni</label>
          <textarea
            v-model="testimony"
            name="testimony"
            id="add-partner-testimony"
            rows="6"
            placeholder="Input testimoni..."
            class="w-full text-xs md:text-sm border border-[rgba(160, 163, 189, 0.3)] rounded-[8px] mt-[8px] py-[10px] px-[16px] block focus:outline-[#F6B205]/40"
          ></textarea>
        </div>
        <SelectDropdown
          v-if="!isLoading"
          :init-value="rewardName"
          class="mt-[20px] text-sm lg:text-base"
          label="Reward"
          :options="rewards"
          @select="onSelectReward"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          :loading="isLoadingAddPartner"
          btnClass="text-white bg-[#F6B205] button-textfont-semibold !px-[24px] py-[8px] rounded-[8px]"
          @click="addPartner"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import Input from "~/components/atoms/input.vue";
import SelectDropdown from "~/components/atoms/select-dropdown.vue";
import InputFileCustom from "~/components/atoms/input-file-custom.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    Input,
    SelectDropdown,
    InputFileCustom,
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: "",
      joinDate: "",
      testimony: "",
      rewards: [],
      rewardId: null,
      rewardName: "",
      isLoading: true,
      isLoadingAddPartner: false,
      imageFile: null,
    };
  },
  mounted() {
    this.getRewards();
  },
  methods: {
    async getRewards() {
      this.isLoading = true;
      try {
        const getRewards = await this.$axios.get("/rewards");
        this.rewards = getRewards.data.data;
        this.rewardId = this.rewards[0].id;
        this.rewardName = this.rewards[0].name;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async addPartner() {
      if (!this.name || !this.testimony || !this.address || !this.imageFile) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }

      this.isLoadingAddPartner = true;
      try {
        const formData = new FormData();
        formData.append("rewardId", this.rewardId);
        formData.append("name", this.name);
        formData.append("address", this.address);
        formData.append("testimony", this.testimony);
        if (this.email) {
          formData.append("email", this.email);
        }
        if (this.phone) {
          formData.append("phone", this.phone);
        }
        if (this.joinDate) {
          formData.append("joinDate", new Date(this.joinDate).toISOString());
        }
        formData.append("file", this.imageFile);

        await this.$axios
          .post("/partners", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menambahkan mitra",
                isSuccess: true,
              });
              this.$router.push("/partner");
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
          message: "Gagal menambahkan mitra",
          isSuccess: false,
        });
      }
      this.isLoadingAddPartner = false;
    },
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.uploadImage = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const imagePhoto = document.getElementById("image-add-partner");
        imagePhoto.src = srcImage;
      }
    },
    onSelectReward(reward) {
      this.rewardId = reward.id;
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
.add-user {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
