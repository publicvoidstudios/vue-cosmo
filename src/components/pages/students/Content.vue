<template>

  <div v-if="content.videos.length" class="content-section videos" id="videos">
    <!--Header-->
    <div class="content-section-header">Видео</div>
    <div class="content-items">
      <div class="content-item" v-for="item in content.videos">
        <div class="item-self" v-html="replaceYouTubeWidthAndHeight(item.param2, 560, 315)"></div>
        <span class="item-name"> {{ item.param1 }} </span>
      </div>
    </div>
  </div>

  <div v-if="content.articles.length" class="content-section articles" id="articles">
    <div class="content-section-header">Статьи</div>
    <div class="content-items">
      <div class="content-item" v-for="item in content.articles">
        <span class="item-name"> {{ item.param1 }} </span>
        <div class="item-self">
          <p>
            {{ item.param2 }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="content.presentations.length" class="content-section presentations" id="presentations">
    <div class="content-section-header">Презентации</div>
    <div class="content-items">
      <div class="content-item" v-for="item in content.presentations">
        <div class="item-self" v-html="replacePPTXWidthAndHeight(item.param2, 560, 315)"></div>
        <span class="item-name"> {{ item.param1 }} </span>
      </div>
    </div>
  </div>

  <div v-if="content.images.length" class="content-section images" id="images">
    <div class="content-section-header">Галерея</div>
    <div class="content-items">
      <div class="content-item" v-for="item in content.images">
        <div class="item-self">
          <img  :src="item.param2" :alt="item.param1">
        </div>
        <span class="item-name"> {{ item.param1 }} </span>
      </div>
    </div>
  </div>
  <div v-else-if="!content.images.length && !content.videos.length && !content.presentations.length && !content.articles.length" class="default">В этом подразделе пока ничего нет...</div>
</template>

<script>

export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pageAnchors: []
    }
  },
  methods: {
    replacePPTXWidthAndHeight(str, newWidth, newHeight) {
      const regex = /width="(\d+px?)" height="(\d+px?)"/;
      return str.replace(regex, `width="${newWidth}px" height="${newHeight}px"`);
    },
    replaceYouTubeWidthAndHeight(str, newWidth, newHeight) {
      const regex = /width="(\d+)" height="(\d+)"/;
      return str.replace(regex, `width="${newWidth}" height="${newHeight}"`);
    },
    addObjectProperty(obj, key, value) {
      return {
        ...obj,
        [key]: value
      };
    },
    updatePageAnchors(){
      if(this.content.videos.length) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,0,{
          id: 0,
          link: 'videos',
          displayName: 'Видео'
        })
      }
      if(this.content.articles.length) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,1,{
          id: 1,
          link: 'articles',
          displayName: 'Статьи'
        })
      }
      if(this.content.presentations.length) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,2,{
          id: 2,
          link: 'presentations',
          displayName: 'Презентации'
        })
      }
      if(this.content.images.length) {
        this.pageAnchors = this.addObjectProperty(this.pageAnchors,3,{
          id: 3,
          link: 'images',
          displayName: 'Галерея'
        })
      }
    }
  },
  mounted() {
    this.updatePageAnchors();
    this.$emit('updatePageAnchors', this.pageAnchors)
  }
}
</script>

<style scoped>
.default {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-font-color);
  font-size: var(--comm-font-size-medium);
}

.content-section {
  margin: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px 0 var(--item-box-shadow-color);
  border-radius: var(--comm-border-radius);
  width: 100%;
  max-height: 100vh;
  overflow: auto;

  .content-section-header {
    background: linear-gradient(to right, var(--comm-color-primary), var(--comm-color-tretiary));
    border-radius: var(--comm-border-radius);
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    font-size: var(--comm-font-size-medium);
    font-family: var(--description-font-family);
    color: var(--comm-color-secondary);
    box-shadow: 0 0 10px 0 white;
    z-index: 1;
  }

  .content-items {
    margin-top: 25px;
    z-index: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;


    scrollbar-width: thin;

    .content-item {
      margin: 10px;
      padding: 10px;

      display: flex;
      flex-direction: column;

      background-color: var(--item-back-color);
      border-radius: var(--comm-border-radius-thin);

      box-shadow: 0 0 10px 0 var(--item-box-shadow-color);

      .item-self {
        border-radius: var(--comm-border-radius-thin);
        overflow: hidden;
        max-width: 560px;
        max-height: 315px;

        p {
          padding: 0 20px;
          display: -webkit-box;
          -webkit-line-clamp: 12; /* Number of lines to show */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        img {
          width: 400px;
        }
      }

      .item-name {
        margin: 20px;
        font-family: var(--description-font-family);
        text-align: center;

      }
    }
  }
}
</style>