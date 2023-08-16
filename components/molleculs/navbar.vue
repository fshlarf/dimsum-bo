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
        <nuxt-link to="/">
          <h3>Management</h3>
        </nuxt-link>
      </div>
      <div @click="isOpen = !isOpen">
        <img
          src="/icons/navbar/hamburger-menu.svg"
          alt="menu"
          class="md:hidden"
        />
      </div>
      <div class="md:flex gap-2 items-center hidden">
        <div
          v-if="user"
          class="w-[36px] h-[36px] rounded-full bg-[#F6B205]/10 flex justify-center items-center text-[#B71A1B] text-[20px] uppercase"
        >
          {{ generateInitialName(user.name) }}
        </div>
        <h3 v-if="user" class="hidden md:block">{{ user.name }}</h3>
      </div>
    </nav>
    <Sidebar
      :is-show="isOpen"
      class="fixed top-0 right-0 md:hidden z-50"
      @clickCloseButton="isOpen = false"
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
      user: undefined,
    };
  },
  mounted() {
    const userData = localStorage.getItem("user_info");
    this.user = JSON.parse(userData);
  },
  methods: {
    generateInitialName(nickname) {
      const words = nickname.split(" ");
      const initials = words
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase());
      return initials.join("");
    },
  },
};
</script>

<style scoped>
#header {
  border: 1px solid rgba(232, 232, 232, 0.6);
}
</style>
