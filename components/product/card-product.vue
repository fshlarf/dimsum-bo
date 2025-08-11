<template>
  <div>
    <section class="w-full rounded-[10px] pb-3 shadow-md">
      <div
        class="rounded-[10px] w-full h-[135px] lg:h-[124px] overflow-hidden mx-auto relative"
      >
        <MeatballMenu
          :is-show="isOpen"
          :options="productOptions"
          @clickMenu="isOpen = !isOpen"
          @onSelect="onSelectProductOption"
          class="absolute z-30 top-1 right-1"
        />
        <img
          :src="product.imageLink"
          alt="dimsum"
          class="w-full h-full object-cover object-center"
          :id="`product-image-${product.id}`"
        />
      </div>
      <div class="flex justify-between items-center mt-[8px] px-2">
        <p
          class="text-[10px] lg:text-xs text-[#2D2D2D] one-line overflow-hidden"
        >
          {{ product.name }}
        </p>
        <button @click="$emit('onClickFavorite', product)">
          <img
            v-if="product.isFavorited"
            src="/icons/star-active.svg"
            alt="produk favorit"
          />
          <img v-else src="/icons/star-empty.svg" alt="produk biasa" />
        </button>
      </div>

      <div class="grid grid-cols-2">
        <div
          v-for="(variant, id) in product.variants"
          :key="id"
          class="px-2 mt-1 md:mt-2 space-y-1 md:space-y-2"
        >
          <div class="flex items-center gap-1">
            <img
              class="w-[12px] md:w-[16px]"
              src="/icons/product/box.svg"
              alt="pcs"
            />
            <p class="text-[10px] md:text-[12px]">
              {{ variant.quantity }}
              {{ variant.unit.toLowerCase() }}/
              {{ variant.packaging }}
            </p>
          </div>
          <div class="flex items-center gap-1">
            <img
              class="w-[12px] md:w-[16px]"
              src="/icons/product/price-tag1.svg"
              alt="reseller"
            />
            <p class="text-[10px] md:text-[12px]">
              {{ toRupiah(variant.resellerPrice) }}
            </p>
          </div>
          <div class="flex items-center gap-1">
            <img
              class="w-[12px] md:w-[16px]"
              src="/icons/product/price-tag2.svg"
              alt="agent"
            />
            <p class="text-[10px] md:text-[12px]">
              {{ toRupiah(variant.agentPrice) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MeatballMenu from "../atoms/meatball-menu.vue";
import { toRupiah } from "~/helpers/common.js";

export default {
  components: {
    MeatballMenu,
  },
  data() {
    return {
      isOpen: false,
      productOptions: [
        {
          name: "Edit",
          value: "edit",
          icon: "edit",
        },
        {
          name: "Hapus",
          value: "delete",
          icon: "trash-outline",
        },
      ],
    };
  },
  props: {
    product: {
      typeof: Object,
      default: () => {},
    },
  },
  watch: {
    product(val) {
      this.getArticleImage(val.fileName);
    },
  },
  mounted() {
    this.getArticleImage(this.product.fileName);
  },
  methods: {
    onSelectProductOption(option) {
      this.$emit("onSelectOption", option, this.product);
      this.isOpen = false;
    },
    async getArticleImage(fileName) {
      if (fileName) {
        // const url = `bucket/images/products/${fileName}`;
        const url = fileName;
        await this.$axios
          .get(url, {
            responseType: "blob",
          })
          .then((response) => {
            const responseType = response.headers["content-type"];
            const responseData = response.data;

            // Convert the response data to a Blob
            const blob = new Blob([responseData], { type: responseType });

            // Create a new File object with the Blob
            const imageFile = new File([blob], fileName, {
              type: responseType,
            });

            const srcImage = URL.createObjectURL(imageFile);
            const bannerImage = document.getElementById(
              `product-image-${this.product.id}`
            );
            bannerImage.src = srcImage;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    toRupiah,
  },
};
</script>
