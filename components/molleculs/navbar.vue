<template>
  <header
    class="h-[74px] w-full bg-white flex items-center relative"
    id="header"
  >
    <nav
      class="px-[20px] md:px-[40px] lg:px-[55px] xl:px-[64px] flex justify-between w-full items-center h-full"
    >
      <div class="flex items-center gap-[4px] font-bold text-[#B71A1B] text-sm">
        <img src="/icons/side-bar/gear.svg" alt="gear" />
        <h3>Management</h3>
      </div>
      <div @click="isOpen = !isOpen">
        <img
          v-if="!isOpen"
          src="/icons/navbar/hamburger-menu.svg"
          alt="menu"
          class="md:hidden"
        />
        <img
          v-else
          src="/icons/navbar/round-close.svg"
          alt="close"
          class="md:hidden"
        />
      </div>
      <h3 class="hidden md:block">Admin</h3>
    </nav>
    <Sidebar
      :is-show="isOpen"
      class="absolute top-[95%] right-[34px] md:hidden z-50"
      @handleClick="isOpen = false"
    />
  </header>
</template>
<script>
import Sidebar from "./side-bar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
<style scoped>
#header {
  border: 1px solid rgba(232, 232, 232, 0.6);
}
</style>
