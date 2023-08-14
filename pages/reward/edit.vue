<template>
  <div class="wrapper">
    <div
      class="mx-auto lg:max-w-[500px] xl:max-w-[800px] p-[20px] lg:p-[32px] rounded-[12px] edit-reward relative"
    >
      <header class="text-[#2D2D2D] title-text font-semibold">
        Edit Reward
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="mt-[40px]">
        <Input
          v-model="name"
          label="Jenis Reward"
          addClass="mt-[30px]"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="description"
          label="Ketentuan Reward"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          btnClass="text-white bg-[#F6B205] button-textfont-semibold !px-[24px] py-[8px] rounded-[8px]"
          @click="onSaveReward"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import Input from "~/components/atoms/input.vue";
import InputFile from "~/components/atoms/input-file.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    Input,
    InputFile,
  },
  data() {
    return {
      editReward: false,
      addReward: false,
      reward: {},
      rewardId: null,
      name: "",
      description: "",
      isLoading: true,
      isLoadingEditReward: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.rewardId = id;
      this.getRewardById();
    }
  },
  methods: {
    async getRewardById() {
      this.isLoading = true;
      try {
        const getReward = await this.$axios.get(`/rewards/${this.rewardId}`);
        if (getReward.data) {
          this.reward = getReward.data.data;
          this.name = this.reward.name;
          this.description = this.reward.description;
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async onSaveReward() {
      if (!this.name || !this.description) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingEditReward = true;
      try {
        await this.$axios
          .patch(`/rewards/${this.rewardId}`, {
            name: this.name,
            description: this.description,
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menyimpan reward",
                isSuccess: true,
              });
              this.$router.push("/reward");
            } else {
              throw new Error(response);
            }
          });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menyimpan reward",
          isSuccess: false,
        });
      }
      this.isLoadingEditReward = false;
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
