<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="add-product p-[32px] rounded-[12px] w-max relative">
      <FormAddProduct title="Tambah Produk" />
    </div>
  </div>
</template>
<script>
import FormAddProduct from "~/components/product/form-add-product.vue";
export default {
  layout: "dashboard",
  components: {
    FormAddProduct,
  },
};
</script>
<style scoped>
.add-product {
  border: 1px solid #eceef6;
  background: #ffff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
