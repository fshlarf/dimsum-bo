<template>
  <div :class="`${addClass}`">
    <label v-if="label" class="text-base text-[#2D2D2D]">{{ label }} </label>
    <input
      :placeholder="placeholder"
      type="text"
      name=""
      id=""
      class="input-text mt-[8px] rounded-[8px] py-[10px] px-[16px] block focus:outline-[#F6B205]/40"
      :class="`${classInput}`"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: {
      typeof: String,
      default: "",
    },
    addClass: {
      typeof: String,
      default: "",
    },
    classInput: {
      typeof: String,
      default: "",
    },
    placeholder: {
      typeof: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.input-text {
  border: 1px solid rgba(160, 163, 189, 0.3);
}
</style>
