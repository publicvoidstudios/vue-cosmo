<template>
  <div v-if="!forStudents" class="container bg-light-subtle rounded shadow d-flex flex-column my-3 p-4">
    <h2>{{article.title}}</h2>
    <div class="d-flex justify-content-between">
      <span class="small">Автор: {{article.author}}</span>
      <div>
        <span class="small">{{splitDate(article.date_stamp, true)}}, </span>
        <span class="small">{{splitDate(article.date_stamp, false)}}</span>
      </div>
    </div>
    <hr>
    <article style="max-height: 300px" class="overflow-hidden" v-html="article.body"></article>
    <button class="btn btn-primary align-self-end mb-3 mt-1" data-bs-toggle="modal" :data-bs-target="'#modalReader' + article.id">Читать полностью</button>
  </div>

  <div v-if="forStudents" class="container bg-light-subtle rounded shadow d-flex flex-column my-3 p-4">
    <h2>{{article.param1}}</h2>
    <div class="d-flex justify-content-between">
      <span class="small"></span>
      <div>
        <span class="small">{{splitDate(article.date_stamp, true)}}, </span>
        <span class="small">{{splitDate(article.date_stamp, false)}}</span>
      </div>
    </div>
    <hr>
    <article style="max-height: 300px" class="overflow-hidden" v-html="article.param2"></article>
  </div>

  <!-- Modal reader -->
  <div v-if="!forStudents" class="modal fade" :id="'modalReader' + article.id" tabindex="-1" :aria-labelledby="'modalReaderLabel' + article.id" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h2 class="modal-title fs-5" :id="'modalReaderLabel' + article.id">{{ article.title }}</h2>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <span class="small">Автор: {{article.author}}</span>
            <div>
              <span class="small">{{splitDate(article.date_stamp, true)}}, </span>
              <span class="small">{{splitDate(article.date_stamp, false)}}</span>
            </div>
          </div>
          <hr>
          <div v-html="article.body"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Закрыть">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    article: {
      required: true,
      default: {
        id: 0,
        title: 'Title',
        body: 'Body',
        author: 'Author',
        date_stamp: '1970-01-01T00:00:00.Z390',
      }
    },
    forStudents: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    splitDate(date_stamp, returnDate) {
      if(date_stamp) {
        const [date, timePart] = date_stamp.split('T');
        const time = timePart.split('.')[0]; // Remove the milliseconds part

        const [year, month, day] = date.split('-');

        const [hours, minutes] = time.split(':');

        const rearrangedTime = hours + ":" + minutes;

        const rearrangedDate = day + "." + month + "." + year;

        return returnDate ? rearrangedDate : rearrangedTime;
      }

    }
  }
}
</script>