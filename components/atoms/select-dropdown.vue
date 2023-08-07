<template>
  <div :class="`mt-[40px] relative ${addClass}`">
    <label v-if="label">{{ label }}</label>
    <div
      :class="[isOpen ? 'rounded-t-[8px]' : 'rounded-[8px]']"
      class="h-[45px] border-[1px] border-[#A0A3BD]/30 justify-between cursor-pointer relative mt-[8px]"
      @click="isOpen = !isOpen"
    >
      <div
        class="absolute top-1/2 -translate-y-1/2 flex justify-between items-center w-full px-[16px]"
      >
        <p class="">{{ value ? value : options[0] }}</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="transition-all ease-in-out duration-200"
          :class="{ 'rotate-180': isOpen }"
        >
          <path
            d="M3.0625 5.03125L7 8.96875L10.9375 5.03125"
            stroke="#2D2D2D"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <section
      v-if="isOpen"
      class="absolute top-[100%] right-0 left-0 bg-white shadow rounded-b border-[1px] border-[#A0A3BD]/30"
    >
      <ul class="py-[12px] px-[16px] text-[#A0A3BD]">
        <li
          class="cursor-pointer py-[2px] hover:text-black"
          v-for="(option, id) in options"
          :key="id"
          @click="getValue(option)"
        >
          {{ option }}
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
      value: "",
    };
  },
  props: {
    label: {
      typeof: String,
      default: "",
    },
    options: {
      typeof: Array,
      default: () => [],
    },
    addClass: {
      typeof: Array,
      default: () => [],
    },
  },
  methods: {
    getValue(val) {
      this.value = val;
    },
  },
};
</script>
