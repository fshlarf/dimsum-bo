import Vue from "vue";
import SnackbarComponent from "~/components/atoms/snackbar";

const SnackbarPlugin = {
  install(Vue) {
    const SnackbarConstructor = Vue.extend(SnackbarComponent);
    const snackbarInstance = new SnackbarConstructor();
    snackbarInstance.$mount();

    Vue.prototype.$snackbar = {
      show(data) {
        snackbarInstance.showSnackbar(data);
      },
    };

    document.body.appendChild(snackbarInstance.$el);
  },
};

Vue.use(SnackbarPlugin);
