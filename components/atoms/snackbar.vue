<template>
  <div
    class="flex !items-center !justify-between !gap-5 rounded-[8px] transition-all ease-in-out duration-300 overflow-hidden bg-white shadow-md"
    :class="`snackbar ${
      show ? 'h-auto opacity-100 top-[80px]' : 'h-0 opacity-0 top-0'
    }`"
  >
    <div class="flex items-center max-w-max">
      <div
        class="w-[48px] py-[15px] px-[12px]"
        :class="`${isSuccess ? 'bg-[#DDF7E0]' : 'bg-[#FFE7EA]'}`"
      >
        <img
          class="w-[24px]"
          :src="`/icons/${isSuccess ? 'badge-success' : 'badge-error'}.svg`"
          alt="snackbar status"
        />
      </div>
      <div
        class="min-w-[372px] px-[14px] flex justify-between items-center space-x-[14px]"
      >
        <p :class="`${subMessage ? 'font-bold' : ''}`">
          {{ message }}
        </p>
        <div
          class="w-[20px] h-[20px] flex justify-center items-center cursor-pointer max-w-max"
          @click="show = false"
        >
          <img src="/icons/close.svg" alt="close snackbar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "snackbar",
  data: () => ({
    show: false,
    color: "",
    message: "",
    subMessage: "",
    duration: 0,
    isSuccess: true,
  }),
  methods: {
    showSnackbar({
      isSuccess,
      color,
      className,
      message,
      subMessage,
      duration,
    }) {
      this.color = color ? color : "bg-primary";
      this.className = className;
      this.isSuccess = isSuccess;
      this.message = message;
      this.subMessage = subMessage;
      this.show = true;
      this.duration = duration ? duration : this.isSuccess ? 3000 : 5000;
      this.hideSnackbar();
    },
    hideSnackbar() {
      if (this.show) {
        setTimeout(
          function () {
            this.show = false;
          }.bind(this),
          this.duration
        );
      }
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  z-index: 900;
  min-width: 417px;
  right: 85px;
}
.snackbar__show {
  display: flex;
}
</style>
