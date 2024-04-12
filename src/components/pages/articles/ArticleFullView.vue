<template>
  <alert-box ref="alertBox"></alert-box>
  <div class="container">
    <div class="my-4" v-if="pageContent">
      <h1 class="h2 mb-4 text-light-emphasis text-center">{{ pageContent.title }}</h1>
      <div class="my-3" v-html="pageContent.body"></div>
    </div>
    <!-- Share section -->
    <div id="ya-share-div" :class="{'visually-hidden' : !pageContent}" class="d-flex justify-content-start justify-content-md-end align-items-center flex-wrap py-0 px-5">
      <p class="mt-3 me-2">Поделиться этой статьей:</p>
    </div>
    <!-- Comments section -->
    <div class="my-3 mx-0" v-if="pageContent">
      <div class="position-relative">
        <form
            class="m-0 mb-3 p-0 border border-1 p-2 rounded"
            :style="user.id === -1 ? { filter: 'blur(1px)' } : {}">
          <div class="mb-3 p-3 border border-1 rounded">
            <strong class="text-light-emphasis">@{{user.username}}</strong>
            <textarea class="form-control mt-3" maxlength="500" placeholder="Ваш комментарий..." v-model="comment" required/>
          </div>

          <div class="d-flex flex-wrap justify-content-end mb-2" v-if="user.id !== -1">
            <button class="btn btn-secondary ms-2" @click.prevent="comment = ''">Отмена</button>
            <button class="btn btn-primary ms-2" @click.prevent="addComment($route.params.id, user.id, comment)">Оставить комментарий</button>
          </div>
        </form>
        <div
            v-if="user.id === -1"
            class="d-flex flex-column justify-content-center align-items-center my-3 bg-dark bg-opacity-10 position-absolute start-0 w-100 h-100 rounded"
            style="top: -1em"
        >
          <p class="text-center">Оставлять комментарии могут только зарегистрированные пользователи</p>
          <a class="btn btn-primary" href="/login">Войти</a>
        </div>
      </div>

      <div v-if="users.length">
        <div class="mb-3 h5" v-if="filteredComments.length">Комментарии:</div>
        <div>
          <div class="mb-3 p-3 border border-1 rounded shadow" v-for="comment in filteredComments">
            <strong class="text-light-emphasis">@{{ displayUserName(comment.user_id) }}</strong>
            <span class="small text-light-emphasis rounded bg-body-secondary px-2 ms-2">{{ timeCount(comment.date_stamp) }}</span>
            <p class="text-light-emphasis mt-3">{{comment.body}}</p>
            <div class="d-flex justify-content-between">
              <div>
                <span class="mx-1">{{ comment?.likes?.length }}</span>
                <button class="btn comment-button rounded-circle p-1 me-2" :class="{'text-primary' : userLiked(comment)}" @click.prevent="reactOnComment(comment.id, true)"><svg-icon type="mdi" :path="icons.like"></svg-icon></button>
                <span>{{ comment?.dislikes?.length }}</span>
                <button class="btn comment-button rounded-circle p-1" :class="{'text-primary' : userDisliked(comment)}" @click.prevent="reactOnComment(comment.id, false)"><svg-icon type="mdi" :path="icons.dislike"></svg-icon></button>
              </div>
              <button v-if="comment.user_id === user.id || user.admin" class="btn text-light-emphasis comment-button rounded-circle p-1" @click.prevent="removeComment(comment.id)"><svg-icon type="mdi" :path="icons.remove"></svg-icon></button>
            </div>

          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>


    </div>
  </div>
  <div v-if="!pageContent" class="d-flex justify-content-center text-primary mt-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Загрузка...</span>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete, mdiThumbUp, mdiThumbDown } from '@mdi/js';
import AlertBox from "@/common/AlertBox.vue";
import NotFoundPage from "@/components/pages/NotFoundPage.vue";
export default {
  components: {
    NotFoundPage,
    AlertBox,
    SvgIcon
  },
  props: {
    articles: {
      required: true,
      default: []
    },
    user: {
    },
    articlesComments: {
      required: true,
      default: []
    }
  },
  data() {
    return {
      pageAnchors: [],
      articleID: -1,
      comment: '',
      users: [],
      icons: {
        remove: mdiDelete,
        like: mdiThumbUp,
        dislike: mdiThumbDown
      }
    }
  },
  mounted() {
    this.$emit('updatePageAnchors', this.pageAnchors)
    this.getUsersList()
    this.articleID = parseInt(this.$route.params.id);
    this.checkContentAvailability();
    this.setMeta();
    this.createYandexShareField()
  },
  methods: {
    async addComment(content_id, user_id, body) {
      if(body.trim(' ') !== '') {
        //If comment is not empty
        await fetch('/api/create-article-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content_id: content_id,
            user_id: user_id,
            body: body
          })
        })
            .then(res => {
              if (!res.ok) {
                console.log(res);
              } else {
                this.comment = '';
              }
              this.$emit('dataUpdateRequest');
            })
            .catch((err) => {
              console.error(err);
            });
      }
    },
    async reactOnComment(comment_id, reaction) {
      //If user is not guest
      if(this.user.id !== -1) {
        //Conditionally set like and dislike values to pass them to server later
        const like = reaction ? this.user.id : null;
        const dislike = reaction ? null : this.user.id;

        await fetch('/api/modify-article-comment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: comment_id,
            likes: like,
            dislikes: dislike
          })
        })
            .then(res => {
              //Warn user if error occurred
              if(!res.ok) {
                this.$refs.alertBox.alertMessage('Произошла ошибка. Попробуйте снова.', false)
              }
              //Update data anyways
              this.$emit('dataUpdateRequest');
            })
            .catch(err => {
              //Log error if it happens
              console.error(err)
            })
      } else {
        //Remind user to login before liking or disliking
        this.$refs.alertBox.alertMessage('Ставить лайки могут только зарегистрированные пользователи.', false)
      }


    },
    async removeComment(id) {
      await fetch('/api/remove-article-comment', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
          .then((response) => {
            if (!response.ok) {
              this.$refs.alertBox.alertMessage(`Не удалось удалить комментарий. Попробуйте еще раз.`, false);
            }
            this.$refs.alertBox.alertMessage(`Комментарий удален.`, true);

            this.$emit('dataUpdateRequest');
          })
          .catch((error) => {
            console.error(error);
          });
    },
    async getUsersList() {
      this.users = await fetch('/api/load-users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())
    },
    displayUserName(user_id) {
      if(this.users.length) {
        const comment_user = this.users.find(user => user.id === user_id);
        if(comment_user)
          return comment_user.username;
      } else {
        return '';
      }
    },
    timeCount(timeStamp) {
      const dateNow = new Date();
      const dateTimeStamp = new Date(timeStamp);

      const diffInMilliseconds = Math.abs(dateTimeStamp - dateNow);
      const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if(minutes < 3 && hours < 1) {
        return `Только что`
      }
      else if(hours < 1 && minutes >=3) {
        return `${minutes} мин. назад`
      }
      else if(hours < 24) {
        return `${hours} ч. назад`
      }
      else if(hours >= 24 && days < 30) {
        return `${days} дн. назад`
      }
      else if(days >= 30 && days < 365) {
        return `${months} мес. назад`
      }
      else if(days >= 365) {
        return `${years} г. назад`
      }
    },
    userLiked(comment) {
      return comment?.likes?.includes(this.user.id);
    },
    userDisliked(comment) {
      return comment?.dislikes?.includes(this.user.id);
    },
    checkContentAvailability() {
      if(this.articles?.length && this.articleID !== -1) {
        if(!this.articles.some(obj => obj.id === this.articleID)) {
          this.$router.push('/404');
        }
      } else {
        console.log(`Checkup was not ready... Retrying...`)
        setTimeout(() => {
          this.checkContentAvailability();
        }, 500)
      }
    },
    setMeta() {
      if(this.pageContent) {
        document.getElementById('pageTitle').innerText = `${this.pageContent?.title || 'Статья'} - Медицина и Косметология 2.0`;
        document.getElementById('og_url').content = 'http://cosmmedic.ru' + this.$route.fullPath;
        document.getElementById('og_title').content = this.pageContent?.title;
      } else {
        setTimeout(() => {
          this.setMeta()
        }, 50)
      }
    },
    createYandexShareField() {
      setTimeout(() => {
        // Create a script element
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://yastatic.net/share2/share.js';

        const imgURL = document.getElementById('og_image').content;
        console.log(imgURL)

        // Create a div element for the share buttons
        const divElement = document.createElement('div');
        divElement.classList.add('ya-share2');
        divElement.setAttribute('data-curtain', '');
        divElement.setAttribute('data-color-scheme', 'normal');
        divElement.setAttribute('data-image', imgURL);
        divElement.setAttribute('data-limit', '3');
        divElement.setAttribute('data-popup-direction', 'auto');
        divElement.setAttribute('data-services', 'vkontakte,telegram,twitter,viber,whatsapp,lj,blogger,odnoklassniki');

        /* Use Vue's $nextTick to access the element after the next DOM update,
           to ensure that element is created, before trying to access it*/
        this.$nextTick(() => {
          this.appendYandexTags(scriptElement, divElement)
        });
      }, 500)
    },
    appendYandexTags(scriptElement, divElement) {
      console.log(`Appending y tags`)
      const targetElement = document.getElementById('ya-share-div');
      if (targetElement) {
        // Append the script
        targetElement.appendChild(scriptElement);

        // Append the div containing share buttons
        targetElement.appendChild(divElement);
      }
    }
  },
  computed: {
    pageContent() {
      return this.articles.find(item => item.id === this.articleID);
    },
    filteredComments() {
      if(this.articlesComments.length) {
        const filteredArray = this.articlesComments.filter(comment => comment.content_id === this.articleID);
        return filteredArray.sort((a, b) => b.likes?.length - a.likes?.length);
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.comment-button:hover {
  background-color: #80808080;
}
</style>