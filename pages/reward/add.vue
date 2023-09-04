<template>
  <div class="wrapper">
    <div
      class="mx-auto lg:max-w-[500px] xl:max-w-[800px] p-[20px] lg:p-[32px] rounded-[12px] edit-reward relative"
    >
      <header class="text-[#2D2D2D] title-text font-semibold">
        Tambah Reward
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="w-full mt-[40px]">
        <Input
          v-model="name"
          label="Jenis Reward"
          addClass="mt-[30px]"
          classInput="w-full text-xs md:text-sm"
          placeholder="Masukkan jenis reward disini"
        />
        <Input
          v-model="description"
          label="Ketentuan Reward"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
          placeholder="Masukkan ketentuan reward disini"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          :loading="isLoadingAddReward"
          btnClass="text-white bg-[#F6B205] button-text font-semibold !px-[24px] py-[8px] rounded-[8px]"
          @click="OnClickSaveReward"
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

export default {
  layout: "dashboard",
  components: {
    Button,
    ListMenu,
    Input,
    InputFile,
  },
  data() {
    return {
      name: "",
      description: "",
      isLoadingAddReward: false,
    };
  },
  methods: {
    async OnClickSaveReward() {
      if (!this.name || !this.description) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingAddReward = true;
      try {
        await this.$axios
          .post("/rewards", {
            name: this.name,
            description: this.description,
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menambahkan reward",
                isSuccess: true,
              });
              this.$router.push("/reward");
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
          message: "Gagal menambahkan reward",
          isSuccess: false,
        });
      }
      this.isLoadingAddReward = false;
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
.edit-reward {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
