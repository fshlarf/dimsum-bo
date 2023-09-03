<template>
  <div class="max-w-max relative">
    <label
      :for="id"
      class=""
      :class="`${!disabled ? 'cursor-pointer hover:opacity-60' : ''}`"
    >
      <img v-if="isChecked" src="/icons/checked.svg" alt="checked" />
      <img v-else src="/icons/uncheck.svg" alt="unchecked" />
    </label>
    <div
      v-if="disabled"
      class="absolute z-20 top-0 left-0 rounded-[3px] w-full h-full"
      :class="`${isChecked ? 'bg-white/40' : 'bg-black/5'}`"
    ></div>
    <input
      :id="id"
      class="checkbox hidden"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String | Object },
    modelValue: { default: "" },
    id: { default: "" },
    trueValue: { default: true },
    falseValue: { default: false },
    disabled: { type: Boolean, default: false },
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
      this.$emit("check");
    },
  },
};
</script>

<style></style>
