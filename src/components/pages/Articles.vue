<template>
  <div class="container-fluid overflow-auto">
    <h1 class="h1 text-secondary-emphasis">Cтатьи</h1>
    <hr>
    <div class="grid">
      <div class="row">
        <div class="col-md-4" v-for="article in articles">
          <article-element :article="article"></article-element>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ArticleElement from "@/components/pages/articles/ArticleElement.vue";

export default {
  components: {ArticleElement},
  data() {
    return {
      articles: [],
    }
  },
  methods: {
    async loadArticles() {
      const storeArticles = (data) => {
        localStorage.setItem('articles', JSON.stringify(data));
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
    updateArticlesFromLocalStorage() {
      this.articles = JSON.parse(localStorage.getItem('articles'));
    },
    async updateData() {
      await this.loadArticles();
      this.updateArticlesFromLocalStorage();
    }
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Статьи';
    this.updateData();
  }
}
</script>

<style scoped>

</style>