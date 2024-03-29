<template>
    <div
        class="card shadow"
    >
      <!-- Тело карточки -->
      <div class="row g-0">
        <!-- Изображение карточки -->
        <div class="col-md-5 d-flex align-items-start justify-content-center p-0 overflow-hidden bg-light-subtle rounded-start">
          <img
              class="rounded w-100 h-100 object-fit-cover"
              style="max-height: 296px"
              :src="imageURL"
              :alt="imageURL"
          >
        </div>
        <!-- Название, рейтинг и кнопки карточки -->
        <div class="col-md-7 bg-light-subtle rounded-end">
          <div class="card-body d-flex flex-column justify-content-between h-100 mt-3">
            <h5 class="card-title text-uppercase overflow-hidden" style="height: 72px;">{{name}}</h5>
            <div class="d-flex flex-column align-items-end">
              <div class="text-warning">
                <span v-if="averageRating >= 0.5" class="star">&#9733;</span>
                <span v-if="averageRating >= 1.5" class="star">&#9733;</span>
                <span v-if="averageRating >= 2.5" class="star">&#9733;</span>
                <span v-if="averageRating >= 3.5" class="star">&#9733;</span>
                <span v-if="averageRating >= 4.5" class="star">&#9733;</span>
                <span v-if="averageRating < 0.5" class="star">&#9734;</span>
                <span v-if="averageRating < 1.5" class="star">&#9734;</span>
                <span v-if="averageRating < 2.5" class="star">&#9734;</span>
                <span v-if="averageRating < 3.5" class="star">&#9734;</span>
                <span v-if="averageRating < 4.5" class="star">&#9734;</span>
              </div>
              <span class="fs-6">({{averageRating}})</span>
              <span>{{ reviews.length }} {{alterWord(reviews.length, 'отзыв', 'отзыва', 'отзывов')}}</span>
            </div>
            <div class="container d-flex justify-content-evenly my-3">
              <a class="btn btn-primary m-1" :class='{"disabled" : this.inPreviewMode}' :data-bs-target="'#moreModal_' + html_id" data-bs-toggle="modal" >Подробнее</a>
              <a class="btn btn-secondary m-1" :class='{"disabled" : this.inPreviewMode}' :data-bs-target="'#reviewsModal_' + html_id" data-bs-toggle="modal" >Отзывы</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Модальное окно отзывов -->
      <div class="modal fade"  :id="'reviewsModal_' + html_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Отзывы на {{ name }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body text-start">
              <div v-if="reviews.length" v-for="review in reviews" class="container my-3 p-1 bg-light-subtle rounded shadow-sm">

                <div class="text-warning fs-5">
                  <span v-if="review.rating >= 0.5" class="star">&#9733;</span>
                  <span v-if="review.rating >= 1.5" class="star">&#9733;</span>
                  <span v-if="review.rating >= 2.5" class="star">&#9733;</span>
                  <span v-if="review.rating >= 3.5" class="star">&#9733;</span>
                  <span v-if="review.rating >= 4.5" class="star">&#9733;</span>
                  <span v-if="review.rating < 0.5" class="star">&#9734;</span>
                  <span v-if="review.rating < 1.5" class="star">&#9734;</span>
                  <span v-if="review.rating < 2.5" class="star">&#9734;</span>
                  <span v-if="review.rating < 3.5" class="star">&#9734;</span>
                  <span v-if="review.rating < 4.5" class="star">&#9734;</span>
                </div>
                <blockquote class="text-dark-emphasis fs-5">"{{review.body}}"</blockquote>
                <div class="m-0 p-0 d-flex justify-content-between">
                  <cite class="text-end">--{{review.user_name}}</cite>
                  <div class="m-0 p-0 d-flex justify-content-end">
                    <span class="text-secondary fs-7">{{extractDate(review.date_stamp, true)}}, </span>
                    <span class="text-secondary fs-7">&nbsp;{{extractDate(review.date_stamp, false)}}</span>
                  </div>
                </div>

              </div>
              <div v-if="!reviews.length">
                Отзывов пока нет.
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" :data-bs-target="'#createReviewModal' + html_id" data-bs-toggle="modal">Оставить отзыв</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Модальное окно написания отзыва -->
      <div class="modal fade" :id="'createReviewModal' + html_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Оставить отзыв на {{ name }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body text-start">
              <form>
                <div class="mb-3">
                  <label class="h5" for="userName">Имя и фамилия</label>
                  <input
                      class="form-control"
                      id="userName"
                      type="text"
                      aria-describedby="userNameDesc"
                      placeholder="Как к вам обращаться?"
                      v-model="review.user_name"
                  >
                  <div id="userNameDesc" class="mt-2">Будет отображено в отзыве</div>
                </div>
                <div class="mb-3">
                  <label class="h5" for="body">Отзыв</label>
                  <textarea
                      class="form-control"
                      id="body"
                      type="text"
                      aria-describedby="userNameDesc"
                      placeholder="Ваш отзыв..."
                      v-model="review.body"
                  />
                  <div id="userNameDesc" class="mt-2">
                    <p class="m-0 p-0">Напишите ваш отзыв. Чем подробнее, тем лучше.</p>
                    <p class="m-0 p-0">Попробуйте ответить на вопросы: </p>
                    <ul>
                      <li>Что вам понравилось?</li>
                      <li>Что не понравилось?</li>
                      <li>Что можно сделать лучше?</li>
                    </ul>
                    <p class="small m-0 p-0">Воздержитесь от использования ненормативной лексики. Такие отзывы не будут опубликованы.</p>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="h5" for="rating">Отзыв</label>
                  <br>
                  <div class="fs-2">
                    <span @click="setReviewRating(1)" style="cursor: pointer">
                      <span v-if="review.rating < 1" class="star">&#9734;</span>
                      <span v-if="review.rating >= 1" class="star">&#9733;</span>
                    </span>
                    <span @click="setReviewRating(2)" style="cursor: pointer">
                      <span v-if="review.rating < 2" class="star">&#9734;</span>
                      <span v-if="review.rating >= 2" class="star">&#9733;</span>
                    </span>
                    <span @click="setReviewRating(3)" style="cursor: pointer">
                      <span v-if="review.rating < 3" class="star">&#9734;</span>
                      <span v-if="review.rating >= 3" class="star">&#9733;</span>
                    </span>
                    <span @click="setReviewRating(4)" style="cursor: pointer">
                      <span v-if="review.rating < 4" class="star">&#9734;</span>
                      <span v-if="review.rating >= 4" class="star">&#9733;</span>
                    </span>
                    <span @click="setReviewRating(5)" style="cursor: pointer">
                      <span v-if="review.rating < 5" class="star">&#9734;</span>
                      <span v-if="review.rating >= 5" class="star">&#9733;</span>
                    </span>
                    <span>({{review.rating}}/5)</span>
                  </div>


                  <div id="userNameDesc" class="mt-2">
                    Как бы вы оценили данную услугу по общим впечатлениям?
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" :data-bs-target="'#createdReviewModal' + html_id" data-bs-toggle="modal" @click="createReview(html_id, review.user_name, review.body, review.rating)">Оставить отзыв</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Модальное окно уведомления пользователя о успешно созданном отзыве -->
      <div class="modal fade" :id="'createdReviewModal' + html_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Спасибо за отзыв на {{ name }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body text-start">
              Спасибо за ваш отзыв! Ваш отзыв будет опубликован сразу после проверки модератором
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Закрыть"> Закрыть</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Модальное окно подробностей -->
      <div class="modal fade" :id="'moreModal_' + html_id" tabindex="-1" :aria-labelledby="'moreModalLabel' + html_id" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" :id="'moreModalLabel' + html_id">{{ name }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body text-start">
              <div v-html="description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'main-item',
  data () {
    return {
      review: {
        user_name: '',
        body: '',
        rating: 0
      },
      reviews: []
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: ""
    },
    imageURL: {
      type: String,
      required: true
    },
    html_id: {
      type: String,
      required: true
    },
    inPreviewMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    extractDate (date_stamp, isDate) {
      const [date, timePart] = date_stamp.split('T');
      const time = timePart.split('.')[0]; // Remove the milliseconds part

      return isDate ? date : time;
    },
    setReviewRating(rating) {
      this.review.rating = rating;
    },
    async createReview(parent_html_id, user_name, body, rating) {
      await fetch('/api/create-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          parent_html_id: parent_html_id,
          user_name: user_name,
          body: body,
          rating: rating
        })
      })
          .then(res => res.json())
          .then(res => {
            if(!res.ok) {
              console.error(`Error when creating new review: ${res}`);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
    },
    filteredReviews() {
      const reviews = JSON.parse(localStorage.getItem('reviews'));
      const filteredAll = reviews.filter(review => review.parent_html_id === this.html_id);
      return filteredAll.filter(review => review.approved === true);
    },
    async setReviews() {
      this.reviews = this.filteredReviews();
    },
    alterWord(number, form1, form2, form3) {
      if (number % 10 === 1 && number % 100 !== 11) {
        return form1;
      } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
        return form2;
      } else {
        return form3;
      }
    },
},
  computed: {
    averageRating() {
      let rating = 0;

      this.reviews.forEach(review => {
        rating += review.rating;
      })
      if(this.reviews.length) {
        rating /= this.reviews.length;
      }
      return rating.toFixed(2);
    }
  },
  mounted() {
    this.setReviews()
  }
}
</script>

<style scoped>
.star {
  color: gold;
}
</style>