<template>
  <div class="wrapper lg:px-[70px] xl:px-[120px]">
    <div class="bg-white rounded-[15px]">
      <header
        class="flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between bg-[rgb(255,254,250)] p-[20px] rounded-t-[15px]"
      >
        <h2 class="text-base lg:text-lg text-[#2D2D2D] font-medium">
          List Mitra
        </h2>
        <div
          class="relative flex items-center justify-between lg:justify-normal gap-[10px] mt-[20px] lg:mt-0"
        >
          <InputSearch
            v-model="filterGetPartnerss.search"
            placeholder="Search here.."
            classInput="xl:w-[500px] lg:w-[250px] w-full"
            @enter="getPartners"
          />
          <nuxt-link to="/partner/add">
            <Button
              class="text-sm text-white bg-[#F6B205] p-[10px] rounded-[8px] whitespace-nowrap button-text"
              >Tambah Mitra</Button
            >
          </nuxt-link>
        </div>
      </header>
      <section>
        <TableList :data-list="partners.list" @delete="onClickDeletePartner" />
      </section>
      <footer
        v-if="!isLoading && partners.list.length > 0"
        class="bg-[#FFFEFA] rounded-b-[15px] py-[20px] w-full"
      >
        <Pagination
          class="!mx-auto w-max"
          :is-loading="isLoading"
          :pagination="partners.pagination"
          :max-displayed-pages="10"
          @onClickPagination="onClickPagination"
        />
      </footer>
    </div>

    <ModalConfirmation ref="modalConfirmation" />
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import InputSearch from "~/components/atoms/input-search.vue";
import TableList from "~/components/partner/table-list.vue";
import Pagination from "~/components/molleculs/pagination.vue";
import ModalConfirmation from "~/components/atoms/modal-confirmation.vue";

export default {
  middleware: ["auth"],
  components: {
    InputSearch,
    TableList,
    Pagination,
    Button,
    ModalConfirmation,
  },
  layout: "dashboard",
  data() {
    return {
      partners: {
        list: [],
        pagination: {},
      },
      filterGetPartnerss: {
        page: 1,
        limit: 10,
        search: "",
      },
      isLoading: true,
    };
  },
  mounted() {
    this.getPartners();
  },
  methods: {
    async getPartners() {
      this.isLoading = true;
      try {
        const getPartners = await this.$axios.get("/partners", {
          params: this.filterGetPartnerss,
        });
        if (getPartners.data) {
          const { data, pagination } = getPartners.data;
          this.partners = {
            ...this.partners,
            list: data,
            pagination,
          };
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    onClickPagination(page) {
      this.filterGetPartnerss = {
        ...this.filterGetPartnerss,
        page: page,
      };
      this.getPartners();
    },
    async onClickDeletePartner(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus mitra",
        message: "Ingin menghapus mitra?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (confirmation) {
        this.deletePartner(id);
      }
    },
    async deletePartner(id) {
      try {
        await this.$axios.delete(`/partners/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus Mitra",
              isSuccess: true,
            });
            this.getPartners();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menghapus Mitra",
          isSuccess: false,
        });
      }
    },
  },
};
</script>

<style></style>
