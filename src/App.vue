<template>
  <div class="app m-0 p-0">
    <navigation-panel
        :user="user"
        @switchTheme="switchTheme"
        :page-anchors="pageAnchors"
        :at-admin="navBarDisabled"
        @logout="logout"
    ></navigation-panel>
    <router-view

        @adminEnterAttempt="warnUserLogin"
        @userLogin="setUser"
        @switchTheme="switchTheme"
        @updatePageAnchors="updatePageAnchors"
        @dataUpdateRequest="updateFromDB"
        @adminActive="disableNavBar"

        :user="user"
        :warning-message="loginMessage"
        :sections="sections"
        :subsections="subsections"
        :content="content"
        :services-items="servicesItems"
        :courses-items="coursesItems"
        :reviews="reviews"
        :articles="articles"
        :comments="studentsComments"
        :articles-comments="articlesComments"

    ></router-view>
  </div>
  <footer v-if="!navBarDisabled" class="bg-light-subtle py-3 shadow border-top" style="justify-self: flex-end">
    <div class="container d-flex flex-wrap justify-content-evenly align-items-center ">
      <div class="col-12 col-md-4 d-flex align-items-center justify-content-md-start justify-content-center">
        <a href="/" class="text-body-secondary text-decoration-none me-2">
          <img class="img-fluid" :class="{'invert-image-color' : theme === 'light'}" style="width: 40px;" src="./resources/site_logo.png" alt="">
        </a>
        <span class="text-body-secondary text-center">© 2024 Медицина и косметология 2.0</span>
      </div>
      <div class="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center">
        <p class="text-body-secondary m-0 p-0 small">
          Development and support: <a class="text-body-secondary text-decoration-none" href="https://t.me/Heithvald">Vladislav Pak</a>
        </p>
        <p class="text-body-secondary m-0 p-0 small">
        <a href="https://github.com/publicvoidstudios/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
          © Public Void Studios
        </a>
      </p >
      </div>
      <ul class="nav col-12 col-md-4 justify-content-md-end justify-content-center align-items-center list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-body-secondary" href="https://vk.com/im?sel=189596649">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="m9.489.004l.729-.003h3.564l.73.003l.914.01l.433.007l.418.011l.403.014l.388.016l.374.021l.36.025l.345.03l.333.033c1.74.196 2.933.616 3.833 1.516c.9.9 1.32 2.092 1.516 3.833l.034.333l.029.346l.025.36l.02.373l.025.588l.012.41l.013.644l.009.915l.004.98l-.001 3.313l-.003.73l-.01.914l-.007.433l-.011.418l-.014.403l-.016.388l-.021.374l-.025.36l-.03.345l-.033.333c-.196 1.74-.616 2.933-1.516 3.833c-.9.9-2.092 1.32-3.833 1.516l-.333.034l-.346.029l-.36.025l-.373.02l-.588.025l-.41.012l-.644.013l-.915.009l-.98.004l-3.313-.001l-.73-.003l-.914-.01l-.433-.007l-.418-.011l-.403-.014l-.388-.016l-.374-.021l-.36-.025l-.345-.03l-.333-.033c-1.74-.196-2.933-.616-3.833-1.516c-.9-.9-1.32-2.092-1.516-3.833l-.034-.333l-.029-.346l-.025-.36l-.02-.373l-.025-.588l-.012-.41l-.013-.644l-.009-.915l-.004-.98l.001-3.313l.003-.73l.01-.914l.007-.433l.011-.418l.014-.403l.016-.388l.021-.374l.025-.36l.03-.345l.033-.333c.196-1.74.616-2.933 1.516-3.833c.9-.9 2.092-1.32 3.833-1.516l.333-.034l.346-.029l.36-.025l.373-.02l.588-.025l.41-.012l.644-.013zM6.79 7.3H4.05c.13 6.24 3.25 9.99 8.72 9.99h.31v-3.57c2.01.2 3.53 1.67 4.14 3.57h2.84c-.78-2.84-2.83-4.41-4.11-5.01c1.28-.74 3.08-2.54 3.51-4.98h-2.58c-.56 1.98-2.22 3.78-3.8 3.95V7.3H10.5v6.92c-1.6-.4-3.62-2.34-3.71-6.92" />
            </svg>
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="https://t.me/HelenaFreedom">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0m5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21l-1.446 1.394a.759.759 0 0 1-.6.295h-.005l.213-3.054l5.56-5.022c.24-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="https://wa.me/+79956499610?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5,%20">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
          </a>
        </li>
      </ul>
    </div>

  </footer>
</template>

<script>
import NavigationPanel from "@/common/NavigationPanel.vue";
import router from "@/components/router/router";

export default {
  components: {NavigationPanel},
  data () {
    return {
      pageAnchors: [],
      navBarDisabled: false,
      theme: '',
      user: {
        id: -1,
        first_name: 'Гость',
        last_name: '',
        username: 'guest',
        email: '',
        admin: false,
        hashed_password: '',
        date_stamp: ''
      },
      loginMessage: '',
      // Data from database
      sections: undefined,
      subsections: undefined,
      content: undefined,
      servicesItems: undefined,
      coursesItems: undefined,
      reviews: undefined,
      articles: undefined,
      studentsComments: undefined,
      articlesComments: undefined,

      //Meta
      ogTitle: '',
      ogImage: '',
      ogURL: ''
    }
  },
  methods: {
    localUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user) {
        this.setUser(user);
      } else {
        this.setUser(this.user);
      }

    },
    setUser(user) {
      this.user.id = user.id;
      this.user.first_name = user.first_name;
      this.user.last_name = user.last_name;
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.admin = user.admin;
      this.user.hashed_password = user.hashed_password;
      this.user.date_stamp = user.date_stamp;

      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      this.user = {
        id: -1,
        first_name: 'Гость',
        last_name: '',
        username: 'guest',
        email: '',
        admin: false,
        hashed_password: ''
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      router.push('/');
    },
    updatePageAnchors (anchors) {
      this.pageAnchors = anchors;
    },
    //region Load data and store in localStorage
    async loadSections () {
      const storeSections = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('sections', JSON.stringify(data));
        } else {
          localStorage.setItem('sections', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-sections', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeSections(data);
          });
    },
    async loadSubsections () {
      const storeSubSections = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('subsections', JSON.stringify(data));
        } else {
          localStorage.setItem('subsections', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-subsections', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeSubSections(data);
          });
    },
    async loadContent(){
      const storeContent = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('content', JSON.stringify(data));
        } else {
          localStorage.setItem('content', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-content', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeContent(data);
          });
    },
    async loadServices(){
      const storeServices = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('services', JSON.stringify(data));
        } else {
          localStorage.setItem('services', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-services', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeServices(data);
          });

    },
    async loadCourses(){
      const storeCourses = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('courses', JSON.stringify(data));
        } else {
          localStorage.setItem('courses', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-courses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeCourses(data);
          });

    },
    async loadReviews(){
      const storeReviews = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('reviews', JSON.stringify(data));
        } else {
          localStorage.setItem('reviews', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeReviews(data);
          });

    },
    async loadArticles(){
      const storeArticles = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('articles', JSON.stringify(data));
        } else {
          localStorage.setItem('articles', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-articles', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeArticles(data);
          });

    },
    async loadStudentsComments(){
      const storeStudentsComments = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('students_comments', JSON.stringify(data));
        } else {
          localStorage.setItem('students_comments', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-scomments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeStudentsComments(data);
          });

    },
    async loadArticlesComments(){
      const storeArticlesComments = (data) => {
        if(typeof data === 'object'){
          localStorage.setItem('articles_comments', JSON.stringify(data));
        } else {
          localStorage.setItem('articles_comments', JSON.stringify([]));
        }
      }

      await fetch('http://cosmmedic.ru:3000/api/load-articles-comments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeArticlesComments(data);
          });

    },
    //endregion
    async updateFromDB() {
      try {
        await this.loadSections()
        this.sections = this.getLocalStorageData('sections');

        await this.loadSubsections()
        this.subsections = this.getLocalStorageData('subsections');

        await this.loadContent()
        this.content = this.getLocalStorageData('content');

        await this.loadServices()
        this.servicesItems = this.getLocalStorageData('services');

        await this.loadCourses()
        this.coursesItems = this.getLocalStorageData('courses');

        await this.loadReviews()
        this.reviews = this.getLocalStorageData('reviews');

        await this.loadArticles()
        this.articles = this.getLocalStorageData('articles');

        await this.loadStudentsComments()
        this.studentsComments = this.getLocalStorageData('students_comments');

        await this.loadArticlesComments()
        this.articlesComments = this.getLocalStorageData('articles_comments');

      } catch (err) {
        console.warn(`An error occurred on loading data from database: ${err}`)
      }
    },
    getLocalStorageData(localstorage_item_name) {
      const data = JSON.parse(localStorage.getItem(localstorage_item_name));

      if(typeof data !== "object") {
        //Error in data or empty table
        console.log('data includes error')
        return [];
      } else {
        //If data is correct
        return data;
      }
    },
    disableNavBar(disable) {
      this.navBarDisabled = disable;
    },
    initTheme() {
      this.theme = localStorage.getItem('theme');
      if(this.theme === undefined || this.theme === null) {
        localStorage.setItem('theme', 'light');
      }
      const htmlElement = document.querySelector('html');
      htmlElement.setAttribute('data-bs-theme', this.theme);
    },
    switchTheme() {
      const htmlElement = document.querySelector('html');
      htmlElement.setAttribute('data-bs-theme', this.theme === 'light' ? 'dark' : 'light');
      this.theme = htmlElement.getAttribute('data-bs-theme');
      localStorage.setItem('theme', htmlElement.getAttribute('data-bs-theme'));
    },
    warnUserLogin() {
      this.loginMessage = 'У вас нет прав администратора. Если вы администратор - войдите под учетной записью администратора.';
    },
    resetLocalStorage() {
      localStorage.setItem('sections', JSON.stringify([]));
      localStorage.setItem('subsections', JSON.stringify([]));
      localStorage.setItem('content', JSON.stringify([]));
      localStorage.setItem('services', JSON.stringify([]));
      localStorage.setItem('courses', JSON.stringify([]));
      localStorage.setItem('reviews', JSON.stringify([]));
      localStorage.setItem('articles', JSON.stringify([]));
      localStorage.setItem('students_comments', JSON.stringify([]));
      localStorage.setItem('articles_comments', JSON.stringify([]));
    },

    updateMeta() {
      this.ogTitle = document.getElementById('pageTitle').innerText;
      this.ogImage = 'src/resources/logo.png';
      this.ogURL = this.$route.fullPath;

      document.getElementById('og_title').content = this.ogTitle;
      document.getElementById('og_image').content = 'http://cosmmedic.ru' + this.ogImage;
      document.getElementById('og_url').content = 'http://cosmmedic.ru' + this.ogURL;
    }
  },
  beforeMount() {
    this.localUser();
    this.resetLocalStorage()
    this.updateFromDB();
  },
  mounted() {
    this.initTheme();
    this.updateMeta()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@700&family=Raleway&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: scale 0.3s ease-in-out;
}

html {
  scroll-behavior: smooth;
}

.capitalize-first-letter:first-letter {
  text-transform: capitalize;
}

.fs-7 {
  font-size: 0.75rem !important;
}

.fs-8 {
  font-size: 0.5rem !important;
}

.fs-9 {
  font-size: 0.25rem !important;
}

.scale-on-hover:hover {
  scale: 1.05;
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.component-fade-enter, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter-to, .component-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.invert-image-color {
  filter: invert(1);
}

</style>