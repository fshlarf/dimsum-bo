<template>
  <button
    :disabled="disabled || loading"
    :class="` hover:opacity-80 ${btnClass} `"
    @click="onClick"
  >
    <div v-if="loading" class="flex items-center gap-1">
      <span class="animate-spin">
        <img class="w-4 h-4" src="/icons/spinner-white.svg" alt="loading" />
      </span>
      <p>Loading...</p>
    </div>
    <div v-else>
      <slot> </slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (!this.loading && !this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>
