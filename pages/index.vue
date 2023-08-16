<template>
  <div class="wrapper lg:px-[70px] xl:px-[120px]">
    <div class="bg-white rounded-[15px]">
      <header
        class="flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between bg-[rgb(255,254,250)] p-[20px] rounded-t-[15px]"
      >
        <h2 class="text-base lg:text-lg text-[#2D2D2D] font-medium">
          List User
        </h2>
        <div
          class="relative flex items-center justify-between lg:justify-normal gap-[10px] mt-[20px] lg:mt-0"
        >
          <InputSearch
            v-model="filterGetUsers.search"
            placeholder="Search here.."
            classInput="xl:w-[500px] lg:w-[250px] w-full"
            @enter="getUsers"
          />
          <nuxt-link to="/users/add-user">
            <Button
              class="text-sm text-white bg-[#F6B205] p-[10px] rounded-[8px] whitespace-nowrap button-text"
              >Tambah User</Button
            >
          </nuxt-link>
        </div>
      </header>
      <section>
        <TableList :data-list="users.list" @delete="onClickDeleteUser" />
      </section>
      <footer
        v-if="!isLoading && users.list.length > 0"
        class="bg-[#FFFEFA] rounded-b-[15px] py-[20px] w-full"
      >
        <Pagination
          class="!mx-auto w-max"
          :is-loading="isLoading"
          :pagination="users.pagination"
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
import TableList from "~/components/dashboard/table-list.vue";
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
      users: {
        list: [],
        pagination: {},
      },
      filterGetUsers: {
        page: 1,
        limit: 10,
        search: "",
      },
      isLoading: true,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      this.isLoading = true;
      try {
        const getUsers = await this.$axios.get("/users", {
          params: this.filterGetUsers,
        });
        if (getUsers.data) {
          const { data, pagination } = getUsers.data;
          this.users = {
            ...this.users,
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
      this.filterGetUsers = {
        ...this.filterGetUsers,
        page: page,
      };
      this.getUsers();
    },
    async onClickDeleteUser(id) {
      const confirmation = await this.$refs.modalConfirmation.show({
        title: "Hapus user",
        message: "Ingin menghapus user?",
        confirmText: "Ya, hapus",
        cancelText: "Batal",
      });
      if (confirmation) {
        this.deleteUser(id);
      }
    },
    async deleteUser(id) {
      try {
        await this.$axios.delete(`/users/${id}`).then((response) => {
          if (response.status == 201) {
            this.$snackbar.show({
              message: "Berhasil menghapus User",
              isSuccess: true,
            });
            this.getUsers();
          } else {
            throw new Error(response);
          }
        });
      } catch (error) {
        this.$snackbar.show({
          message: "Gagal menghapus User",
          isSuccess: false,
        });
      }
    },
  },
};
</script>

<style></style>
