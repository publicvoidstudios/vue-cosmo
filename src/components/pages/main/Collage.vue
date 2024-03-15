<template>
  <div class="collage">
    <transition-group name="fade" enter-active-class="animated" leave-active-class="animated">
        <img v-for="(index, i) in shuffledIndexes" :src="imageList[index]" :key="i" alt="Collage Image">
    </transition-group>
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
      }, 5000)
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
/*.collage {
  --gap: 4px;
  --num-cols: 4;
  --row-height: calc(100vw / var(--num-cols));
  max-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding: var(--gap);
  display: grid;
  grid-template-columns: repeat(var(--num-cols), 1fr);
  grid-auto-rows: var(--row-height);
  gap: var(--gap);
}

.collage > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease; !* Change the transition duration to 1s for a smoother fade effect *!
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-in {
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (max-width: 1200px) {
  .collage{
    --num-cols: 3;
  }
}

@media screen and (max-width: 992px) {
  .collage{
    --num-cols: 2;
  }
}

@media screen and (max-width: 768px) {
  .collage{
    --num-cols: 1;
  }
}*/

</style>