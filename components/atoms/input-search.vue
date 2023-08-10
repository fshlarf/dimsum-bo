<template>
  <div class="relative">
    <img
      v-if="withIcon"
      src="/icons/search.svg"
      alt="search"
      class="absolute right-[12px] top-1/2 -translate-y-1/2"
    />
    <input
      :type="type"
      name=""
      id=""
      :placeholder="placeholder"
      :class="`text-xs border-[1px] border-[#4338C926]/15  focus:outline-none rounded-[8px] py-[12px] px-[16px] w-[244px] focus:border-[#F6B205]/40 ${classInput}`"
    />
  </div>
</template>
<script>
export default {
  props: {
    withIcon: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    classInput: {
      type: String,
      default: "",
    },
  },
};
</script>
