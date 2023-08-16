<template>
  <div v-if="isShow" class="fixed z-[900] w-full h-screen top-0 left-0">
    <div class="relative z-[901] w-full h-screen">
      <div
        class="absolute z-[903] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          class="relative bg-white rounded-[12px] p-[24px] min-w-[320px] md:min-w-[400px]"
        >
          <button
            class="absolute -right-2 -top-2 bg-black/40 w-[28px] h-[28px] rounded-full overflow-hidden flex items-center justify-center"
            @click="_cancel"
          >
            <img src="/icons/close-white.svg" alt="close modal" />
          </button>
          <h2 class="font-bold">{{ title }}</h2>
          <p class="mt-2">{{ message }}</p>
          <section class="mt-6">
            <div class="flex items-center gap-2 justify-end">
              <Button
                btn-class="text-[#F6B205] border border-[#F6B205] rounded-[4px] px-[16px] py-[6px]"
                @click="_cancel"
                >{{ cancelText ? cancelText : "Batal" }}</Button
              >
              <Button
                btn-class="text-white bg-[#F6B205] border border-[#F6B205] rounded-[4px] px-[16px] py-[6px]"
                @click="_confirm"
                >{{ confirmText ? confirmText : "Oke" }}</Button
              >
            </div>
          </section>
        </div>
      </div>
      <div
        class="absolute z-[902] top-0 left-0 w-full h-screen bg-black/40"
      ></div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/atoms/button";

export default {
  components: {
    Button,
  },
  data() {
    return {
      title: undefined,
      message: undefined, // Main text content
      confirmText: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
      cancelText: undefined, // text for cancel button
      resolvePromise: undefined,
      rejectPromise: undefined,
      isShow: false,
    };
  },
  methods: {
    show(opts = {}) {
      this.title = opts.title;
      this.message = opts.message;
      this.confirmText = opts.confirmText;
      this.cancelText = opts.cancelText;
      this.isShow = true;
      if (opts.cancelText) {
        this.cancelText = opts.cancelText;
      }

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },

    _confirm() {
      this.isShow = false;
      this.resolvePromise(true);
    },

    _cancel() {
      this.isShow = false;
      this.resolvePromise(false);
    },
  },
};
</script>

<style></style>
