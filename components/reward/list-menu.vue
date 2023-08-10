<template>
  <div class="p-[24px]">
    <ul class="">
      <li class="flex justify-between items-center">
        <div class="flex items-center gap-[12px] text-sm text-[#66738F]">
          <img src="/icons/portfolio/ham-menu.svg" alt="menu" />
          <p>{{ reward.name }}</p>
        </div>
        <div @click="isOpen = !isOpen" id="kebab-menu">
          <KebabMenu
            :is-show="isOpen"
            @onSelect="onSelect"
            :options="rewardOptions"
          />
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
    reward: {
      typeof: Object,
      default: () => {},
    },
    rewardOptions: {
      typeof: Array,
      default: () => [],
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
      const reward = document.getElementById("reward-option");
      reward.addEventListener("click", (e) => {
        if (e.target.tagName != "IMG") {
          this.isOpen = false;
        }
      });
    },
    onSelect(option) {
      this.isOpen = false;
      this.$emit("onSelect", option, this.reward);
    },
  },
};
</script>
