<template>
  <div>
    <section class="w-[164px]">
      <div class="w-[164px] h-[124px] rounded-[10px] overflow-hidden">
        <img
          alt="dimsum"
          class="w-full h-full object-cover object-center"
          :id="`product-image-${product.id}`"
        />
      </div>
      <div class="flex justify-between items-center mt-[8px]">
        <p class="text-xs text-[#2D2D2D]">{{ product.name }}</p>
        <MeatballMenu
          :is-show="isOpen"
          :options="productOptions"
          @clickMenu="isOpen = !isOpen"
          @onSelect="onSelectProductOption"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MeatballMenu from "../atoms/meatball-menu.vue";

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
        const url = `bucket/images/products/${fileName}`;
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
  },
};
</script>
