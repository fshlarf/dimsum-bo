<template>
  <div class="wrapper mx-auto lg:max-w-[500px] xl:max-w-[800px]">
    <nuxt-link to="/">
      <img src="/icons/arrow-back.svg" alt="back" />
    </nuxt-link>
    <div
      class="add-user p-[20px] lg:p-[32px] rounded-[12px] relative mt-[20px]"
    >
      <header class="text-[#2D2D2D] title-text font-semibold">
        Tambah User
      </header>
      <hr
        class="border-[1px] border-[#D9D9D9]/20 absolute left-0 right-0 mt-[16px] mb-[24px]"
      />
      <div class="mt-[40px]">
        <Input
          v-model="name"
          label="Nama User"
          addClass="mt-[30px]"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="phoneNumber"
          label="Nomor Handphone"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
        <Input
          v-model="email"
          label="Email User"
          addClass="mt-[20px]"
          classInput="w-full text-xs md:text-sm"
        />
        <div class="mt-[20px]">
          <label class="text-sm lg:text-base text-[#2D2D2D] block"
            >Passowrd User
          </label>
          <input
            v-model="password"
            type="password"
            class="border-[1px] input-text mt-[8px] rounded-[8px] py-[10px] px-[16px] block focus:outline-[#F6B205]/40 w-full text-xs md:text-sm"
          />
        </div>
      </div>
      <div class="mt-[24px] text-right">
        <Button
          :loading="isLoadingCreateUser"
          btnClass="text-white bg-[#F6B205] button-textfont-semibold !px-[24px] py-[8px] rounded-[8px]"
          @click="addUser"
          >Simpan</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button.vue";
import Input from "~/components/atoms/input.vue";

export default {
  layout: "dashboard",
  components: {
    Button,
    Input,
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      isLoadingCreateUser: false,
    };
  },
  methods: {
    async addUser() {
      if (!this.name || !this.phoneNumber || !this.email || !this.password) {
        this.$snackbar.show({
          message: "Form tidak lengkap",
          isSuccess: false,
        });
        return;
      }
      this.isLoadingCreateUser = true;
      try {
        await this.$axios
          .post("/users", {
            name: this.name,
            phone: this.phoneNumber,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.status == 201) {
              this.$snackbar.show({
                message: "Berhasil menambahkan user",
                isSuccess: true,
              });
              this.$router.push("/");
            } else {
              throw new Error(response);
            }
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        console.log(error);
        this.$snackbar.show({
          message: "Gagal menambahkan user",
          isSuccess: false,
        });
      }
      this.isLoadingCreateUser = false;
    },
  },
};
</script>

<style scoped>
#card-option {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
.add-user {
  border: 1px solid #eceef6;
  background: #fff;
  box-shadow: 0px 4px 10px 0px rgba(125, 151, 244, 0.15);
}
</style>
