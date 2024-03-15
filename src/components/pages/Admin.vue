<template>
  <alert-box ref="alertBox"></alert-box>
  <p class="panel-name">Панель администратора</p>
  <div class="container">
    <admin-nav-panel>
      <div class="tables nav-section">
        <p class="nav-section-header">Наполнение сайта</p>
        <button
            class="nav-button "
            :class="{'selected': currentTable === 0}"
            style="user-select: none"
            @click="switchTable(0)"
        >
          Разделы
        </button>

        <button
            class="nav-button"
            :class="{'selected': currentTable === 1}"
            style="user-select: none"
            @click="switchTable(1)"
        >
          Подразделы
        </button>

        <button
            class="nav-button"
            :class="{'selected': currentTable === 2}"
            style="user-select: none"
            @click="switchTable(2)"
        >
          Контент
        </button>
      </div>
      <div class="pages nav-section">
        <p class="nav-section-header">Навигация по сайту</p>
        <router-link to="/" class="nav-button r-link">На главную</router-link>
        <router-link to="/students" class="nav-button r-link">Студентам</router-link>
      </div>

    </admin-nav-panel>
    <main-flex-container >
      <dialog-window v-model:show="dialogVisible">
        <creation-form
            :current-table="currentTable"
            :sections="sections"
            :subsections-names="subsectionsNames"
            @createItem="createItem"
            @alertBox="alertMessage"
        >
        </creation-form>
      </dialog-window>
      <frag-table :rows="currentTableData" :current-table="currentTable" @rowRemoved="updateData" @alertBox="alertMessage">
        <template v-slot:add-button>
          <frag-button
              style="margin: 0"
              @click="showDialog"
          >
            Добавить
          </frag-button>
        </template>
      </frag-table>
    </main-flex-container>
  </div>
</template>

<script>

import NavPanel from "@/components/UI/AdminNavigationPanel.vue";
import FragButton from "@/components/UI/FragButton.vue";
import FragTable from "@/components/UI/FragTable.vue";
import NavButton from "@/components/UI/NavigationButton.vue";
import DialogWindow from "@/components/UI/DialogWindow.vue";
import InputSmall from "@/components/UI/InputSmall.vue";
import CreationForm from "@/components/UI/CreationForm.vue";
import InputBig from "@/components/UI/InputBig.vue";
import MainFlexContainer from "@/components/UI/MainContainer.vue";
import Collage from "@/components/pages/main/Collage.vue";
import AdminNavPanel from "@/components/UI/AdminNavigationPanel.vue";
import AlertBox from "@/common/AlertBox.vue";

export default {
  components: {
    AlertBox,
    AdminNavPanel,
    Collage,
    MainFlexContainer,
    InputBig, CreationForm, InputSmall, DialogWindow, NavButton, FragTable, FragButton, NavPanel
  },
  data() {
    return {
      pageAnchors: [],
      sectionsData: [],
      sName: '',
      sId: '',
      sImgUrl: '',
      subsectionsData: [],
      contentData: [],
      dialogVisible: false,
      currentTable: 0,

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
    showDialog() {
      this.dialogVisible = true;
    },
    switchTable(tableNumber) {
      if (typeof tableNumber !== 'number') {
        throw new Error('The argument must be a number.');
      } else {
        this.currentTable = tableNumber;
      }
    },
    //Loading data from localstorage
    updateDataFromLocalStorage () {
      this.sectionsData = JSON.parse(localStorage.getItem('sections'));
      this.subsectionsData = JSON.parse(localStorage.getItem('subsections'));
      this.contentData = JSON.parse(localStorage.getItem('content'));
    },


    //Functions for creation of sections, subsections and content

    createItem (type, ...args) {
      switch (type) {
        case 'section':
          const [name, html_id, img_url] = args[0];
          this.createSection(name, html_id, img_url);
          return;
        case 'subsection':
          const [ss_parent, ss_name, ss_html_id, ss_img_url] = args[0];
          this.createSubsection(ss_parent, ss_name, ss_html_id, ss_img_url);
          return;
        case 'content':
          const [c_parent, c_type, c_param1, c_param2] = args[0];
          this.createContent(c_parent, c_type, c_param1, c_param2);
          return;
        default:
          console.log(`Error when creating item of type: ${type}. With args: ${args}.`);
          alert(`Что то пошло не так... Не удалось добавить новый элемент. Тип не распознан.`);
          return;
      }

    },

    createSection(sectionName, sectionHTMLID, sectionImgURL) {
      fetch('/api/create-section', {
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
          .then(res => res.json())
          .then((response) => {
            if (!response.ok) {
              //Alert user that there was an error
              this.$refs.alertBox.alertMessage(`Ошибка при создании раздела ${sectionName}.`, false);
            }
            //Otherwise alert of success
            this.$refs.alertBox.alertMessage(`Раздел ${sectionName} успешно создан.`, true);
            //And call data update function
            this.updateData();
          });
    },

    createSubsection(sub_parent_name, sub_name, sub_html_id, sub_img_url) {
      fetch('/api/create-subsection', {
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
          .then(res => res.json())
          .then((response) => {
            if (!response.ok) {
              //Alert user that there was an error
              this.$refs.alertBox.alertMessage(`Ошибка при создании подраздела ${sub_name}.`, false);
            }
            //Otherwise alert of success
            this.$refs.alertBox.alertMessage(`Подраздел ${sub_name} успешно создан.`, true)
            //And call data update function
            this.updateData();
          });
    },

    createContent(content_parent_name, content_type, content_param_1, content_param_2) {
      fetch('/api/create-content', {
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
          .then(res => {
            if (res.ok) {
              return res.json(); // Parse the response as JSON
            } else {
              throw new Error('Network response was not ok');
            }
          })
          .then((response) => {
            if (!response.ok) {
              //Alert user that there was an error
              this.$refs.alertBox.alertMessage(`Не удалось добавить контент.`, false);
            }
            //Otherwise alert of success
            this.$refs.alertBox.alertMessage(`Контент добавлен`, true);
            //And call data update function
            this.updateData();
          });
    },

    async updateData(){
      const timeout = 1000;
      console.log(`LocalStorage will be updated in ${timeout/1000}s...`)
      await this.callDBUpdate(timeout);
      console.log(`App will be updated in ${timeout/1000}s...`)
      await this.callLocalUpdate(timeout*2);
    },
    callDBUpdate(timeout) {
      setTimeout(() => {
        this.$emit('dataUpdateRequest');
      }, timeout);
    },
    callLocalUpdate(timeout) {
      setTimeout(() => {
        this.updateDataFromLocalStorage()
      }, timeout);
    },

    alertMessage(message, statusOK) {
      this.$refs.alertBox.alertMessage(message, statusOK)
    }

  },
  mounted() {
    this.$emit('updatePageAnchors', this.pageAnchors);
    this.$emit('adminActive', true);
    this.updateDataFromLocalStorage();
  },
  beforeUnmount() {
    this.$emit('adminActive', false);
  }
}
</script>

<style scoped>

.container{
  position: fixed;
  top: var(--name-panel-height);
  left: var(--comm-admin-panel-width);
  bottom: 0;
  right: 0;
}
.panel-name{
  font-family: var(--description-font-family);
  font-size: 1.75em;
  font-weight: 800;
  color: var(--headings-font-color);
  text-align: left;
  padding: 10px;
  background-color: var(--item-back-color);
  border: 1px solid lightgrey;
  height: var(--name-panel-height);
  width: 100%;
  user-select: none;
}
.nav-button {
  background-color: transparent;
  border: none;
  width: 100%;
  padding: 15px;
  margin: 0;
  color: var(--text-font-color);
  font-family: var(--description-font-family);
  font-size: var(--comm-font-size-small);
  text-align: left;
}

.r-link {
  text-decoration: none;
  display: block;
}

.selected {
  color: var(--comm-color-tretiary-hover);
}

.nav-button:hover {
  background-color: #0001;
  color: var(--headings-font-color);
  cursor: pointer;
}

.nav-section {
  padding: 0;
  margin: 25px 0;

  .nav-section-header {
    font-family: var(--description-font-family);
    font-size: var(--comm-font-size-tiny);
    color: #c0c0c0;
    padding: 5px 15px;
  }
}


</style>