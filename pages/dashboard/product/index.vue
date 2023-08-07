<template>
  <div class="pt-[54px]">
    <div @click="isSwitch = !isSwitch" class="w-max mx-auto">
      <TogleTitle :toggle="isSwitch" />
    </div>
    <div class="mt-[40px]">
      <div
        class="p-[32px] rounded-[12px] w-max relative mx-auto"
        id="product-wrapper"
      >
        <header class="flex justify-between items-center">
          <h1 class="text-[20px] text-[#2D2D2D] font-semibold">
            Daftar Produk Dimsum
          </h1>
          <div class="flex items-center gap-[16px]">
            <div class="relative">
              <img
                src="/icons/search.svg"
                alt="search"
                class="absolute left-[12px] top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Cari produk disini.."
                class="text-xs border-[1px] border-[#F8FAFB] bg-[#F8FAFB] focus:outline-none rounded-[8px] py-[12px] pl-[40px] w-[244px] focus:border-[#F6B205]/40"
              />
            </div>
            <Button
              @click="$router.push('product/add-product')"
              class="text-sm text-white bg-[#F6B205] p-[12px] rounded-[8px]"
              >Tambah Produk</Button
            >
          </div>
        </header>
        <hr
          class="left-0 right-0 absolute border-[1px] border-[#D9D9D9]/20 mt-[16px]"
        />
        <div class="mt-[40px] flex justify-between items-center relative">
          <!-- category 1 dimsum, category 2 sauce, category 3 other menus -->
          <!-- category 1 -->
          <div
            class="pb-[15px] w-[221px] text-center relative transition-all ease-linear duration-200 cursor-pointer"
            @click="category = 1"
          >
            <h1
              class="text-sm font-medium"
              :class="{ 'text-[#E5B223]': category === 1 }"
            >
              Aneka Dimsum
            </h1>
            <div
              class="h-[4px] bg-[#E5B223] rounded-[20px] absolute bottom-[-2px] z-30 opacity-0 transition-all duration-200 ease-in-out"
              :class="[category === 1 ? 'w-full opacity-[100]' : 'w-0']"
            ></div>
          </div>
          <!-- end -->
          <!-- category 2 -->
          <div
            class="pb-[15px] w-[221px] text-center relative transition-all ease-linear duration-200 cursor-pointer"
            @click="category = 2"
          >
            <h1
              class="text-sm font-medium"
              :class="{ 'text-[#E5B223]': category === 2 }"
            >
              Varian Saus
            </h1>
            <div
              class="h-[4px] bg-[#E5B223] rounded-[20px] absolute bottom-[-2px] z-30 transition-all duration-200 ease-in-out"
              :class="[category === 2 ? 'w-full opacity-[100]' : 'w-0']"
            ></div>
          </div>
          <!-- end -->
          <!-- category 3 -->
          <div
            class="pb-[15px] w-[221px] text-center relative transition-all ease-linear duration-200 cursor-pointer"
            @click="category = 3"
          >
            <h1
              class="text-sm font-medium"
              :class="{ 'text-[#E5B223]': category === 3 }"
            >
              Menu Lainnya
            </h1>
            <div
              class="h-[4px] bg-[#E5B223] rounded-[20px] absolute bottom-[-2px] z-30 transition-all duration-200 ease-in-out"
              :class="[category === 3 ? 'w-full opacity-[100]' : 'w-0']"
            ></div>
          </div>
          <!-- end -->
          <hr class="absolute bottom-0 left-0 right-0" />
        </div>
        <div class="min-w-[883px] min-h-[375px] mt-[45px]">
          <ProductWrapper
            v-if="category === 1"
            class="mx-auto"
            :listProduct="dataProduct"
          />
          <ProductWrapper
            v-if="category === 2"
            class="mx-auto"
            :listProduct="dataSauce"
          />
          <ProductWrapper
            v-if="category === 3"
            class="mx-auto"
            :listProduct="dataOtherMenus"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TogleTitle from "~/components/product/togle-title.vue";
import ProductWrapper from "~/components/product/product-wrapper.vue";
export default {
  layout: "dashboard",
  components: {
    TogleTitle,
    ProductWrapper,
  },
  data() {
    return {
      category: 1,
      isSwitch: false,
      dataProduct: [
        {
          name: "Dimsum Ayam 1",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 2",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 3",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 4",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 5",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 6",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 7",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 8",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 9",
          images: "/images/product/dimsum-ayam.png",
        },
        {
          name: "Dimsum Ayam 10",
          images: "/images/product/dimsum-ayam.png",
        },
      ],
      dataSauce: [
        {
          name: "Pancake Durian1",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 2",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 3",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 4",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 5",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 6",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 7",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 8",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 9",
          images: "/images/product/sauce.png",
        },
        {
          name: "Dimsum Ayam 10",
          images: "/images/product/sauce.png",
        },
      ],
      dataOtherMenus: [
        {
          name: "Sauce Ayam 1",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian2",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian3",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian4",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian5",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian6",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian7",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian8",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian9",
          images: "/images/product/pancake.png",
        },
        {
          name: "Pancake Durian10",
          images: "/images/product/pancake.png",
        },
      ],
    };
  },
};
</script>
