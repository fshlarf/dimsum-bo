import showSnackbar from "~/helpers/snackbar";

export default async function ({ app, $axios }) {
  try {
    const me = await $axios.get("/users/me");
    const user = me.data.data;
    if (!user || !user.isActive) {
      showSnackbar({
        message: "Sesi berakhir",
        isSuccess: false,
      });
      app.router.push("/login");
    }
  } catch (error) {
    console.log(error);
    if (error.response?.status == 401) {
      showSnackbar({
        message: "Sesi berakhir",
        isSuccess: false,
      });
      app.router.push("/login");
    }
  }
}
