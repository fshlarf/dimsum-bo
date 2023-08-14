import Vue from "vue";

const showSnackbar = (data) => {
  const snackbarInstance = new Vue().$snackbar;
  if (snackbarInstance) {
    snackbarInstance.show(data);
  }
};

export default showSnackbar;
