<template>
  <div
    class="bg-[#F6B205]/20 text-[#F6B205] w-max mx-auto rounded-r-[20px] rounded-l-[20px] flex justify-between gap-[20px] relative cursor-pointer"
  >
    <div
      class="absolute text-white bg-[#F6B205] h-full w-1/2 rounded-l-[20px] rounded-r-[20px] flex items-center justify-center py-[12px] text-center cursor-pointer transition-all ease-linear duration-200"
      :class="{ 'translate-x-full': toggle }"
    >
      {{ !toggle ? "Produk Dimsum" : "Varian Harga" }}
    </div>
    <h3 class="py-[12px] px-[30px]">Produk Dimsum</h3>
    <h3 class="py-[12px] px-[30px]">Varian Harga</h3>
  </div>
</template>
<script>
export default {
  props: {
    toggle: {
      typeof: Boolean,
      default: false,
    },
  },
  //   data() {
  //     return {
  //       isSwitch: false,
  //     };
  //   },
};
</script>
