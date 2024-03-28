<template>
  <div class="modal fade" id="modalModification" tabindex="-1" aria-labelledby="modalModificationLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h1 class="modal-title fs-5" id="modalModificationLabel">Изменить {{tableNames[currentTable]}}</h1>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <!--     Contents of modal window     -->
          <!-- If editing a section -->
          <div v-if="currentTable === 0" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="section_name">Название раздела:</label>
                <input
                    id="section_name"
                    class="form-control"
                    v-model="section.name"
                    type="text"
                    maxlength="50"
                    required
                    aria-describedby="section_name_desc"
                    @input="this.section.html_id = this.transliterate(this.section.name)"
                >
                <div id="section_name_desc" class="mt-1">Как будет называться новый раздел? Лимит знаков: 50</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="section_image">Ссылка на изображение раздела:</label>
                <input id="section_image" class="form-control" v-model="section.img_url" type="text" required aria-describedby="section_image_desc">
                <div id="section_image_desc" class="mt-1">Нужно указать ссылку на изображение для нового раздела.</div>
              </div>
              <hr>
              <h5 class="h5">Предпросмотр:</h5>
              <div class="container">
                <section-item :img_url="section.img_url" :name="section.name"></section-item>
              </div>
            </form>
          </div>
          <!-- If creating a subsection -->
          <div v-if="currentTable === 1" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="subsection_parent">Подраздел относится к разделу:</label>
                <select id="subsection_parent" class="form-select" v-model="subsection.parent" aria-describedby="subsection_parent_desc">
                  <option v-for="section in sections" :value="section.html_id">
                    {{section.name}}
                  </option>
                </select>
                <div id="subsection_parent_desc" class="mt-1">Нужно указать раздел, к которому относится создаваемый подраздел.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="subsection_name">Название подраздела:</label>
                <input id="subsection_name" class="form-control" v-model="subsection.name" type="text" required aria-describedby="subsection_name_desc">
                <div id="subsection_name_desc" class="mt-1">Название создаваемого подраздела.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="subsection_img_url">Ссылка на изображение подраздела:</label>
                <input id="subsection_img_url" class="form-control" v-model="subsection.img_url" type="text" required aria-describedby="subsection_image_desc">
                <div id="subsection_image_desc" class="mt-1">Укажите ссылку на изображение создаваемого подраздела.</div>
              </div>
              <hr>
              <h5 class="h5">Предпросмотр:</h5>
              <div class="container">
                <section-item :img_url="subsection.img_url" :name="subsection.name"></section-item>
              </div>
            </form>
          </div>
          <!-- If creating a content -->
          <div v-if="currentTable === 2" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="content_parent">Подраздел контента:</label>
                <select
                    id="content_parent"
                    v-model="content.parent"
                    class="form-select"
                    aria-describedby="content_parent_desc"
                >
                  <option selected>Выберите подраздел</option>
                  <option v-for="name in subsectionsNames" :value="name.html_id">
                    {{name.name}}
                  </option>
                </select>
                <div id="content_parent_desc" class="mt-1">Выберите подраздел, к которому относится добавляемый контент.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="content_type">Тип контента:</label>
                <select
                    id="content_type"
                    v-model="content.type"
                    class="form-select"
                    aria-describedby="content_type_desc"
                >
                  <option selected>Выберите тип контента</option>
                  <option v-for="type in dataTypes" :value="type.type">
                    {{type.qualifiedName}}
                  </option>
                </select>
                <div id="content_type_desc" class="mt-1">Выберите тип контента.</div>
              </div>
              <div class="mb-3">

                <label for="content_param1" class="h5" v-if="content.type === 'image'"> Описание изображения:</label>
                <label for="content_param1" class="h5" v-if="content.type === 'article'"> Название статьи:</label>
                <label for="content_param1" class="h5" v-if="content.type === 'video'"> Название видео:</label>
                <label for="content_param1" class="h5" v-if="content.type === 'pptx'"> Название презентации:</label>
                <input id="content_param1" class="form-control" v-model="content.param1" type="text" required aria-describedby="content_param1_desc">
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'image'">Опишите изображение</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'article'">Назовите статью</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'video'">Назовите видео</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'pptx'">Назовите презентацию</div>
              </div>
              <div class="mb-3">
                <label for="content_param2" class="h5" v-if="content.type === 'image'"> Ссылка на изображение:</label>
                <label for="content_param2" class="h5" v-if="content.type === 'article'"> Текст статьи:</label>
                <label for="content_param2" class="h5" v-if="content.type === 'video'"> Код для вставки видео:</label>
                <label for="content_param2" class="h5" v-if="content.type === 'pptx'"> Код для вставки презентации:</label>
                <input id="content_param2" v-if="content.type === 'image'" class="form-control" v-model="content.param2" type="text" required>
                <textarea id="content_param2" v-if="content.type === 'article' || content.type === 'video' || content.type === 'pptx'" class="form-control" v-model="content.param2" required> </textarea>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'image'">Вставьте ссылку на изображение</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'article'">Вставьте текст статьи</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'video'">Нужен код вставки видео с YouTube</div>
                <div id="content_param1_desc" class="mt-1" v-if="content.type === 'pptx'">Нужен код вставки презентации с OneDrive</div>
              </div>
              <h5 class="h5" v-if="content.type === 'image' || content.type === 'video' || content.type === 'pptx'">Предпросмотр:</h5>
              <div class="container">
                <img v-if="content.type === 'image'" :src="content.param2" :alt="content.param1">
                <div v-if="content.type === 'video' || content.type === 'pptx'">
                  <div v-html="content.param2"></div>
                  <p class="h2">{{content.param1}}</p>
                </div>
              </div>
            </form>
          </div>
          <!-- If creating a service -->
          <div v-if="currentTable === 3" class="container">
            <form class="p-5">
              <div class="mb-3">
                <label class="h5" for="service_name">Название услуги</label>
                <input v-model="service.name" type="text" class="form-control" id="service_name" aria-describedby="service_name_desc">
                <div id="service_name_desc" class="mt-1">Необходимо указать название услуги. Например: "Ультразвуковая чистка лица"</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_description">Описание услуги</label>
                <textarea v-model="service.description" type="text" class="form-control" id="service_description" aria-describedby="service_description_desc"/>
                <div id="service_description_desc" class="mt-1">
                  Необходимо описать услугу. Описание должно быть конвертировано в html формат. Можно сделать здесь:
                  <a href="https://wordhtml.com/">https://wordhtml.com/</a>
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_name">Ссылка на изображение услуги</label>
                <input v-model="service.img_url" type="text" class="form-control" id="service_name" aria-describedby="service_name_desc">
                <div id="service_name_desc" class="mt-1">Укажите ссылку на изображение для услуги. Рекомендуется использовать изображения размером не менее 512px х 512px</div>
              </div>
              <hr>
              <div class="mb-3">
                <p class="h5">Предпросмотр:</p>
                <main-item
                    :in-preview-mode='true'
                    :html_id="service.html_id"
                    :image-u-r-l="service.img_url"
                    :description="service.description"
                    :name="service.name"
                >
                </main-item>
              </div>
            </form>
          </div>
          <!-- If creating a course -->
          <div v-if="currentTable === 5" class="container">
            <form class="p-5">
              <div class="mb-3">
                <label class="h5" for="course_name">Название курса</label>
                <input v-model="course.name" type="text" class="form-control" id="course_name" aria-describedby="course_name_desc">
                <div id="course_name_desc" class="mt-1">Необходимо указать название курса. Например: "Сестринское дело"</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_description">Описание курса</label>
                <textarea v-model="course.description" type="text" class="form-control" id="service_description" aria-describedby="service_description_desc"/>
                <div id="service_description_desc" class="mt-1">
                  Необходимо описать курс. Описание должно быть конвертировано в html формат. Можно сделать здесь:
                  <a href="https://wordhtml.com/">https://wordhtml.com/</a>
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_image">Ссылка на изображение курса</label>
                <input v-model="course.img_url" type="text" class="form-control" id="course_image" aria-describedby="course_image_desc">
                <div id="course_image_desc" class="mt-1">Укажите ссылку на изображение для курса. Рекомендуется использовать изображения размером не менее 512px х 512px</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_medical">Для студентов с медицинским образованием:</label>
                <input v-model="course.medical" type="checkbox" class="form-check" id="course_medical" aria-describedby="course_medical_desc">
                <div id="course_medical_desc" class="mt-1">Требуется ли для курса медицинское образование?</div>
              </div>
              <hr>
              <div class="mb-3">
                <p class="h5">Предпросмотр:</p>
                <main-item
                    :in-preview-mode='true'
                    :html_id="course.html_id"
                    :image-u-r-l="course.img_url"
                    :description="course.description"
                    :name="course.name"
                >
                </main-item>
              </div>
            </form>
          </div>
          <!-- If creating an article -->
          <div v-if="currentTable === 6" class="container-fluid">
            <form class="p-1">
              <div class="mb-3">
                <label class="h5" for="article_title">Название статьи</label>
                <input v-model="article.title" type="text" class="form-control" id="article_title" aria-describedby="article_title_desc">
                <div id="article_title_desc" class="mt-1">Необходимо указать название статьи.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="article_body">Текст статьи</label>
                <tt-editor class="form-control" v-model="article.body"></tt-editor>
                <div id="article_body_desc" class="mt-1">
                  Скопируйте в это поле текст статьи.
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_image">Автор</label>
                <input v-model="article.author" type="text" class="form-control" id="course_image" aria-describedby="course_image_desc">
                <div id="course_image_desc" class="mt-1">Укажите автора статьи.</div>
              </div>
            </form>
          </div>

        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-primary"
              @click="createItem"
              data-bs-dismiss="modal"
              >
            Создать {{tableNames[currentTable]}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainItem from "@/components/pages/main/MainItem.vue";
import SectionItem from "@/components/pages/students/SectionItem.vue";
import {Editor, EditorContent} from "@tiptap/vue-3";
import TtEditor from "@/components/pages/utils/TipTapEditor.vue";

export default {
  name: 'edit-item-modal',
  components: {TtEditor, Editor, EditorContent, SectionItem, MainItem},
  props: {
    currentTable: {
      type: Number,
      required: true
    },
    sections: {
      type: Array,
      required: true
    },
    subsectionsNames: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dataTypes: [
        {
          type: 'image',
          qualifiedName: 'Изображение'
        },
        {
          type: 'article',
          qualifiedName: 'Статья'
        },
        {
          type: 'video',
          qualifiedName: 'Видео'
        },
        {
          type: 'pptx',
          qualifiedName: 'Презентация'
        }
      ],
      section: {
        name: '',
        html_id: '',
        img_url: ''
      },
      subsection: {
        parent: '',
        name: '',
        html_id: '',
        img_url: ''
      },
      content: {
        parent: '',
        type: '',
        param1: '',
        param2: ''
      },
      service: {
        name: '',
        html_id: '',
        description: '',
        img_url: ''
      },
      course: {
        name: '',
        html_id: '',
        description: '',
        img_url: '',
        medical: false
      },
      article: {
        title: '',
        body: '',
        author: ''
      },
      tableNames: ["раздел", "подраздел", "контент", "сервис"],
      editor: null,
    }
  },
  methods: {
    createItem() {
      switch (this.currentTable) {
        //Creating section
        case 0:
          if(this.section.name.length && this.section.img_url.length) {
            console.log(`Creating section... ARGS: section, ${this.section.name}, ${this.section.html_id}, ${this.section.img_url}`)
            this.$emit('createItem', 'section', this.section.name, this.section.html_id, this.section.img_url);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Creating subsection
        case 1:
          if(this.subsection.parent.length && this.subsection.name.length && this.subsection.img_url.length) {
            this.$emit('createItem', 'subsection', this.subsection.parent, this.subsection.name, this.transliterate(this.subsection.name), this.subsection.img_url);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Creating content
        case 2:
          if(this.content.parent.length && this.content.type.length && this.content.param1.length && this.content.param2.length) {
            if(this.content.type === 'video' ) {
              this.content.param2 = this.replaceYouTubeWidthAndHeight(this.content.param2, 320, 180);
            }
            if(this.content.type === 'pptx'){
              this.content.param2 = this.replacePPTXWidthAndHeight(this.content.param2, 320, 220);
            }
            this.$emit('createItem','content', this.content.parent, this.content.type, this.content.param1, this.content.param2);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Creating service
        case 3:
          if(this.service.name.length && this.service.description.length && this.service.img_url.length) {
            this.$emit('createItem', 'service', this.service.name, this.transliterate(this.service.name), this.service.description, this.service.img_url);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Creating course
        case 5:
          if(this.course.name.length && this.course.description.length && this.course.img_url.length) {
            this.$emit('createItem', 'course', this.course.name, this.transliterate(this.course.name), this.course.description, this.course.img_url, this.course.medical);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Creating article
        case 6:
          if(this.article.title.length && this.article.body.length && this.article.author.length) {
            this.$emit('createItem', 'article', this.article.title, this.article.body, this.article.author);
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
      }
    },
    replacePPTXWidthAndHeight(str, newWidth, newHeight) {
      const regex = /width="(\d+px?)" height="(\d+px?)"/;
      return str.replace(regex, `width="${newWidth}px" height="${newHeight}px"`);
    },
    replaceYouTubeWidthAndHeight(str, newWidth, newHeight) {
      const regex = /width="(\d+)" height="(\d+)"/;
      return str.replace(regex, `width="${newWidth}" height="${newHeight}"`);
    },
    transliterate(input) {
      const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      const eng = ["a", "b", "v", "g", "d", "e", "yo", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "kh", "ts", "ch", "sh", "shch", "", "y", "", "e", "yu", "ya"];

      return input.split('').map(function (char) {
        // Check if the character is a Cyrillic letter
        if (/[\u0400-\u04FF]/.test(char)) {
          let idx = rus.indexOf(char.toLowerCase());
          if (idx >= 0) {
            return char === char.toUpperCase() ? eng[idx].toUpperCase() : eng[idx];
          }
        }
        // Swap space character with an underscore character
        if (char === " ") {
          return "_";
        }
        // Return the character as is if it's not a Cyrillic letter
        return char;
      }).join('');
    }
  },
  mounted() {

  },
  beforeUnmount() {

  }
}
</script>

<style scoped>

</style>