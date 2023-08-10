<template>
  <div class="py-[30px]">
    <table class="w-full">
      <tbody>
        <tr class="text-left text-[#2D2D2D]">
          <th class="px-[20px] pb-[20px]">No</th>
          <th class="pb-[20px]">Name</th>
          <th class="pb-[20px]">Phone</th>
          <th class="pb-[20px]">Email</th>
          <th class="pb-[20px]">Action</th>
        </tr>
        <tr
          v-for="(list, id) in dataList"
          :key="id"
          class="text-left text-[#66738F]"
          :class="{ 'bg-[#FBFBFD]': id % 2 == 0 }"
        >
          <td class="py-[15px] px-[20px]">{{ id + 1 }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.phone }}</td>
          <td>{{ list.email }}</td>
          <td class="flex gap-[16px] items-center py-[15px]">
            <div class="flex gap-[4px]">
              <img
                src="/icons/dashboard/edit.svg"
                alt="edit"
                class="cursor-pointer"
              />
              <h3 class="text-sm font-medium text-[#0194F3] cursor-pointer">
                Edit
              </h3>
            </div>
            <div class="flex gap-[4px]">
              <img
                src="/icons/dashboard/trash.svg"
                alt="delete"
                class="cursor-pointer"
              />
              <h3 class="text-sm font-medium text-[#FF6E79] cursor-pointer">
                Edit
              </h3>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style>
th {
  color: #2d2d2d;
  font-size: 14px;
  font-weight: 500;
}
</style>
