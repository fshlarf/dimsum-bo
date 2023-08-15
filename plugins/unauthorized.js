import showSnackbar from "~/helpers/snackbar";

export default function ({ app, $axios, redirect }) {
  $axios.onError((error) => {
    if (error?.response?.status === 401) {
      showSnackbar({
        message: "Sesi berakhir",
        isSuccess: false,
      });
      redirect("/login");
    } else if (error?.response?.status === 500) {
      console.log(error?.response?.data?.error || error?.message || error);
      showSnackbar({
        message: "Terjadi kesalahan. Coba beberapa saat lagi",
        isSuccess: false,
      });
    } else {
      console.log(error?.response?.data?.error || error?.message || error);
    }
  });
}
