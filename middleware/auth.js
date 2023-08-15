export default async function ({ app, $axios }) {
  try {
    await $axios.get("/users/me");
  } catch (error) {
    console.log(error);
  }
}
