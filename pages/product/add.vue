<template>
  <div class="pt-[54px] w-max mx-auto">
    <div class="add-product p-[32px] rounded-[12px] w-max relative">
      <header class="text-[20px] font-semibold">Tambah Produk</header>
      <hr class="absolute left-0 right-0 my-[24px]" />
      <div class="mt-[48px] w-[700px]">
        <!-- upload image -->
        <div class="relative">
          <div class="">
            <p>Gambar</p>
          </div>
          <div v-show="imageFile" class="flex gap-4 items-center">
            <img
              alt="foto produk"
              class="max-w-[122px] max-h-[100px]"
              id="image-add-product"
            />
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p>Ubah Gambar</p>
            </label>
          </div>
          <div class="mt-2">
            <InputFileCustom
              v-show="!imageFile"
              add-class="border-[1px] border-[#A0A3BD]/10 bg-[#A0A3BD]/[5%] h-[100px]"
              @get-image="getFile"
            />
          </div>
        </div>
        <!-- upload image -->

        <SelectDropdown
          v-if="!isLoading"
          :init-value="categoryName"
          class="mt-[20px]"
          label="Kategori Produk"
          :options="categories"
          @select="onSelectCategory"
        />
        <Input
          v-model="name"
          label="Produk"
          class="mt-[20px]"
          placeholder="Masukkan nama produk disini"
          class-input="w-full"
        />
        <div class="flex items-end gap-[16px] mt-[20px]">
          <Input
            v-model="quantity"
            placeholder="Masukkan isi"
            class-input="w-full"
            add-class="w-full"
            label="isi"
          />
          <SelectDropdown
            :init-value="unit"
            :options="unitOptions"
            add-class="!mt-0 w-full"
            @select="onSelectUnit"
          />
        </div>
        <SelectDropdown
          :init-value="packaging"
          class="mt-[20px]"
          label="Kemasan"
          :options="packagingOptions"
          @select="onSelectPackaging"
        />
        <Input
          v-model.number="resellerPrice"
          :label="`${
            categoryName == 'Aneka Dimsum'
              ? 'Harga Reseller'
              : 'Harga Reseller/Agent'
          }`"
          class="mt-[20px]"
          placeholder="cth. 35000"
          class-input="w-full"
        />
        <Input
          v-if="categoryName == 'Aneka Dimsum'"
          v-model.number="agentPrice"
          label="Harga Agent"
          class="mt-[20px]"
          placeholder="cth. 35000"
          class-input="w-full"
        />
        <div class="text-right mt-[60px]">
          <Button
            class="text-white bg-[#F6B205] px-[20px] py-[8px] text-sm font-semibold rounded-[8px]"
            @click="addProduct"
            >Simpan</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAddProduct from "~/components/product/form-add-product.vue";
import Input from "~/components/atoms/input.vue";
import InputFileCustom from "~/components/atoms/input-file-custom.vue";
import Button from "~/components/atoms/button.vue";
import SelectDropdown from "~/components/atoms/select-dropdown.vue";

export default {
  layout: "dashboard",
  components: {
    FormAddProduct,
    Input,
    InputFileCustom,
    Button,
    SelectDropdown,
  },
  data() {
    return {
      categories: [],
      imageFile: null,
      categoryId: null,
      categoryName: "",
      name: "",
      quantity: 1,
      unit: "Pcs",
      packaging: "Box",
      resellerPrice: null,
      agentPrice: null,
      isLoading: true,
      isLoadingAddProduct: false,
      unitOptions: [
        {
          name: "Pcs",
        },
        {
          name: "Kg",
        },
        {
          name: "Gram",
        },
        {
          name: "Batang",
        },
      ],
      packagingOptions: [
        {
          name: "Box",
        },
        {
          name: "Mika",
        },
        {
          name: "Plastik",
        },
      ],
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    onSelectPackaging(packaging) {
      this.packaging = packaging.name;
    },
    onSelectUnit(unit) {
      this.unit = unit.name;
    },
    onSelectCategory(category) {
      this.categoryId = category.id;
      this.categoryName = category.name;
    },
    async getCategories() {
      this.isLoading = true;
      try {
        const getCategories = await this.$axios.get("/categories");
        if (getCategories.data) {
          this.categories = getCategories.data.data;
          this.categoryId = this.categories[0].id;
          this.categoryName = this.categories[0].name;
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    getFile(file) {
      this.imageFile = file;
      if (file) {
        this.uploadImage = false;
        const srcImage = URL.createObjectURL(this.imageFile);
        const imageArticle = document.getElementById("image-add-product");
        imageArticle.src = srcImage;
      }
    },
    async addProduct() {
      this.agentPrice =
        this.categoryName == "Aneka Dimsum"
          ? this.agentPrice
          : this.resellerPrice;
      if (
        !this.name ||
        !this.quantity ||
        !this.resellerPrice ||
        !this.agentPrice
      ) {
        this.$snackbar.show({
          message: "Form belum lengkap",
          isSuccess: false,
        });
        return;
      }

      this.isLoadingAddProduct = true;
      try {
        const formData = new FormData();
        formData.append("categoryId", this.categoryId);
        formData.append("name", this.name);
        formData.append("quantity", this.quantity);
        formData.append("unit", this.unit);
        formData.append("packaging", this.packaging);
        formData.append("resellerPrice", this.resellerPrice);
        formData.append("agentPrice", this.agentPrice);
        formData.append("file", this.imageFile);

        await this.$axios
          .post("/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menambahkan produk",
                isSuccess: true,
              });
              this.$router.push("/product");
            } else {
              throw new Error(response);
            }
          });
      } catch (error) {
        console.log(error);
        if (error.response.status == 402) {
          this.$snackbar.show({
            message: "Produk dengan nama yang sama sudah ada",
            isSuccess: false,
          });
        } else {
          this.$snackbar.show({
            message: `Gagal menambahkan produk. ${error.response.data.error}`,
            isSuccess: false,
          });
        }
      }
      this.isLoadingAddProduct = false;
    },
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
