<template>
  <alert-box ref="alertBox"></alert-box>
  <nav class="navbar bg-primary sticky-top grid">
    <div class="container-fluid row">
      <div class="col-md-1">
        <button class="btn text-light m-0 p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <svg-icon type="mdi" size="48" :path="icons.burgerMenu"></svg-icon>
        </button>
      </div>

      <div class="col-md-7 col-lg-8 col-xxl-9">
        <!-- Search bar -->
        <div class="input-group">
          <div class="form-control-sm m-0 p-0">
            <select class="form-select" v-model="searchType">
              <option selected="selected" disabled hidden value="name">Фильтровать по</option>
              <option v-if="currentTable === 0 || currentTable === 1 || currentTable === 3 || currentTable === 5 || currentTable === 6" value="name" >По названию</option>
              <option v-if="currentTable === 1" value="parent">По разделу</option>
              <option v-if="currentTable === 2" value="name" >По подразделу</option>
              <option v-if="currentTable === 2" value="content">По содержимому</option>
              <option v-if="currentTable === 4" value="user_name">По пользователям</option>
              <option v-if="currentTable === 4" value="body">По отзывам</option>
              <option v-if="currentTable === 4" value="rating">По оценке</option>
              <option v-if="currentTable === 4" value="name">По услуге</option>
              <option v-if="currentTable === 6" value="author">По автору</option>
              <option v-if="currentTable === 6" value="body">По содержимому</option>
            </select>
          </div>
          <input type="search" class="form-control" v-model="searchQuery" placeholder="Поиск">
        </div>
      </div>

      <div class="col-md-4 col-lg-3 col-xxl-2 d-flex justify-content-center">
        <button class="btn btn-primary" @click="this.$emit('switchTheme')" @click.prevent>
          <svg-icon class="text-light" type="mdi" :path="icons.themeLightDark"></svg-icon>
        </button>

        <p class="text-light small m-2" v-if="user.admin">Вы вошли как: <br><strong>{{this.user.first_name}} {{this.user.last_name}}</strong></p>

        <button class="btn btn-primary">
          <svg-icon class="text-light" type="mdi" :path="icons.logout" @click.prevent="logout"></svg-icon>
        </button>
      </div>

      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Панель администратора</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <hr>
            <li class="text-secondary fs-5">Таблицы:</li>
            <hr>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 0}"
                  style="user-select: none"
                  @click="switchTable(0)"
                  aria-current="page"
              >
                Разделы
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 1}"
                  style="user-select: none"
                  @click="switchTable(1)"
              >
                Подразделы
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 2}"
                  style="user-select: none"
                  @click="switchTable(2)"
              >
                Контент
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 3}"
                  style="user-select: none"
                  @click="switchTable(3)"
              >
                Услуги
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 4}"
                  style="user-select: none"
                  @click="switchTable(4)"
              >
                Отзывы
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 5}"
                  style="user-select: none"
                  @click="switchTable(5)"
              >
                Курсы
              </a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link p-2"
                  :class="{'active': currentTable === 6}"
                  style="user-select: none"
                  @click="switchTable(6)"
              >
                Статьи
              </a>
            </li>
            <hr>
            <li class="text-secondary fs-5">Навигация по сайту:</li>
            <hr>
            <li class="nav-item">
              <router-link to="/" class="nav-link p-2">На главную</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/students" class="nav-link p-2">Студентам</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/articles" class="nav-link p-2">Статьи</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-fluid d-flex flex-column m-0 p-0">
    <frag-table
        :rows="currentTableData"
        :current-table="currentTable"
        @rowRemoved="updateFromDB"
        @alertBox="alertMessage"
        @callUpdate="updateFromDB"
        :search-query="searchQuery"
        :search-type="searchType"
        :sections="sections"
        :subsections="subsectionsNames"
    >
    </frag-table>
  </div>
  <creation-form
      :current-table="currentTable"
      :sections="sections"
      :subsections-names="subsectionsNames"
      @createItem="createItem"
      @alertBox="alertMessage"
  >
  </creation-form>
</template>

<script>
import FragTable from "@/components/UI/FragTable.vue";
import CreationForm from "@/components/UI/CreationForm.vue";
import MainFlexContainer from "@/components/UI/MainContainer.vue";
import Collage from "@/components/pages/main/Collage.vue";
import AlertBox from "@/common/AlertBox.vue";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThemeLightDark, mdiMenu, mdiLogin, mdiLogout  } from '@mdi/js';
import router from "@/components/router/router";

export default {
  components: {
    AlertBox, Collage, MainFlexContainer, CreationForm, FragTable, SvgIcon
  },
  data() {
    return {
      pageAnchors: [],
      sName: '',
      sId: '',
      sImgUrl: '',
      sectionsData: [],
      subsectionsData: [],
      contentData: [],
      servicesData: [],
      coursesData: [],
      reviewsData: [],
      articlesData: [],
      dialogVisible: false,
      currentTable: 0,
      searchQuery: '',
      searchType: 'name',
      icons: {
        themeLightDark: mdiThemeLightDark,
        burgerMenu: mdiMenu,
        login: mdiLogin,
        logout: mdiLogout
      },
      user: {
        first_name: 'Гость',
        last_name: '',
        username: 'guest',
        email: '',
        admin: false,
        hashed_password: ''
      }
    }
  },
  computed: {
    currentTableData() {
      switch (this.currentTable) {
        case 0:
          return this.sectionsData;
        case 1:
          return this.subsectionsData;
        case 2:
          return this.contentData;
        case 3:
          return this.servicesData;
        case 4:
          return this.reviewsData;
        case 5:
          return this.coursesData;
        case 6:
          return this.articlesData;
      }
    },
    //Function to return all unique names of sections
    sections() {
      return [...new Set(this.sectionsData)];
    },
    subsectionsNames() {
      return this.subsectionsData.map(subsection => {
        return {
          name: subsection.subsection_name,
          html_id: subsection.html_id
        };
      });
    },
  },
  methods: {
    checkUserStatus() {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(!this.user.admin) {
        router.push('/login');
        this.$emit('adminEnterAttempt');
      }
    },
    logout() {
      this.user = {
        first_name: 'Гость',
        last_name: '',
        username: 'guest',
        email: '',
        admin: false,
        hashed_password: ''
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      router.push('/login');
    },
    switchTable(tableNumber) {
      if (typeof tableNumber !== 'number') {
        throw new Error('The argument must be a number.');
      } else {
        this.currentTable = tableNumber;
      }
    },
    //Loading data from localstorage
    async updateDataFromLocalStorage () {
      this.sectionsData = JSON.parse(localStorage.getItem('sections'));
      this.subsectionsData = JSON.parse(localStorage.getItem('subsections'));
      this.contentData = JSON.parse(localStorage.getItem('content'));
      this.servicesData = JSON.parse(localStorage.getItem('services'));
      this.reviewsData = JSON.parse(localStorage.getItem('reviews'));
      this.coursesData = JSON.parse(localStorage.getItem('courses'));
      this.articlesData = JSON.parse(localStorage.getItem('articles'));
      console.log(`App data updated from localStorage`)
    },
    //Functions for creation
    async createItem (type, ...args) {
      switch (type) {
        case 'section':
          const [name, html_id, img_url] = args;
          console.log(`creating section... name: ${name}, html_id: ${html_id}, url: ${img_url}. `)
          await this.createSection(name, html_id, img_url);
          return;
        case 'subsection':
          const [ss_parent, ss_name, ss_html_id, ss_img_url] = args;
          await this.createSubsection(ss_parent, ss_name, ss_html_id, ss_img_url);
          return;
        case 'content':
          const [c_parent, c_type, c_param1, c_param2] = args;
          console.log(args);
          await this.createContent(c_parent, c_type, c_param1, c_param2);
          return;
        case 'service':
          const [ser_name, ser_html_id, ser_description, ser_img_url] = args;
          await this.createService(ser_name, ser_html_id, ser_description, ser_img_url);
          return;
        case 'course':
          const [cor_name, cor_html_id, cor_description, cor_img_url, cor_medical] = args;
          await this.createCourse(cor_name, cor_html_id, cor_description, cor_img_url, cor_medical);
          return;
        case 'article':
          const [art_title, art_body, art_author] = args;
          await this.createArticle(art_title, art_body, art_author);
          return;
        default:
          console.log(`Error when creating item of type: ${type}. With args: ${args}.`);
          alert(`Что то пошло не так... Не удалось добавить новый элемент. Тип не распознан.`);
          this.$refs.alertBox.alertMessage(`Что то пошло не так... Не удалось добавить новый элемент. Тип не распознан.`, true);
          return;
      }

    },
    async createSection(sectionName, sectionHTMLID, sectionImgURL) {
      await fetch('/api/create-section', {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json'
              },
          body: JSON.stringify({
            ms_name: sectionName,
            ms_html_id: sectionHTMLID,
            ms_img_url: sectionImgURL
          })
        })
          .then(res => {
            if (!res.ok) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании раздела ${sectionName}. ${res.detail}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Раздел ${sectionName} успешно создан.`, true);
              this.updateFromDB();
              res.json(); // Parse the response as JSON
            }
          })
          .catch((err) => {
            this.$refs.alertBox.alertMessage(err.message, false);
          });
    },
    async createSubsection(sub_parent_name, sub_name, sub_html_id, sub_img_url) {
      await fetch('/api/create-subsection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sub_parent_name: sub_parent_name,
          sub_name: sub_name,
          sub_html_id: sub_html_id,
          sub_img_url: sub_img_url
        })
      })
          .then(res => {
            if (!res.ok) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании подраздела ${sub_name}. ${res.detail}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Подраздел ${sub_name} успешно создан.`, true);
              this.updateFromDB();
              res.json(); // Parse the response as JSON
            }
          })
          .catch((err) => {
            this.$refs.alertBox.alertMessage(err.message, false);
          });
    },
    async createContent(content_parent_name, content_type, content_param_1, content_param_2) {
      await fetch('/api/create-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content_parent_name: content_parent_name,
          content_type: content_type,
          content_param_1: content_param_1,
          content_param_2: content_param_2
        })
      })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании контента: ${data.error}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Контент успешно создан.`, true);
              this.updateFromDB();
            }
          })
          .catch(error => {
            this.$refs.alertBox.alertMessage(`Ошибка при создании контента: ${error.message}`, false);
          });
    },
    async createService(name, html_id, description, img_url) {
      await fetch('/api/create-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          html_id: html_id,
          description: description,
          img_url: img_url
        })
      })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании услуги: ${data.error}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Услуга создана.`, true);
              this.updateFromDB();
            }
          })
          .catch(error => {
            this.$refs.alertBox.alertMessage(`Ошибка при создании услуги: ${error.message}`, false);
          });
    },
    async createCourse(name, html_id, description, img_url, medical) {
      console.log(`Creating course at Admin.vue. Name: ${name}. HTML_ID: ${html_id}. Desc: ${description}. IMG URL: ${img_url}. IS MEDICAL: ${medical}.`)

      await fetch('/api/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          html_id: html_id,
          description: description,
          img_url: img_url,
          medical: medical
        })
      })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании курса: ${data.error}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Курс создан.`, true);
              this.updateFromDB();
            }
          })
          .catch(error => {
            this.$refs.alertBox.alertMessage(`Ошибка при создании курса: ${error.message}`, false);
          });
    },
    async createArticle(title, body, author) {
      await fetch('/api/create-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          body: body,
          author: author
        })
      })
          .then(res => res.json())
          .then(data => {
            if (data.error) {
              this.$refs.alertBox.alertMessage(`Ошибка при создании статьи: ${data.error}`, false);
            } else {
              this.$refs.alertBox.alertMessage(`Статья создана.`, true);
              this.updateFromDB();
            }
          })
          .catch(error => {
            this.$refs.alertBox.alertMessage(`Ошибка при создании статьи: ${error.message}`, false);
          });
    },
    //Methods to store data in localstorage
    async loadSections () {
      const storeSections = (data) => {
        localStorage.setItem('sections', JSON.stringify(data));
      }

      await fetch('/api/load-sections', {
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
        localStorage.setItem('subsections', JSON.stringify(data));
      }

      await fetch('/api/load-subsections', {
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
        localStorage.setItem('content', JSON.stringify(data));
      }

      await fetch('/api/load-content', {
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
      const storeContent = (data) => {
        localStorage.setItem('services', JSON.stringify(data));
      }

      await fetch('/api/load-services', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeContent(data);
          });

    },
    async loadCourses(){
      const storeCourses = (data) => {
        localStorage.setItem('courses', JSON.stringify(data));
      }

      await fetch('/api/load-courses', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeCourses(data);
          });

    },
    async loadReviews() {
      const storeReviews = (data) => {
        localStorage.setItem('reviews', JSON.stringify(data));
      }

      await fetch('/api/load-reviews', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeReviews(data);
          });
    },
    async loadArticles() {
      const storeArticles = (data) => {
        localStorage.setItem('articles', JSON.stringify(data));
      }

      await fetch('/api/load-articles', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeArticles(data);
          });
    },
    async updateFromDB() {
      try {
        await this.loadSections()
        await this.loadSubsections()
        await this.loadContent()
        await this.loadServices()
        await this.loadReviews()
        await this.loadCourses()
        await this.loadArticles()
        console.log(`Data from database updated successfully.`)
        await this.updateDataFromLocalStorage();
        console.log(`Data from localStorage added to app`)
      } catch (err) {
        console.log(`An error occurred on loading data from database: ${err}`)
      }
    },
    alertMessage(message, statusOK) {
      this.$refs.alertBox.alertMessage(message, statusOK)
    }
  },
  beforeMount() {
    this.checkUserStatus()
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Панель администратора';
    this.$emit('updatePageAnchors', this.pageAnchors);
    this.$emit('adminActive', true);
    this.updateFromDB();
  },
  beforeUnmount() {
    this.$emit('adminActive', false);
  },
  beforeRouteLeave(to, from, next) {
    console.log('Navigating away from:', from.path);
    next();
  },
}
</script>

<style scoped>
.nav-link:hover {
  color: var(--bs-primary) !important;
  background-color: #31313120;
}

.active {
  color: var(--bs-primary) !important;
  font-weight: bold;
}
</style>