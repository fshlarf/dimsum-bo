<template>
  <div class="wrapper lg:px-[44px] xl:px-[184px]">
    <nuxt-link to="/product">
      <img src="/icons/arrow-back.svg" alt="back" />
    </nuxt-link>
    <div
      class="add-product p-[20px] lg:p-[32px] rounded-[12px] relative mt-[12px] md:mt-[16px] lg:mt-[32px]"
    >
      <header class="title-text font-semibold">Tambah Produk</header>
      <hr class="absolute left-0 right-0 my-[24px]" />
      <div class="mt-[48px]">
        <!-- upload image -->
        <div class="relative">
          <div class="">
            <p class="text-sm lg:text-base">Gambar</p>
          </div>
          <div v-show="imageFile" class="flex gap-4 items-center">
            <img
              alt="foto produk"
              class="max-w-[122px] max-h-[46px] md:max-h-[70px] lg:max-h-[100px]"
              id="image-add-product"
            />
            <label
              v-if="imageFile"
              for="file"
              class="cursor-pointer relative text-sm text-[#00B5D4] flex items-center gap-[4px]"
            >
              <img src="/icons/upload.svg" alt="upload" />
              <p class="text-sm lg:text-base">Ubah Gambar</p>
            </label>
          </div>
          <div class="mt-2">
            <InputFileCustom
              v-show="!imageFile"
              add-class="border-[1px] border-[#A0A3BD]/10 bg-[#A0A3BD]/[5%] h-[46px] lg:h-[100px] text-sm lg:text-base rounded-[8px]"
              @get-image="getFile"
            />
          </div>
        </div>
        <!-- upload image -->

        <SelectDropdown
          v-if="!isLoading"
          :init-value="categoryName"
          class="mt-[20px] text-sm lg:text-base"
          label="Kategori Produk"
          :options="categories"
          @select="onSelectCategory"
        />
        <Input
          v-model="name"
          label="Produk"
          class="mt-[20px] text-sm lg:text-base"
          placeholder="Masukkan nama produk disini"
          class-input="w-full"
        />
        <div class="flex items-center gap-2 mt-[20px]">
          <Checkbox
            id="is-favorited"
            v-model="isFavorited"
            value="isFavorited"
            class=""
          />
          <label for="is-favorited">Produk favorit</label>
        </div>
        <div
          class="lg:grid lg:grid-cols-2 lg:gap-6 mt-[25px]"
          v-if="categoryName == 'Aneka Dimsum'"
        >
          <div
            class="border border-slate-300 rounded-[12px] px-5 pb-5 pt-5 relative"
          >
            <span
              class="bg-white absolute z-10 left-3 -top-3 px-2 text-slate-500"
              >Varian Box</span
            >
            <div class="flex items-end gap-[16px]">
              <Input
                v-model="boxQuantity"
                placeholder="Masukkan isi"
                class-input="w-full text-sm lg:text-base"
                add-class="w-full"
                label="isi"
              />
              <SelectDropdown
                :init-value="boxUnit"
                :options="unitOptions"
                add-class="!mt-0 w-full text-sm lg:text-base"
                @select="onSelectBoxUnit"
              />
            </div>
            <Input
              v-model.number="boxResellerPrice"
              label="Harga Reseller"
              class="mt-[20px] text-sm lg:text-base"
              placeholder="cth. 35000"
              class-input="w-full"
            />
            <Input
              v-model.number="boxAgentPrice"
              label="Harga Agent"
              class="mt-[8px] md:mt-[12px] lg:mt-[20px] text-sm lg:text-base"
              placeholder="cth. 35000"
              class-input="w-full"
            />
            <TextArea
              v-model="boxDescription"
              class-text="h-[164px] lg:h-[168px] text-sm lg:text-base"
              label="Deskripsi"
              class="mt-[20px]"
            />
          </div>
          <div
            class="border border-slate-300 rounded-[12px] px-5 pb-5 pt-5 relative mt-6 lg:mt-0"
          >
            <span
              class="bg-white absolute z-10 left-3 -top-3 px-2 text-slate-500"
              >Varian Mika</span
            >
            <div class="flex items-end gap-[16px]">
              <Input
                v-model="mikaQuantity"
                placeholder="Masukkan isi"
                class-input="w-full text-sm lg:text-base"
                add-class="w-full"
                label="isi"
              />
              <SelectDropdown
                :init-value="mikaUnit"
                :options="unitOptions"
                add-class="!mt-0 w-full text-sm lg:text-base"
                @select="onSelectMikaUnit"
              />
            </div>
            <Input
              v-model.number="mikaResellerPrice"
              label="Harga Reseller"
              class="mt-[20px] text-sm lg:text-base"
              placeholder="cth. 35000"
              class-input="w-full"
            />
            <Input
              v-model.number="mikaAgentPrice"
              label="Harga Agent"
              class="mt-[8px] md:mt-[12px] lg:mt-[20px] text-sm lg:text-base"
              placeholder="cth. 35000"
              class-input="w-full"
            />
            <TextArea
              v-model="mikaDescription"
              class-text="h-[164px] lg:h-[168px] text-sm lg:text-base"
              label="Deskripsi"
              class="mt-[20px]"
            />
          </div>
          <div class="col-span-2 text-right mt-[20px] lg:mt-0">
            <Button
              class="text-white bg-[#F6B205] px-[40px] py-[8px] button-text font-semibold rounded-[8px]"
              @click="addProductDimsum"
              >Simpan</Button
            >
          </div>
        </div>
        <div v-else>
          <div class="flex items-end gap-[16px] mt-[20px]">
            <Input
              v-model="quantity"
              placeholder="Masukkan isi"
              class-input="w-full text-sm lg:text-base"
              add-class="w-full"
              label="isi"
            />
            <SelectDropdown
              :init-value="unit"
              :options="unitOptions"
              add-class="!mt-0 w-full text-sm lg:text-base"
              @select="onSelectUnit"
            />
          </div>
          <SelectDropdown
            :init-value="packaging"
            class="mt-[20px] text-sm lg:text-base"
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
            class="mt-[20px] text-sm lg:text-base"
            placeholder="cth. 35000"
            class-input="w-full"
          />
          <TextArea
            v-model="description"
            class-text="h-[164px] lg:h-[168px] text-sm lg:text-base"
            label="Deskripsi"
            class="mt-[20px]"
          />
          <div class="text-right mt-[20px]">
            <Button
              class="text-white bg-[#F6B205] px-[40px] py-[8px] button-text font-semibold rounded-[8px]"
              @click="addProductNonDimsum"
              >Simpan</Button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAddProduct from "~/components/product/form-add-product.vue";
import Input from "~/components/atoms/input.vue";
import TextArea from "~/components/atoms/text-area.vue";
import InputFileCustom from "~/components/atoms/input-file-custom.vue";
import Button from "~/components/atoms/button.vue";
import SelectDropdown from "~/components/atoms/select-dropdown.vue";
import Checkbox from "~/components/atoms/check-box.vue";

export default {
  layout: "dashboard",
  components: {
    FormAddProduct,
    Input,
    InputFileCustom,
    Button,
    SelectDropdown,
    TextArea,
    Checkbox,
  },
  data() {
    return {
      categories: [],
      imageFile: null,
      categoryId: null,
      categoryName: "",
      name: "",
      isFavorited: false,
      description: "",
      quantity: 1,
      unit: "Pcs",
      packaging: "Box",
      resellerPrice: null,
      agentPrice: null,
      boxQuantity: 1,
      boxUnit: "Pcs",
      boxResellerPrice: null,
      boxAgentPrice: null,
      boxDescription: "",
      mikaQuantity: 1,
      mikaUnit: "Pcs",
      mikaResellerPrice: null,
      mikaAgentPrice: null,
      mikaDescription: "",
      isLoading: true,
      isLoadingAddProductNonDimsum: false,
      isLoadingAddProductDimsum: false,
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
    onSelectBoxUnit(unit) {
      this.boxUnit = unit.name;
    },
    onSelectMikaUnit(unit) {
      this.mikaUnit = unit.name;
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
    async addProductDimsum() {
      this.agentPrice = this.resellerPrice;
      if (
        !this.name ||
        !this.boxQuantity ||
        !this.boxUnit ||
        !this.boxResellerPrice ||
        !this.boxDescription ||
        !this.mikaQuantity ||
        !this.mikaUnit ||
        !this.mikaResellerPrice ||
        !this.mikaDescription
      ) {
        this.$snackbar.show({
          message: "Form belum lengkap",
          isSuccess: false,
        });
        return;
      }

      this.isLoadingAddProductNonDimsum = true;
      try {
        const formData = new FormData();
        formData.append("categoryId", this.categoryId);
        formData.append("name", this.name);
        formData.append("isFavorited", this.isFavorited);
        formData.append("boxDescription", this.boxDescription);
        formData.append("boxQuantity", this.boxQuantity);
        formData.append("boxUnit", this.boxUnit);
        formData.append("boxResellerPrice", this.boxResellerPrice);
        formData.append("boxAgentPrice", this.boxAgentPrice);
        formData.append("mikaDescription", this.mikaDescription);
        formData.append("mikaQuantity", this.mikaQuantity);
        formData.append("mikaUnit", this.mikaUnit);
        formData.append("mikaResellerPrice", this.mikaResellerPrice);
        formData.append("mikaAgentPrice", this.mikaAgentPrice);
        formData.append("file", this.imageFile);

        await this.$axios
          .post("/products/dimsum", formData, {
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
      this.isLoadingAddProductNonDimsum = false;
    },
    async addProductNonDimsum() {
      this.agentPrice = this.resellerPrice;
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

      this.isLoadingAddProductNonDimsum = true;
      try {
        const formData = new FormData();
        formData.append("categoryId", this.categoryId);
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("quantity", this.quantity);
        formData.append("unit", this.unit);
        formData.append("packaging", this.packaging);
        formData.append("resellerPrice", this.resellerPrice);
        formData.append("agentPrice", this.agentPrice);
        formData.append("file", this.imageFile);

        await this.$axios
          .post("/products/non-dimsum", formData, {
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
      this.isLoadingAddProductNonDimsum = false;
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
