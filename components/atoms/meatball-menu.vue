<template>
  <div class="">
    <div class="relative">
      <section
        v-if="isShow"
        class="bg-[#F8FAFB] border-[1px] border-[#E6EEF1] absolute w-max right-[90%] top-[20px]"
      >
        <ul class="w-full">
          <li
            v-for="(option, id) in options"
            :key="id"
            class="py-[8px] px-[8px] min-w-[116px] hover:opacity-70 hover:bg-[#E6EEF1] cursor-pointer"
            :class="`${id > 0 ? 'border-t-[0.5px] border-[#D9D9D9]' : ''}`"
            @click="$emit('onSelect', option)"
          >
            <div class="flex items-center gap-[4px]">
              <img :src="`/icons/${option.icon}.svg`" :alt="option.value" />
              <p class="text-[#66738F]">{{ option.name }}</p>
            </div>
          </li>
        </ul>
      </section>
      <div
        class="w-[20px] h-[20px] rounded-full bg-black/40 flex justify-center items-center"
      >
        <img
          src="/icons/kebab-2.svg"
          alt="menu"
          class="cursor-pointer"
          @click="$emit('clickMenu')"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      typeof: Boolean,
      default: false,
    },
    options: {
      typeof: Array,
      default: () => [],
    },
  },
};
</script>
