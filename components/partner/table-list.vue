<template>
  <div class="py-[30px]">
    <table v-if="dataList.length > 0" class="w-full text-sm lg:text-base">
      <tbody>
        <tr class="text-left text-[#2D2D2D]">
          <th class="px-[20px] pb-[20px] w-[50px]">No</th>
          <th class="px-[20px] pb-[20px] w-[50px]"></th>
          <th class="pb-[20px]">Name</th>
          <th class="pb-[20px] hide-column">Phone</th>
          <th class="pb-[20px] hide-column">Email</th>
          <th class="pb-[20px] hide-column">Domicile</th>
          <th class="pb-[20px] hide-column">Reward</th>
          <th class="pb-[20px]">Action</th>
        </tr>
        <tr
          v-for="(list, id) in dataList"
          :key="id"
          class="text-left text-[#66738F]"
          :class="{ 'bg-[#FBFBFD]': id % 2 == 0 }"
        >
          <td class="py-[15px] px-[20px]">{{ id + 1 }}</td>
          <td>
            <img
              class="w-[28px] h-[28px] rounded-full object-cover object-center"
              :src="`http://localhost:16000/api/bucket/images/partners/${list.photoFilename}`"
              alt="profil mitra"
            />
          </td>
          <td>{{ list.name }}</td>
          <td class="hide-column">
            {{ list.phoneNumber ? list.phoneNumber : "-" }}
          </td>
          <td class="hide-column">{{ list.email ? list.email : "-" }}</td>
          <td class="hide-column">{{ list.address }}</td>
          <td class="hide-column">{{ list.rewardName }}</td>
          <td class="flex gap-[16px] items-center py-[15px]">
            <div class="flex gap-[4px]" @click="onClickEdit(list.id)">
              <img
                src="/icons/dashboard/edit.svg"
                alt="edit"
                class="cursor-pointer"
              />
              <h3 class="text-sm font-medium text-[#0194F3] cursor-pointer">
                Edit
              </h3>
            </div>
            <div class="flex gap-[4px]" @click="$emit('delete', list.id)">
              <img
                src="/icons/dashboard/trash.svg"
                alt="delete"
                class="cursor-pointer"
              />
              <h3 class="text-sm font-medium text-[#FF6E79] cursor-pointer">
                Delete
              </h3>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="w-full h-[400px] flex items-center justify-center">
      <div>
        <img class="mx-auto" src="/icons/not-found.svg" alt="user not found" />
        <p class="text-center mt-4 text-[12px]">Data mitra belum tersedia</p>
      </div>
    </div>
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
  methods: {
    onClickEdit(id) {
      this.$router.push(`/partner/edit?id=${id}`);
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
@media screen and (max-width: 1000px) {
  .hide-column {
    display: none;
  }
}
</style>
