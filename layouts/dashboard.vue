<template>
  <div class="w-full">
    <Navbar />
    <SideBar />
    <div
      class="min-h-screen h-max w-full md:pl-[200px] lg:pl-[220px] xl:pl-[244px] bg-[#F8FAFB]"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/molleculs/navbar.vue";
import SideBar from "~/components/molleculs/side-bar.vue";

export default {
  components: {
    Navbar,
    SideBar,
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  width: 100%;
}
</style>
