<template>
  <div class="wrapper lg:px-[70px] xl:px-[120px]">
    <div class="bg-white rounded-[15px]">
      <header
        class="flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between bg-[#FFFEFA] p-[20px] rounded-t-[15px]"
      >
        <h2 class="text-base lg:text-lg text-[#2D2D2D] font-medium">
          List User
        </h2>
        <div
          class="relative flex items-center justify-between lg:justify-normal gap-[10px] mt-[20px] lg:mt-0"
        >
          <Input
            :withIcon="true"
            placeholder="Search here.."
            classInput="xl:w-[500px] lg:w-[250px] w-full"
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
        <TableList :data-list="users.list" @delete="deleteUser" />
      </section>
      <footer class="bg-[#FFFEFA] rounded-b-[15px] py-[20px] w-max mx-auto">
        <Pagination
          :is-loading="isLoading"
          :pagination="users.pagination"
          :max-displayed-pages="10"
          @onClickPagination="onClickPagination"
        />
      </footer>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import Input from "~/components/atoms/input-search.vue";
import TableList from "~/components/dashboard/table-list.vue";
import Pagination from "~/components/molleculs/pagination.vue";

export default {
  components: {
    Input,
    TableList,
    Pagination,
    Button,
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
        this.$snackbar.show({
          message: "Terjadi kesalahan",
          isSuccess: false,
        });
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
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
