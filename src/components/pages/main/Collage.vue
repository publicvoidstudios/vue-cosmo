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
import * as images from '@/resources';

export default {
  name: "collage",
  data() {
    return {
      imageList: [
        images.collageImg1,
        images.collageImg2,
        images.collageImg3,
        images.collageImg4,
        images.collageImg5,
        images.collageImg6,
        images.collageImg7,
        images.collageImg8,
        images.collageImg9,
        images.collageImg10,
        images.collageImg11,
        images.collageImg12,
        images.collageImg13,
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