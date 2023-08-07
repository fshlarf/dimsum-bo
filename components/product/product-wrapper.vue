<template>
  <div class="">
    <div class="grid grid-cols-5 gap-x-[16px] gap-y-[20px]">
      <CardProduct
        v-for="(product, id) in listProduct"
        :key="id"
        :source-image="product.images"
        :product-name="product.name"
        @edit="$router.push('/dashboard/product/edit-product')"
      />
    </div>
  </div>
</template>
<script>
import Button from "~/components/atoms/button.vue";
import CardProduct from "./card-product.vue";
export default {
  components: {
    Button,
    CardProduct,
  },
  props: {
    listProduct: {
      typeof: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style>
#product-wrapper {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
