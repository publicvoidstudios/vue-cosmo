<template>
  <div class="container-fluid">
    <!-- Videos -->
    <div v-if="content.videos.length && !(seeAll.contentType !== 'videos' && seeAll.active)" class="container grid" id="videos">
      <!-- Header -->
      <div class="row bg-body-secondary p-3 rounded shadow-sm my-4">
        <h2 class="h3 col-md-2">Видео</h2>
        <div class="col-md-8">
          <input v-if="seeAll.active" type="text" class="form-control h-100" v-model="searchQuery" placeholder="Поиск">
        </div>
        <button v-if="!seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('videos')">Все видео ({{content.videos.length}})</button>
        <button v-if="seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('videos')">Назад</button>
      </div>
      <!-- Content -->
      <div class="row" :class="{'flex-nowrap overflow-hidden' : !seeAll.active}">
        <div class="col-md-6 col-lg-4" v-for="item in paginatedVideos">
          <div class="p-3 bg-light-subtle shadow rounded my-3 position-relative">
            <div class="ratio ratio-16x9 shadow" v-html="item.param2"></div>
            <p class="text-dark-emphasis overflow-hidden fs-5 mt-3 fw-bold capitalize-first-letter" style="height: 85px"> {{ item.param1 }} </p>
            <div class="bg-transparent rounded position-absolute top-0 start-0 w-100 h-100 z-1" style="cursor: pointer" @click="this.$router.push(`/students/content/${item.id}`);"></div>
          </div>
        </div>
        <div class="container d-flex justify-content-center fs-5" v-if="!paginatedVideos.length">Ничего не найдено по запросу "{{searchQuery}}"</div>
      </div>
      <!-- Pagination -->
      <div class="my-3 d-flex justify-content-center align-items-center flex-column" v-if="seeAll.active">

        <nav aria-label="Page navigation" class="d-flex justify-content-center align-items-center flex-column gap-1">
          <p class="m-0 p-0">Страница:</p>
          <ul class="pagination">
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === 1}" @click="this.currentPage -= 1"><svg-icon type="mdi" :path="icons.arrowLeft"></svg-icon></button>
            </li>
            <li class="page-item" v-for="pageNumber in totalPagesVideos" :key="pageNumber" :class="{ 'active': pageNumber === currentPage}">
              <a class="page-link" :class="{ 'rounded-start' : pageNumber === 1, 'rounded-end' : pageNumber === totalPagesVideos }" style="cursor: pointer" @click="this.currentPage = pageNumber">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === totalPagesVideos || totalPagesVideos === 0}" @click="this.currentPage += 1"><svg-icon type="mdi" :path="icons.arrowRight"></svg-icon></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Articles -->
    <div v-if="content.articles.length && !(seeAll.contentType !== 'articles' && seeAll.active)" class="container grid" id="articles">
      <!-- Header -->
      <div class="row bg-body-secondary p-3 rounded shadow-sm my-4">
        <h2 class="h3 col-md-2">Статьи</h2>
        <div class="col-md-8">
          <input v-if="seeAll.active" type="text" class="form-control h-100" v-model="searchQuery" placeholder="Поиск">
        </div>
        <button v-if="!seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('articles')">Все статьи ({{content.articles.length}})</button>
        <button v-if="seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('articles')">Назад</button>
      </div>
      <!-- Content -->
      <div class="row" :class="{'flex-nowrap overflow-hidden' : !seeAll.active}">
        <div class="col-md-6 col-lg-4" v-for="item in paginatedArticles">
          <div class="position-relative">
            <article-element :article="item" :for-students="true"></article-element>
            <div class="bg-transparent rounded position-absolute top-0 start-0 w-100 h-100 z-1" style="cursor: pointer" @click="this.$router.push(`/students/content/${item.id}`);"></div>
          </div>
        </div>
        <div class="container d-flex justify-content-center fs-5" v-if="!paginatedArticles.length">Ничего не найдено по запросу "{{searchQuery}}"</div>
      </div>
      <!-- Pagination -->
      <div class="my-3 d-flex justify-content-center align-items-center flex-column" v-if="seeAll.active">
        <nav aria-label="Page navigation" class="d-flex justify-content-center align-items-center flex-column gap-1">
          <p class="m-0 p-0">Страница:</p>
          <ul class="pagination">
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === 1}" @click="this.currentPage -= 1"><svg-icon type="mdi" :path="icons.arrowLeft"></svg-icon></button>
            </li>
            <li class="page-item" v-for="pageNumber in totalPagesArticles" :key="pageNumber" :class="{ 'active': pageNumber === currentPage}">
              <a class="page-link" :class="{ 'rounded-start' : pageNumber === 1, 'rounded-end' : pageNumber === totalPagesVideos }" style="cursor: pointer" @click="this.currentPage = pageNumber">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === totalPagesArticles || totalPagesArticles === 0}" @click="this.currentPage += 1"><svg-icon type="mdi" :path="icons.arrowRight"></svg-icon></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Presentations -->
    <div v-if="content.presentations.length && !(seeAll.contentType !== 'presentations' && seeAll.active)" class="container grid" id="presentations">
      <!-- Header -->
      <div class="row bg-body-secondary p-3 rounded shadow-sm my-4">
        <h2 class="h3 col-md-2">Презентации</h2>
        <div class="col-md-8">
          <input v-if="seeAll.active" type="text" class="form-control h-100" v-model="searchQuery" placeholder="Поиск">
        </div>
        <button v-if="!seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('presentations')">Все презентации ({{content.presentations.length}})</button>
        <button v-if="seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('presentations')">Назад</button>
      </div>
      <!-- Content -->
      <div class="row" :class="{'flex-nowrap overflow-hidden' : !seeAll.active}">
        <div class="col-md-6 col-lg-4" v-for="item in paginatedPresentations">
          <div class="p-3 bg-light-subtle shadow rounded my-3 position-relative">
            <div class="ratio ratio-4x3 shadow" v-html="replacePPTXWidthAndHeight(item.param2)"></div>
            <p class="text-dark-emphasis overflow-hidden fs-5 mt-3 fw-bold capitalize-first-letter" style="height: 85px"> {{ item.param1 }} </p>
            <div class="bg-transparent rounded position-absolute top-0 start-0 w-100 h-100 z-1" style="cursor: pointer" @click="this.$router.push(`/students/content/${item.id}`);"></div>
          </div>
        </div>
        <div class="container d-flex justify-content-center fs-5" v-if="!paginatedPresentations.length">Ничего не найдено по запросу "{{searchQuery}}"</div>
      </div>
      <!-- Pagination -->
      <div class="my-3 d-flex justify-content-center align-items-center flex-column" v-if="seeAll.active">
        <nav aria-label="Page navigation" class="d-flex justify-content-center align-items-center flex-column gap-1">
          <p class="m-0 p-0">Страница:</p>
          <ul class="pagination">
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === 1}" @click="this.currentPage -= 1"><svg-icon type="mdi" :path="icons.arrowLeft"></svg-icon></button>
            </li>
            <li class="page-item" v-for="pageNumber in totalPagesPresentations" :key="pageNumber" :class="{ 'active': pageNumber === currentPage}">
              <a class="page-link" :class="{ 'rounded-start' : pageNumber === 1, 'rounded-end' : pageNumber === totalPagesPresentations }" style="cursor: pointer" @click="this.currentPage = pageNumber">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === totalPagesPresentations || totalPagesPresentations === 0}" @click="this.currentPage += 1"><svg-icon type="mdi" :path="icons.arrowRight"></svg-icon></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Images -->
    <div v-if="content.images.length && !(seeAll.contentType !== 'images' && seeAll.active)" class="container grid" id="images">
      <!-- Header -->
      <div class="row bg-body-secondary p-3 rounded shadow-sm my-4">
        <h2 class="h3 col-md-2">Галерея</h2>
        <div class="col-md-8">
          <input v-if="seeAll.active" type="text" class="form-control h-100" v-model="searchQuery" placeholder="Поиск">
        </div>
        <button v-if="!seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('images')">Все изображения ({{content.images.length}})</button>
        <button v-if="seeAll.active" class="btn btn-primary col-md-2" @click="toggleSeeAll('images')">Назад</button>
      </div>
      <!-- Content -->
      <div class="row" :class="{'flex-nowrap overflow-hidden' : !seeAll.active}">
        <div class="col-md-6 col-lg-4" v-for="item in paginatedImages">
          <div class="p-3 bg-light-subtle shadow rounded my-3 position-relative">
            <image-element :image-item="item"></image-element>
            <div class="bg-transparent rounded position-absolute top-0 start-0 w-100 h-100 z-1" style="cursor: pointer" @click="this.$router.push(`/students/content/${item.id}`);"></div>
          </div>
        </div>
        <div class="container d-flex justify-content-center fs-5" v-if="!paginatedImages.length">Ничего не найдено по запросу "{{searchQuery}}"</div>
      </div>
      <!-- Pagination -->
      <div class="my-3 d-flex justify-content-center align-items-center flex-column" v-if="seeAll.active">
        <nav aria-label="Page navigation" class="d-flex justify-content-center align-items-center flex-column gap-1">
          <p class="m-0 p-0">Страница:</p>
          <ul class="pagination">
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === 1}" @click="this.currentPage -= 1"><svg-icon type="mdi" :path="icons.arrowLeft"></svg-icon></button>
            </li>
            <li class="page-item" v-for="pageNumber in totalPagesImages" :key="pageNumber" :class="{ 'active': pageNumber === currentPage}">
              <a class="page-link" :class="{ 'rounded-start' : pageNumber === 1, 'rounded-end' : pageNumber === totalPagesImages }" style="cursor: pointer" @click="this.currentPage = pageNumber">{{ pageNumber }}</a>
            </li>
            <li class="page-item">
              <button class="btn border-0" :class="{'disabled' : currentPage === totalPagesImages || totalPagesImages === 0}" @click="this.currentPage += 1"><svg-icon type="mdi" :path="icons.arrowRight"></svg-icon></button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Empty message -->
    <div v-else-if="!content.images.length && !content.videos.length && !content.presentations.length && !content.articles.length" class="container fs-3 text-center text-dark-emphasis">В этом подразделе пока ничего нет...</div>
  </div>

</template>

<script>

import ArticleElement from "@/components/pages/articles/ArticleElement.vue";
import ImageElement from "@/components/pages/students/utilitary/ImageElement.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import router from "@/components/router/router";

export default {
  components: {ImageElement, ArticleElement, SvgIcon},
  props: {
    content: {
      required: true,
      default: {
        videos: [],
        articles: [],
        images: [],
        presentations: []
      }
    }
  },
  data () {
    return {
      pageAnchors: [],
      seeAll: {
        contentType: '',
        active: false
      },
      filteredContent: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 3,
      icons: {
        arrowLeft: mdiChevronLeft,
        arrowRight: mdiChevronRight
      }
    }
  },
  methods: {
    router() {
      return router
    },
    replacePPTXWidthAndHeight(str) {
      const regex = /width="(\d+px?)" height="(\d+px?)"/;
      return str.replace(regex, `style='width: 100%; height: 100%;'`);
    },
    addObjectProperty(obj, key, value) {
      return {
        ...obj,
        [key]: value
      };
    },
    updatePageAnchors(){
      this.pageAnchors = [];
      if(this.content.videos.length && !this.seeAll.active) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,0,{
          id: 0,
          link: 'videos',
          displayName: 'Видео'
        })
      }
      if(this.content.articles.length && !this.seeAll.active) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,1,{
          id: 1,
          link: 'articles',
          displayName: 'Статьи'
        })
      }
      if(this.content.presentations.length && !this.seeAll.active) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,2,{
          id: 2,
          link: 'presentations',
          displayName: 'Презентации'
        })
      }
      if(this.content.images.length && !this.seeAll.active) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,3,{
          id: 3,
          link: 'images',
          displayName: 'Галерея'
        })
      }
      this.$emit('updatePageAnchors', this.pageAnchors)
    },
    toggleSeeAll(type) {
      this.seeAll.active = !this.seeAll.active;
      if(this.seeAll.contentType.length) {
        this.seeAll.contentType = '';
        this.searchQuery = '';
      } else {
        this.seeAll.contentType = type;
      }
      this.updatePageAnchors()
    },
    transliterate(input) {
      const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      const eng = ["a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "kh", "ts", "ch", "sh", "shch", "", "y", "", "e", "yu", "ya"];

      return input.split('').map(function (char) {
        // Check if the character is a Cyrillic letter
        if (/[\u0400-\u04FF]/.test(char)) {
          let idx = rus.indexOf(char.toLowerCase());
          if (idx >= 0) {
            return eng[idx];
          }
        }
        // Swap space character with an underscore character
        if (char === " ") {
          return "_";
        }
        // Return the character as is if it's not a Cyrillic letter
        return char;
      }).join('');
    }
  },
  mounted() {
    this.updatePageAnchors();
  },
  computed: {
    totalPagesImages() {
      if(this.content.images !== undefined) {
        return Math.ceil(this.content.images.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    totalPagesPresentations() {
      if(this.content.presentations !== undefined) {
        return Math.ceil(this.content.presentations.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    totalPagesArticles() {
      if(this.content.articles !== undefined) {
        return Math.ceil(this.content.articles.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    totalPagesVideos() {
      if(this.filteredVideos !== undefined) {
        return Math.ceil(this.filteredVideos.length / this.itemsPerPage);
      } else {
        return 0;
      }
    },
    paginatedImages() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      if(this.filteredImages !== undefined) {
        return this.filteredImages.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },
    paginatedPresentations() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      if(this.filteredPresentations !== undefined) {
        return this.filteredPresentations.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      if(this.filteredArticles !== undefined) {
        return this.filteredArticles.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },
    paginatedVideos() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      if(this.filteredVideos !== undefined) {
        return this.filteredVideos.slice(startIndex, endIndex);
      } else {
        return [];
      }
    },
    filteredImages() {
      if (this.searchQuery.trim() === '') {
        return this.content.images;
      } else {
        return this.content.images.filter(item => item.param1.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    filteredPresentations() {
      if (this.searchQuery.trim() === '') {
        return this.content.presentations;
      } else {
        return this.content.presentations.filter(item => item.param1.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    filteredArticles() {
      if (this.searchQuery.trim() === '') {
        return this.content.articles;
      } else {
        return this.content.articles.filter(item => item.param1.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    filteredVideos() {
      if (this.searchQuery.trim() === '') {
        return this.content.videos;
      } else {
        return this.content.videos.filter(item => item.param1.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    }
  }
}
</script>