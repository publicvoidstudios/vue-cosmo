<template>
    <section class="top-nav" :class="{ 'hidden': isPanelHidden }" v-if="!atAdmin">
      <div>
        <router-link to="/" class="always-active link">
          <img src="../../public/icons/site_logo.png" alt=""/>
        </router-link>
      </div>
      <div class="page-anchors">
        <page-nav-link v-for="anchor in pageAnchors" :link="anchor.link">{{anchor.displayName}}</page-nav-link>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label class='menu-button-container' for="menu-toggle">
        <div class='menu-button'></div>
      </label>
      <div class="menu">
        <router-link to="/students" class="link">Студентам</router-link>
        <router-link to="/admin" class="link">Панель администратора</router-link>
      </div>
    </section>
</template>

<script>
import PageNavLink from "@/common/PageNavigationLink.vue";

export default {
  name: 'navigation-panel',
  components: {PageNavLink},
  props: {
    pageAnchors: {
      type: Array
    },
    atAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastScrollPosition: 0,
      isPanelHidden: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY;

      this.isPanelHidden = currentScrollPosition > this.lastScrollPosition;

      this.lastScrollPosition = currentScrollPosition;
    }
  }
}
</script>

<style scoped>


img{
  width: var(--comm-nav-panel-height);
}
a{
  padding: 10px;
  text-decoration: none;
  font-family: var(--heading-font-family);
  font-size: var(--comm-font-size-large);
  color: var(--comm-color-secondary);
  width: 100%;
  height: 100%;
}


.router-link-active:not(.always-active).router-link-exact-active:not(.always-active){
  animation: fadeOut 0.3s forwards;
}

.link:not(.router-link-active).link:not(.router-link-exact-active).link:not(.always-active){
  animation: fadeIn 0.3s forwards;
}

.link {
  height: 100%;
  display: flex;
  align-items: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    display: block;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: var(--comm-color-primary);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #FFF;
  height: var(--comm-nav-panel-height);
  padding: 1em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.page-anchors {
  display: flex;
  flex-direction: row;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > a {
  margin: 0 1rem;
  overflow: hidden;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  margin-top: -8px;
}

.menu-button::after {
  content: '';
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0;
  transform: rotate(-405deg);
}
.menu-button-container {
  display: flex;
}
.menu {
  position: absolute;
  top: 0;
  margin-top: var(--comm-nav-panel-height);
  right: 0;
  flex-direction: column;
  width: auto;
  justify-content: center;
  align-items: center;
}
#menu-toggle ~ .menu a {
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
#menu-toggle:checked ~ .menu a {
  height: 1.25em;
  width: 100%;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  padding: 10px;
}
.menu > a {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0;
  width: 100%;
  background-color: var(--comm-color-primary);
}

a:hover{
  color: var(--comm-color-tretiary-hover);
}

.hidden {
  transform: translateY(-100%);
  transition: transform 0.3s;
}
</style>