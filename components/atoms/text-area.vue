<template>
  <div :class="classText">
    <label v-if="label" for="text-area">{{ label }}</label>
    <textarea
      class="w-full h-full mt-[8px] text-base text-[#2D2D2D] border-[1px] border-[#A0A3BD]/30 rounded-[8px] py-[10px] px-[16px] resize-none focus:outline-[#F6B205]/40"
      :value="valueText"
    ></textarea>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      typeof: String,
      default: "",
    },
    valueText: {
      typeof: String,
      default: "",
    },
    classText: {
      typeof: String,
      default: "",
    },
  },
};
</script>
