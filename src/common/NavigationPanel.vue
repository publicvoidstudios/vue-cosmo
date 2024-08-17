<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark sticky-top" v-if="!atAdmin" :class="{'navbar-hidden': isPanelHidden}">
    <div class="container">
      <a class="navbar-brand text-uppercase fw-medium fs-4 text-light-emphasis" href="/">
        <img src="../resources/site_logo.png" alt="" class="img-fluid" style="max-width: 40px">
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Переключатель навигации">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse fs-4 fw-medium " id="navbarNav">
        <ul class="navbar-nav">
          <!--     Page anchors     -->
          <li class="nav-item" v-for="anchor in pageAnchors">
            <a class="nav-link text-uppercase" aria-current="page" :href="'#' + anchor.link" :id="'link_' + anchor.link" @click="setActiveLink(anchor.link)">{{ anchor.displayName }}</a>
          </li>
          <!--     Common dropdown menu     -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-uppercase" href="#" role="button" @click="toggleDropdown" aria-expanded="false">
              Ещё
            </a>
            <ul class="dropdown-menu" :style="dropdownExpanded ? dropdownStyle : null">
              <li><a class="dropdown-item disabled" href="/students">Студентам</a></li>
              <li><a class="dropdown-item" href="/articles">Статьи</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <button class="btn text-dark" @click="this.$emit('switchTheme')" @click.prevent>
        <svg-icon class="text-light" type="mdi" :path="icons.themeLightDark"></svg-icon>
      </button>
      <a v-if="user.id !== -1" class="btn text-light" href="/profile">
        {{user.username}}
      </a>
      <button v-if="user.id !== -1" class="btn text-dark" @click="this.$emit('logout')" @click.prevent>
        <svg-icon class="text-light" type="mdi" :path="icons.logout"></svg-icon>
      </button>
      <a v-if="user.id === -1" class="btn text-dark" href="/login">
        <svg-icon class="text-light" type="mdi" :path="icons.login"></svg-icon>
      </a>
    </div>
  </nav>

</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThemeLightDark, mdiLogin, mdiLogout  } from '@mdi/js';
import router from "@/components/router/router";

export default {
  name: 'navigation-panel',
  components: {SvgIcon},
  props: {
    pageAnchors: {
      type: Array
    },
    atAdmin: {
      type: Boolean,
      default: false
    },
    user: {
      required: true
    }
  },
  data() {
    return {
      lastScrollPosition: 0,
      isPanelHidden: false,
      icons: {
        themeLightDark: mdiThemeLightDark,
        login: mdiLogin,
        logout: mdiLogout
      },
      dropdownStyle: {
        display: 'flex !important',
        flexDirection: 'column',
      },
      dropdownExpanded: false
    };
  },
  methods: {
    router() {
      return router
    },
    setActiveLink(id) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
      });
      document.querySelector('#link_' + id).classList.add('active');
    },
    toggleDropdown() {
      this.dropdownExpanded = !this.dropdownExpanded;
    }
  }
}
</script>