<template>
  <div class="relative">
    <section
      v-if="isShow"
      class="bg-[#F8FAFB] border-[1px] border-[#E6EEF1] absolute w-max right-[90%] top-[20px]"
    >
      <ul class="w-full">
        <li
          class="flex items-center gap-[4px] py-[8px] pl-[8px] pr-[30px] hover:opacity-70 hover:bg-[#E6EEF1] cursor-pointer"
          @click="$emit('edit')"
        >
          <img src="/icons/edit.svg" alt="edit" />
          <p>Edit</p>
        </li>
        <li><hr class="w-[80%] mx-auto bg-[#D9D9D9]" /></li>
        <li
          class="flex items-center gap-[4px] py-[8px] pl-[8px] pr-[30px] hover:opacity-70 hover:bg-[#E6EEF1] cursor-pointer"
        >
          <img src="/icons/trash-outline.svg" alt="delet" />
          <p>Delete</p>
        </li>
      </ul>
    </section>
    <img
      src="/icons/dashboard/meatball-menu.svg"
      alt="menu"
      class="cursor-pointer"
      @click="$emit('clickMenu')"
    />
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      typeof: Boolean,
      default: false,
    },
  },
};
</script>
