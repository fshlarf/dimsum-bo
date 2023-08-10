<template>
  <div
    class="pt-[30px] lg:pt-[91px] overflow-x-scroll lg:px-[20px] xl:px-[95px] min-w-full w-max"
  >
    <div class="bg-white rounded-[15px]">
      <header
        class="flex items-center justify-between bg-[#FFFEFA] p-[20px] rounded-t-[15px]"
      >
        <h2 class="title-text text-[#2D2D2D] font-medium">List User</h2>
        <div class="relative w-max">
          <Input
            :withIcon="true"
            placeholder="Search here.."
            classInput="lg:!w-[524px]"
          />
        </div>
      </header>
      <section>
        <TableList :data-list="users" />
      </section>
      <footer class="bg-[#FFFEFA] rounded-b-[15px] py-[20px]">
        Pagination
      </footer>
    </div>
  </div>
</template>

<script>
import Input from "~/components/atoms/input-search.vue";
import TableList from "~/components/dashboard/table-list.vue";

export default {
  components: {
    Input,
    TableList,
  },
  layout: "dashboard",
  data() {
    return {
      users: null,
      pagination: {
        currentPage: 2,
        limit: 10,
      },
    };
  },
  methods: {
    async getUsers() {
      const res = await this.$axios.get(
        `/users?page=${this.pagination.currentPage}&limit=${this.pagination.limit}`
      );
      this.users = res.data.data;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
