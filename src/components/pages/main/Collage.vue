<template>
  <div class="container-fluid m-0 p-0 overflow-hidden"
       style="max-height: 98vh;"
  >
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 m-0 p-1" v-for="(index, i) in shuffledIndexes">
        <transition-group name="fade" enter-active-class="animated" leave-active-class="animated">
          <img
              class="img-fluid"
              :src="imageList[index]"
              :key="i"
              alt="Collage Image">
        </transition-group>
      </div>

    </div>
  </div>
</template>

<script>
import images from "@/imagesLoader";

export default {
  name: "collage",
  data() {
    return {
      imageList: [
        images["collage/img_1"],
        images["collage/img_2"],
        images["collage/img_3"],
        images["collage/img_4"],
        images["collage/img_5"],
        images["collage/img_6"],
        images["collage/img_7"],
        images["collage/img_8"],
        images["collage/img_9"],
        images["collage/img_10"],
        images["collage/img_11"],
        images["collage/img_12"],
          images["collage/img_13"]
      ],
      shuffledIndexes: []

    };
  },
  methods: {
    generateShuffledIndexes() {
      const indexes = Array.from({ length: this.imageList.length }, (_, i) => i);
      indexes.sort(() => Math.random() - 0.5); // Случайно перемешиваем индексы
      this.shuffledIndexes = indexes.slice(0, 12); // Берем первые 12 случайных уникальных индексов
    },
    getImgElementBySrc(src) {
      const imgElements = document.querySelectorAll('.collage img'); // Select all <img> elements inside the collage container
      let targetImg = null;

      imgElements.forEach((img) => {
        if (img.getAttribute('src') === src) {
          targetImg = img; // Found the <img> with the matching src attribute
        }
      });

      return targetImg;
    },
    replaceRandomImage() {
      //Get list of all indexes
      let allIndexes = this.imageList.map((_, index) => index);
      setInterval(() => {
        let unusedIndexes = allIndexes.filter((_, index) => !this.shuffledIndexes.includes(index));

        const randomUnusedIndex = Math.floor(Math.random() * unusedIndexes.length);

        let randIndex = Math.floor(Math.random() * this.shuffledIndexes.length);


        //Get image element that is about to be changed by src attribute
        let imgSrc = this.imageList[this.shuffledIndexes[randIndex]];
        let changingImage = this.getImgElementBySrc(imgSrc);

        if(changingImage != null) {
          changingImage.setAttribute('src', this.imageList[unusedIndexes[randomUnusedIndex]]);

          changingImage.classList.add('fade-in');
          setTimeout(() => {
            changingImage.classList.remove('fade-in');
          },500)

          this.shuffledIndexes[randIndex] = unusedIndexes[randomUnusedIndex];
        }
      }, 1000)
    }

  },
  computed: {

  },
  mounted() {
    this.generateShuffledIndexes();
    this.replaceRandomImage();
  }
};
</script>

<style scoped>


</style>