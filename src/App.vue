<template>

  <navigation-panel :page-anchors="pageAnchors" :at-admin="navBarDisabled"></navigation-panel>
  <div class="app">
    <router-view @updatePageAnchors="updatePageAnchors" @dataUpdateRequest="updateFromDB" @adminActive="disableNavBar"></router-view>
  </div>

</template>

<script>
import NavigationPanel from "@/common/NavigationPanel.vue";

export default {
  components: {NavigationPanel},
  data () {
    return {
      pageAnchors: [],
      navBarDisabled: false
    }
  },
  methods: {
    //Method to update current page's anchors
    updatePageAnchors (anchors) {
      this.pageAnchors = anchors;
    },
    //Methods to store data in localstorage
    //Sections loading
    loadSections () {
      fetch('/api/load-sections', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeSections(data);
          });
      const storeSections = (data) => {
        localStorage.setItem('sections', JSON.stringify(data));
      }
    },
    //Subsections
    loadSubsections () {
      fetch('/api/load-subsections', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeSubSections(data);
          });
      const storeSubSections = (data) => {
        localStorage.setItem('subsections', JSON.stringify(data));
      }
    },
    //Content
    loadContent(){
      fetch('/api/load-content', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
          .then(data => {
            storeContent(data);
          });
      const storeContent = (data) => {
        localStorage.setItem('content', JSON.stringify(data));
      }
    },
    async updateFromDB() {
      try {
        await this.loadSections()
        await this.loadSubsections()
        await this.loadContent()
        console.log(`Data from database updated successfully.`)
      } catch (err) {
        console.log(`An error occurred on loading data from database: ${err}`)
      }
    },

    disableNavBar(disable) {
      this.navBarDisabled = disable;
    }
  },
  mounted() {
    this.updateFromDB();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@700&family=Raleway&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #f0f0f0;
}

:root {
  --comm-color-primary: #615dfa;
  --comm-color-secondary: #eee;
  --comm-color-tretiary: #23d2e2;
  --comm-color-tretiary-hover: #1bc5d4;
  --arrow-buttons-background-color: #f2f2f2;
  --item-back-color: #fff;
  --heading-font-family: 'Alumni Sans', sans-serif;
  --description-font-family: 'Raleway', sans-serif;
  --text-font-color: #8F91AC;
  --headings-font-color: #3e3f5e;
  --item-box-shadow-color: #d0d0d0;
  --header-box-shadow-color: #606060;

  --comm-border-radius: 10px;
  --comm-border-radius-thin: 5px;
  --comm-font-size-tiny: 12px;
  --comm-font-size-small: 16px;
  --comm-font-size-medium: 24px;
  --comm-font-size-large: 32px;
  --comm-font-size-x-large: 48px;
  --comm-font-size-xx-large: 56px;
  --comm-font-size-xxx-large: 64px;

  --comm-nav-panel-height: 80px;
  --comm-admin-panel-width: 180px;

  /* Items variables */
  --item-width: 250px;
  --item-height: 360px;
  --item-contact-height: 300px;

  --name-panel-height:60px;
}

.app {
  /*margin-top: var(--comm-nav-panel-height);*/

}
</style>