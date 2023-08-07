<template>
  <div>
    <section class="w-[164px]">
      <img
        :src="sourceImage"
        alt="dimsum"
        class="rounded-[10px] w-[164px] h-[124px]"
      />
      <div class="flex justify-between items-center mt-[8px]">
        <p class="text-xs text-[#2D2D2D]">{{ productName }}</p>
        <MeatballMenu
          :is-show="isOpen"
          @clickMenu="isOpen = !isOpen"
          @edit="$emit('edit')"
        />
      </div>
    </section>
  </div>
</template>
<script>
import MeatballMenu from "../atoms/meatball-menu.vue";
export default {
  components: {
    MeatballMenu,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    sourceImage: {
      typeof: String,
      default: "",
    },
    productName: {
      typeof: String,
      default: "",
    },
  },
};
</script>
