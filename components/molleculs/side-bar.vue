<template>
  <div>
    <!-- max screen 768px -->
    <section
      class="md:hidden space-y-[8px] bg-[#F6B205] w-[243px] min-h-screen"
      id="mobile-menu"
      v-show="isShow"
    >
      <div
        class="flex items-center justify-between pt-[35px] px-[20px] pb-[12px]"
      >
        <h3 class="text-base font-semibold text-white">Menu</h3>
        <img
          src="/icons/side-bar/close.svg"
          alt="close"
          @click="$emit('clickCloseButton'), (isShow = false)"
        />
      </div>
      <hr class="border-[1px] border-white/[35%]" />
      <div
        v-for="(menu, id) in menus"
        :key="id"
        class="w-full"
        @click="$emit('handleClick'), (isShow = false)"
      >
        <nuxt-link
          :to="menu.link"
          class="flex items-center gap-[8px] p-[16px]"
          :class="{
            'bg-white/[25%] ': activePage === menu.slug,
          }"
        >
          <img
            :src="`/icons/side-bar/${menu.icon}-mobile.svg`"
            :alt="menu.name"
          />
          <h4 class="text-white font-medium text-sm">
            {{ menu.name }}
          </h4>
        </nuxt-link>
      </div>
      <hr class="border-[1px] border-white/[35%]" />
      <section
        class="flex items-center gap-[8px] p-[16px] mt-[35px] cursor-pointer"
        @click="logout"
      >
        <img src="/icons/side-bar/logout-mobile.svg" alt="logout" />
        <h4 class="text-white font-medium text-sm">Log out</h4>
      </section>
    </section>
    <!-- end -->
    <!-- min screen 768px -->
    <section
      id="wrapper"
      class="md:w-[200px] lg:w-[220px] xl:w-[244px] min-h-screen z-40 fixed top-0 hidden md:block"
    >
      <div
        class="flex items-center gap-[4px] h-[74px] text-[#B71A1B] text-base xl:text-[18px] pl-[20px] cursor-pointer"
      >
        <img src="/icons/side-bar/gear.svg" alt="gear" />
        <h3>Management</h3>
      </div>
      <section class="mt-[32px] space-y-[16px]">
        <nuxt-link
          :to="menu.link"
          class="flex items-center gap-[8px] font-medium text-base py-[13px] relative"
          :class="{
            'bg-[#F6B205]/10 ': activePage === menu.slug,
          }"
          v-for="(menu, id) in menus"
          :key="id"
        >
          <div
            v-show="activePage === menu.slug"
            class="absolute left-0 w-[5px] rounded-r-lg bg-[#F6B205] top-0 bottom-0 my-2"
          ></div>
          <img
            class="pl-[20px]"
            :src="[
              activePage === menu.slug
                ? `/icons/side-bar/${menu.icon}-active.svg`
                : `/icons/side-bar/${menu.icon}.svg `,
            ]"
            :alt="menu.name"
          />
          <h4 :class="{ 'text-[#F6B205]': activePage === menu.slug }">
            {{ menu.name }}
          </h4>
        </nuxt-link>
      </section>
      <section
        class="flex items-center gap-[8px] pl-[20px] mt-[114px] cursor-pointer"
        @click="logout"
      >
        <img src="/icons/side-bar/logout.svg" alt="logout" />
        <h4>Log out</h4>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activePage: "",
      menus: [
        {
          name: "User",
          link: "/",
          slug: "",
          icon: "dashboard",
        },
        {
          name: "Mitra",
          link: "/partner",
          slug: "partner",
          icon: "dashboard",
        },
        {
          name: "Portofolio",
          link: "/portfolio",
          slug: "portfolio",
          icon: "portfolio",
        },

        {
          name: "Pengumuman",
          link: "/announcement",
          slug: "announcement",
          icon: "announce",
        },
        {
          name: "Produk & Harga",
          link: "/product",
          slug: "product",
          icon: "product",
        },
        {
          name: "Reward",
          link: "/reward",
          slug: "reward",
          icon: "reward",
        },
        {
          name: "Artikel",
          link: "/article",
          slug: "article",
          icon: "article",
        },
      ],
    };
  },
  props: {
    isShow: {
      typeof: Boolean,
      default: false,
    },
  },
  watch: {
    $route(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.activePage = this.$route.path.split("/").pop();
      }
    },
  },
  mounted() {
    this.activePage = this.$route.path.split("/").pop();
  },
  methods: {
    async logout() {
      const res = await this.$axios.post("/users/logout");
      if (res?.status === 200) {
        localStorage.removeItem("user_info");
        this.$snackbar.show({
          message: "Berhasil logout",
          isSuccess: true,
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
#wrapper {
  border: 1px solid rgba(232, 232, 232, 0.6);
  background: #fff;
  box-shadow: 0px 10px 20px 0px rgba(220, 224, 249, 0.5);
  color: #2d2d2d;
}
#mobile-menu {
  border-radius: 10px 0px 10px 10px;
  border: 1px solid rgba(217, 217, 217, 0.3);
  box-shadow: 0px 2px 10px 0px rgba(217, 217, 217, 0.3);
}
</style>
