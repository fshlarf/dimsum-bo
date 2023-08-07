<template>
  <div class="pt-[54px]">
    <div
      class="mx-auto w-max p-[32px] rounded-[12px]"
      id="card-option"
      v-if="!editReward && !addReward"
    >
      <div>
        <section class="flex justify-between items-center">
          <h3 class="text-base lg:text-[20px] text-[#2D2D2D] font-semibold">
            Reward
          </h3>
          <Button
            class="bg-[#F6B205] text-white font-semibold text-sm py-[10px] px-[16px] rounded-[8px]"
            @click="addReward = true"
            >Tambah Reward</Button
          >
        </section>
        <section
          class="border-[1px] border-[#A0A3BD]/30 mt-[12px] rounded-[10px]"
        >
          <ListMenu title="Reward 1" @clickEdit="editReward = true" />
          <ListMenu title="Reward 12" />
        </section>
      </div>
    </div>
    <div
      v-else-if="addReward"
      class="mx-auto w-max p-[32px] rounded-[12px] edit-reward relative"
    >
      <header class="text-[#2D2D2D] text-[20px] font-semibold">
        Tambah Reward
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="w-[710px] mt-[40px]">
        <Input
          label="Jenis Reward"
          addClass="mt-[30px]"
          classInput="w-full"
          placeholder="Masukkan jenis reward disini"
        />
        <Input
          label="Ketentuan Reward"
          addClass="mt-[20px]"
          classInput="w-full"
          placeholder="Masukkan ketentuan reward disini"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          btnClass="text-white bg-[#F6B205] text-sm font-semibold !px-[24px] py-[8px] rounded-[8px]"
          >Simpan</Button
        >
      </div>
    </div>
    <div
      v-else
      class="mx-auto w-max p-[32px] rounded-[12px] edit-reward relative"
    >
      <header class="text-[#2D2D2D] text-[20px] font-semibold">
        Edit Reward
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="w-[710px] mt-[40px]">
        <Input label="Jenis Reward" addClass="mt-[30px]" classInput="w-full" />
        <Input
          label="Ketentuan Reward"
          addClass="mt-[20px]"
          classInput="w-full"
        />
      </div>
      <div class="mt-[24px] text-right">
        <Button
          btnClass="text-white bg-[#F6B205] text-sm font-semibold !px-[24px] py-[8px] rounded-[8px]"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/atoms/button.vue";
import ListMenu from "../../components/card-menu/list-menu.vue";
import Input from "~/components/atoms/input.vue";
import InputFile from "../../components/atoms/input-file.vue";
export default {
  layout: "dashboard",
  components: {
    Button,
    ListMenu,
    Input,
    InputFile,
  },
  data() {
    return {
      isOpen: false,
      editReward: false,
      addReward: false,
    };
  },
};
</script>
<style scoped>
#card-option {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
.edit-reward {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
