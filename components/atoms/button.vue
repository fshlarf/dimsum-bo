<template>
  <button :class="` hover:opacity-80 ${btnClass} `" @click="$emit('click')">
    <slot> </slot>
  </button>
</template>
<script>
export default {
  props: {
    btnClass: {
      type: String,
      default: "",
    },
  },
};
</script>
