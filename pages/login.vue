<template>
  <div class="bg-[#FFF9EB] h-screen w-full relative pt-[80px]">
    <div
      class="relative z-20 bg-white rounded-[15px] p-[20px] w-[90%] md:w-[540px] mx-auto"
    >
      <img class="w-[45px]" src="/icons/logo.svg" alt="brand" />
      <h1 class="mt-[18px] md:mt-[24px] text-[20px] md:text-[28px] font-bold">
        Selamat Datang
      </h1>
      <p>Silakan login ke akun Anda.</p>
      <div class="pt-[20px] md:pt-[32px] text-sm md:text-base">
        <label class="block text-[#2D2D2D] mb-[8px]">Email</label>
        <input
          v-model="email"
          class="border border-[#A0A3BD]/40 px-[16px] py-[8px] w-full rounded-md focus:outline-none focus:text-black text-[#A0A3BD]"
          type="text"
          placeholder="Masukkan email kamu disini"
        />
      </div>
      <div class="mt-[16px] text-sm md:text-base">
        <label class="block text-[#2D2D2D] mb-[8px]">Password</label>
        <div class="relative">
          <input
            ref="passwordInput"
            v-model="password"
            class="border border-[#A0A3BD]/40 px-[16px] py-[8px] w-full rounded-md focus:outline-none focus:text-black text-[#A0A3BD]"
            type="password"
            placeholder="Enter your password"
          />
          <span
            v-if="!showPassword"
            class="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
            @click="togglePasswordVisibility"
            role="button"
          >
            <i class="fa-solid fa-eye fa-lg"></i>
          </span>
          <span
            v-else
            class="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
            @click="togglePasswordVisibility"
            role="button"
          >
            <i class="fa-sharp fa-solid fa-eye-slash fa-lg"></i>
          </span>
        </div>
      </div>
      <div class="mt-[25px] flex justify-between w-full font-normal">
        <div class="flex items-center gap-[12px] text-sm md:text-base">
          <input type="checkbox" name="" id="remember" v-model="rememberMe" />
          <label for="remember" class="cursor-pointer">Ingatkan saya</label>
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#F6B205] text-white p-3 rounded-lg hover:opacity-80 mx-auto block w-full mt-[24px] md:mt-[44px] text-base md:text-[18px] font-semibold"
        @click="submitForm"
      >
        Login
      </button>
    </div>
    <div class="absolute z-10 right-0 top-0 h-screen">
      <img class="h-screen" src="/images/login-bg.png" alt="login" />
    </div>
  </div>
</template>

<script>
import Snackbar from "~/components/atoms/snackbar.vue";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    };
  },
  mounted() {
    const loginForm = JSON.parse(localStorage.getItem("login_form"));
    if (loginForm) {
      this.email = loginForm.email;
      this.password = loginForm.password;
      this.rememberMe = loginForm.rememberMe;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      this.$refs.passwordInput.type =
        this.$refs.passwordInput.type === "password" ? "text" : "password";
    },
    async submitForm() {
      const email = this.email.trim();
      const password = this.password.trim();
      if (!email || !password) {
        this.$snackbar.show({
          message: "Login gagal. Form tidak lengkap",
          duration: 5000,
          isSuccess: false,
        });
      } else {
        try {
          const response = await this.$axios.post("/users/authenticate", {
            email,
            password,
          });
          console.log("respon = ", response);
          if (response?.status === 200) {
            if (this.rememberMe) {
              const login = {
                email: this.email,
                password: this.password,
                rememberMe: this.rememberMe,
              };
              localStorage.setItem("login_form", JSON.stringify(login));
            } else {
              localStorage.removeItem("login_form");
            }
            localStorage.setItem(
              "user_info",
              JSON.stringify(response.data.user)
            );
            this.$snackbar.show({
              message: "Login berhasil",
              isSuccess: true,
            });
            this.$router.push("/");
          } else {
            throw new Error(response);
          }
        } catch (error) {
          let errorMsg;
          if (error.response?.status === 400) {
            errorMsg = "Form tidak lengkap";
          } else if (error.response?.status === 403) {
            errorMsg = "Email / password salah";
          } else if (error.response?.status === 402) {
            errorMsg =
              "Akun kamu diblokir. Hubungi admin untuk info lebih lanjut";
          } else {
            errorMsg = error?.response?.data?.error || error?.message;
          }
          this.$snackbar.show({
            message: `Login gagal. ${errorMsg}`,
            isSuccess: false,
          });
        }
      }
    },
  },
};
</script>

<style></style>
