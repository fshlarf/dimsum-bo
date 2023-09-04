<template>
  <div class="wrapper max-w-[500px]">
    <div
      class="mx-auto p-[20px] lg:p-[32px] rounded-[12px] card-option"
      id="reward-option"
    >
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
          class="border-[1px] border-[#A0A3BD]/30 mt-[12px] rounded-[10px] w-full lg:w-auto"
        >
          <template v-if="rewards.length > 0">
            <DraggableList
              :list="rewards"
              :options="rewardOptions"
              @onSelectOption="onSelectRewardOption"
              @updateListOrder="updateRewardsOrder"
            />
            <!-- <ListMenu
              v-for="(reward, id) in rewards"
              :key="id"
              :reward="reward"
              :reward-options="rewardOptions"
              @onSelect="onSelectRewardOption"
            /> -->
          </template>
          <div v-else class="w-full h-[300px] flex items-center justify-center">
            <div>
              <img
                class="mx-auto"
                src="/icons/not-found.svg"
                alt="portfolio not found"
              />
              <p class="text-center text-[12px] mt-4">Data belum tersedia</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <ModalConfirmation ref="modalConfirmation" />
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import ListMenu from "~/components/reward/list-menu.vue";
import Input from "~/components/atoms/input.vue";
import InputFile from "~/components/atoms/input-file.vue";
import ModalConfirmation from "~/components/atoms/modal-confirmation.vue";
import DraggableList from "~/components/molleculs/draggable-list.vue";

export default {
  layout: "dashboard",
  middleware: ["auth"],
  components: {
    Button,
    ListMenu,
    Input,
    InputFile,
    ModalConfirmation,
    DraggableList,
  },
  data() {
    return {
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
        this.rewards = getRewards.data.data.map((reward) => {
          return {
            ...reward,
            title: reward.name,
            isOpen: false,
          };
        });
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    onSelectRewardOption(option, reward) {
      if (option.value == "edit") {
        this.$router.push(`/reward/edit?id=${reward.id}`);
      } else if (option.value == "delete") {
        this.onClickDeleteReward(reward.id);
      }
    },
    async onClickDeleteReward(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus reward",
        message: "Ingin menghapus reward?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (confirmation) {
        this.deleteReward(id);
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
    async updateRewardsOrder(list) {
      for (var i = 0; i < list.length; i++) {
        const reward = list[i];
        const payload = {
          id: reward.id,
          sequence: i + 1,
        };
        await this.updateRewardSequence(payload);
      }
      this.$snackbar.show({
        message: "Success",
        isSuccess: true,
      });
    },
    async updateRewardSequence(data) {
      this.isLoadingUpdatePortfolioSequence = true;
      try {
        await this.$axios.patch(`/rewards/${data.id}/sequence`, {
          sequence: data.sequence,
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal mengurut ulang portfolio",
          isSuccess: false,
        });
      }
      this.isLoadingUpdatePortfolioSequence = false;
    },
  },
};
</script>

<style scoped>
.card-option {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
