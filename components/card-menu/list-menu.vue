<template>
  <div class="p-[24px]">
    <ul class="">
      <li class="flex justify-between items-center gap-[271px]">
        <div class="flex items-center gap-[12px] text-sm text-[#66738F]">
          <img src="/icons/portfolio/ham-menu.svg" alt="menu" />
          <p>{{ title }}</p>
        </div>
        <div @click="isOpen = !isOpen" id="kebab-menu">
          <KebabMenu :is-show="isOpen" @edit="$emit('clickEdit')" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import KebabMenu from "../../components/atoms/kebab-menu.vue";

export default {
  components: {
    KebabMenu,
  },
  props: {
    title: {
      typeof: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    this.closeMenu();
  },
  methods: {
    closeMenu() {
      const portfolio = document.getElementById("card-option");
      portfolio.addEventListener("click", (e) => {
        if (e.target.tagName != "IMG") {
          this.isOpen = false;
        }
      });
    },
  },
};
</script>
