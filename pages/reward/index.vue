<template>
  <div class="pt-[54px]">
    <div class="mx-auto w-max p-[32px] rounded-[12px]" id="card-option">
      <div>
        <section class="flex justify-between items-center">
          <h3 class="text-base lg:text-[20px] text-[#2D2D2D] font-semibold">
            Reward
          </h3>
          <Button
            v-if="!isLoading && rewards.length < 6"
            class="bg-[#F6B205] text-white font-semibold text-sm py-[10px] px-[16px] rounded-[8px]"
            @click="onClickAddReward"
            >Tambah Reward</Button
          >
        </section>
        <section
          v-if="!isLoading"
          class="border-[1px] border-[#A0A3BD]/30 mt-[12px] rounded-[10px]"
        >
          <ListMenu
            v-for="(reward, id) in rewards"
            :key="id"
            :reward="reward"
            :reward-options="rewardOptions"
            @onSelect="onSelectRewardOption"
          />
        </section>
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
      isOpen: false,
      editReward: false,
      addReward: false,
      rewards: [],
      isLoading: true,
      isLoadingDeleteReward: false,
      rewardOptions: [
        {
          name: "Edit",
          value: "edit",
          icon: "edit",
        },
        {
          name: "Hapus",
          value: "delete",
          icon: "trash-outline",
        },
      ],
    };
  },
  mounted() {
    this.getRewards();
  },
  methods: {
    onClickAddReward() {
      this.$router.push("/reward/add");
    },
    async getRewards() {
      this.isLoading = true;
      try {
        const getRewards = await this.$axios.get("/rewards", {
          params: {
            page: 1,
            limit: 100,
          },
        });
        this.rewards = getRewards.data.data;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    onSelectRewardOption(option, reward) {
      if (option.value == "edit") {
        this.$router.push(`/reward/edit?id=${reward.id}`);
      } else if (option.value == "delete") {
        this.deleteReward(reward.id);
      }
    },
    async deleteReward(id) {
      this.isLoadingDeleteReward = true;
      try {
        await this.$axios.delete(`/rewards/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus reward",
              isSuccess: true,
            });
            this.getRewards();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menghapus reward",
          isSuccess: false,
        });
      }
      this.isLoadingDeleteReward = false;
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
