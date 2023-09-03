<template>
  <div>
    <label v-if="label" for="text-area">{{ label }}</label>
    <textarea
      class="w-full mt-[8px] text-base text-[#2D2D2D] border-[1px] border-[#A0A3BD]/30 rounded-[8px] py-[10px] px-[16px] resize-none focus:outline-[#F6B205]/40"
      :class="classText"
      :value="value"
      @input="$emit('input', $event.target.value)"
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
    value: {
      typeof: String | Number,
      default: null,
    },
    classText: {
      typeof: String,
      default: "",
    },
  },
};
</script>
