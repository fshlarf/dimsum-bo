<template>
  <div class="pt-[54px] wrapper">
    <div
      class="mx-auto w-max p-[20px] lg:p-[32px] rounded-[12px] card-option"
      id="portfolio-option"
    >
      <div>
        <section class="flex justify-between items-center">
          <h3 class="text-base lg:text-[20px] text-[#2D2D2D] font-semibold">
            Portofolio
          </h3>
          <Button
            v-if="!isLoading"
            class="bg-[#F6B205] text-white font-semibold text-sm py-[10px] px-[16px] rounded-[8px]"
            @click="onClickAddPortfolio"
            >Tambah Portofolio</Button
          >
        </section>
        <section
          v-if="!isLoading"
          class="border-[1px] border-[#A0A3BD]/30 mt-[12px] rounded-[10px]"
        >
          <ListMenu
            v-for="(portfolio, id) in portfolios"
            :key="id"
            :portfolio="portfolio"
            :portfolio-options="portfolioOptions"
            @onSelect="onSelectPortfolioOption"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import ListMenu from "~/components/portfolio/list-menu.vue";
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
      portfolios: [],
      isLoading: true,
      isLoadingDeletePortfolio: false,
      portfolioOptions: [
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
    this.getPortfolios();
  },
  methods: {
    onClickAddPortfolio() {
      this.$router.push("/portfolio/add");
    },
    async getPortfolios() {
      this.isLoading = true;
      try {
        const getPortfolios = await this.$axios.get("/portfolios", {
          params: {
            page: 1,
            limit: 100,
          },
        });
        this.portfolios = getPortfolios.data.data;
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    onSelectPortfolioOption(option, portfolio) {
      if (option.value == "edit") {
        this.$router.push(`/portfolio/edit?id=${portfolio.id}`);
      } else if (option.value == "delete") {
        this.deletePortfolio(portfolio.id);
      }
    },
    async deletePortfolio(id) {
      this.isLoadingDeletePortfolio = true;
      try {
        await this.$axios.delete(`/portfolios/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus portfolio",
              isSuccess: true,
            });
            this.getPortfolios();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menghapus portfolio",
          isSuccess: false,
        });
      }
      this.isLoadingDeletePortfolio = false;
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
