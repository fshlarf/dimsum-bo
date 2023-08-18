<template>
  <div id="article-preview" class="w-full min-h-screen bg-white pb-[30px]">
    <div
      class="px-[20px] py-[30px] md:px-[40px] md:py-[50] lg:pt-[45px] lg:px-[100px] xl:pt-[48px] xl:max-w-[1120px] xl:px-0 mx-auto"
    >
      <img
        src="/icons/arrow-back.svg"
        alt="back"
        class="cursor-pointer"
        @click="$router.push('/article')"
      />
      <div v-show="!isLoading" class="mt-[32px]">
        <div
          class="w-full h-[166px] md:h-[200px] lg:h-[250px] xl:h-[380px] overflow-hidden rounded-[15px] md:rounded-[25px]"
        >
          <img
            v-show="article.fileName"
            alt="preview artikel"
            class="!w-full !h-full !object-cover !object-center"
            id="preview-article"
          />
        </div>
        <section class="grid grid-cols-3 mt-[32px] gap-x-[64px]">
          <h1
            class="text-[20px] md:text-[24px] lg:text-[40px] font-bold text-[#2D2D2D] col-span-3 max-w-[658px]"
          >
            {{ article.title }}
          </h1>
          <div class="col-span-3 xl:col-span-2">
            <section
              class="text-xs lg:text-sm text-[#717171] flex items-center xl:gap-[16px] my-[16px] border-b-[1px] border-[#E8E7E7]/50 pb-[16px]"
            >
              <p class="text-[#4D4D4D] font-medium">
                Oleh: Produsen Dimsum Medan
              </p>
              <p class="pl-[12px]">{{ formatDate(article.createdAt) }}</p>
              <div class="f items-center gap-[4px] hidden">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.2602 9.32914C17.2363 9.2743 16.6513 7.97703 15.3449 6.67063C14.1327 5.45984 12.0501 4.01562 8.9999 4.01562C5.94974 4.01562 3.86708 5.45984 2.6549 6.67063C1.34849 7.97703 0.763491 9.27219 0.739585 9.32914C0.715547 9.38314 0.703125 9.44159 0.703125 9.5007C0.703125 9.55981 0.715547 9.61826 0.739585 9.67227C0.763491 9.72641 1.34849 11.0237 2.6549 12.3301C3.86708 13.5409 5.94974 14.9844 8.9999 14.9844C12.0501 14.9844 14.1327 13.5409 15.3449 12.3301C16.6513 11.0237 17.2363 9.72852 17.2602 9.67227C17.2842 9.61826 17.2967 9.55981 17.2967 9.5007C17.2967 9.44159 17.2842 9.38314 17.2602 9.32914ZM8.9999 14.1406C6.79349 14.1406 4.86693 13.3377 3.27294 11.7549C2.60475 11.0909 2.03931 10.3309 1.59529 9.5C2.03918 8.66928 2.60464 7.90949 3.27294 7.24578C4.86693 5.66234 6.79349 4.85938 8.9999 4.85938C11.2063 4.85938 13.1329 5.66234 14.7268 7.24578C15.3952 7.90949 15.9606 8.66928 16.4045 9.5C15.9566 10.3585 13.7108 14.1406 8.9999 14.1406ZM8.9999 6.26562C8.3602 6.26562 7.73487 6.45532 7.20298 6.81072C6.67108 7.16611 6.25653 7.67125 6.01172 8.26226C5.76692 8.85326 5.70287 9.50359 5.82767 10.131C5.95247 10.7584 6.26051 11.3347 6.71285 11.787C7.16518 12.2394 7.7415 12.5474 8.3689 12.6722C8.99631 12.797 9.64663 12.733 10.2376 12.4882C10.8286 12.2434 11.3338 11.8288 11.6892 11.2969C12.0446 10.765 12.2343 10.1397 12.2343 9.5C12.2332 8.64253 11.892 7.82051 11.2857 7.21418C10.6794 6.60786 9.85736 6.26674 8.9999 6.26562ZM8.9999 11.8906C8.52708 11.8906 8.06487 11.7504 7.67174 11.4877C7.2786 11.225 6.97219 10.8517 6.79125 10.4149C6.61031 9.97802 6.56296 9.49735 6.65521 9.03361C6.74745 8.56988 6.97514 8.14391 7.30947 7.80957C7.64381 7.47524 8.06977 7.24755 8.53351 7.15531C8.99725 7.06307 9.47792 7.11041 9.91475 7.29135C10.3516 7.47229 10.7249 7.7787 10.9876 8.17184C11.2503 8.56498 11.3905 9.02718 11.3905 9.5C11.3905 10.134 11.1387 10.7421 10.6903 11.1904C10.242 11.6388 9.63393 11.8906 8.9999 11.8906Z"
                    fill="#717171"
                  />
                </svg>

                <p>100x dilihat</p>
              </div>
            </section>
            <div class="text-[#717171] text-base text-justify space-y-[16px]">
              <p
                class="whitespace-pre-line text-xs md:text-sm lg:text-base"
                v-html="article.content"
              ></p>
            </div>
          </div>
          <div
            class="space-y-[16px] mt-[32px] xl:mt-0 col-span-3 xl:col-span-1"
          >
            <h1
              class="text-[#B71A1B] text-base md:text-lg lg:text-[24px] font-bold mb-[16px]"
            >
              Artikel Terbaru
            </h1>
            <div class="space-y-[12px]">
              <TopArticle />
              <TopArticle />
              <TopArticle />
              <TopArticle />
            </div>
            <div
              class="items-center gap-[8px] w-max mx-auto text-sm text-[#0194F3] cursor-pointer hidden"
            >
              <p>Tampilkan semua</p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.81133 5.1137C2.55217 5.3752 2.55225 5.79672 2.8115 6.05813L7.2999 10.5839C7.69108 10.9783 8.32877 10.9783 8.71996 10.5839L13.2084 6.05813C13.4676 5.79672 13.4677 5.3752 13.2085 5.1137C12.9462 4.84897 12.5183 4.84891 12.2559 5.11357L8.72001 8.67934C8.32881 9.07384 7.69104 9.07384 7.29985 8.67934L3.76399 5.11357C3.50156 4.84891 3.07369 4.84897 2.81133 5.1137Z"
                  fill="#0194F3"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import TopArticle from "~/components/article/top-article.vue";

export default {
  components: {
    TopArticle,
  },
  data() {
    return {
      article: {},
      isLoading: true,
      latestArticle: [],
      filterLatestArticle: {
        limit: 5,
      },
      articleId: null,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    this.articleId = id;
    if (this.articleId) {
      this.getArticleById(this.articleId);
    }
  },
  methods: {
    async getArticleById(id) {
      this.isLoading = true;
      try {
        const getArticle = await this.$axios.get(`/articles/${id}`);
        if (getArticle.data) {
          this.article = getArticle.data.data;
          this.title = this.article.title;
          this.content = this.article.content;
          await this.getArticleImage(this.article.fileName);
        }
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    },
    async getArticleImage(fileName) {
      if (fileName) {
        const url = `bucket/images/articles/${fileName}`;
        await this.$axios
          .get(url, {
            responseType: "blob",
          })
          .then((response) => {
            const responseType = response.headers["content-type"];
            const responseData = response.data;

            // Convert the response data to a Blob
            const blob = new Blob([responseData], { type: responseType });

            // Create a new File object with the Blob
            const imageFile = new File([blob], fileName, {
              type: responseType,
            });

            const srcImage = URL.createObjectURL(imageFile);
            const bannerImage = document.getElementById("preview-article");
            bannerImage.src = srcImage;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    formatDate(inputDate) {
      const daysOfWeek = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const date = new Date(inputDate);
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const day = date.getUTCDate();
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} - ${hours
        .toString()
        .padStart(2, "0")}.${minutes.toString().padStart(2, "0")} WIB`;
      return formattedDate;
    },
  },
};
</script>

<style>
#article-preview {
  font-family: "Quicksand", sans-serif;
}
</style>
