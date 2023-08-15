export default async function ({ app, $axios }) {
  try {
    const user = await $axios.get("/users/me");
    console.log("user: ", user.data.data.email);
  } catch (error) {
    console.log(error);
  }
}
