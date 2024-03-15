<template>

  <div class="box">
    <div class="container">
      <div class="table-name">
        <p v-if="currentTable === 0">Разделы</p>
        <p v-if="currentTable === 1">Подразделы</p>
        <p v-if="currentTable === 2">Контент</p>
        <slot name="add-button"></slot>
      </div>
      <div class="table-container">
        <table class="fixed-table">
          <thead class="sticky-header">
          <tr class="section-container">
            <th class="id">
              <p>
                <strong>ID</strong>
              </p>
            </th>
            <th>
              <p>
                <strong>Дата создания</strong>
              </p>
            </th>
            <th v-if="currentTable === 1">
              <p>
                <strong>Относится к разделу</strong>
              </p>
            </th>
            <th v-if="currentTable === 2">
              <p>
                <strong>Относится к подразделу</strong>
              </p>
            </th>
            <th v-if="currentTable === 2">
              <p>
                <strong>Тип контента</strong>
              </p>
            </th>
            <th v-if="currentTable === 2">
              <p>
                <strong>Название</strong>
              </p>
            </th>
            <th v-if="currentTable === 2" class="pre-last">
              <p>
                <strong>Содержимое</strong>
              </p>
            </th>
            <th v-if="currentTable === 0 || currentTable === 1">
              <p>
                <strong>Название</strong>
              </p>
            </th>
            <th v-if="currentTable === 0 || currentTable === 1" class="pre-last">
              <p>
                <strong>Изображение</strong>
              </p>
            </th>
            <th>
              <p>

              </p>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in rows">
            <td>
              <p>{{ row.id }}</p>
            </td>
            <td>
              <p>{{ splitDate(row.date_stamp, true) }}</p>
              <p>{{ splitDate(row.date_stamp, false) }}</p>
            </td>
            <td v-if="currentTable === 1 || currentTable === 2">
              <p v-if="currentTable === 1">{{ getSectionNameByHtmlId(row.parent_section_name) }}</p>
              <p v-if="currentTable === 2">{{ subsectionName(row.subsection_id) }}</p>
            </td>
            <td>
              <p v-if="currentTable === 0">{{ row.name }}</p>
              <p v-if="currentTable === 1">{{ row.subsection_name }}</p>
              <p v-if="currentTable === 2 && row.content_type === 'article'">Статья</p>
              <p v-if="currentTable === 2 && row.content_type === 'video'">Видео</p>
              <p v-if="currentTable === 2 && row.content_type === 'pptx'">Презентация</p>
              <p v-if="currentTable === 2 && row.content_type === 'image'">Изображение</p>
            </td>
            <td v-if="currentTable === 2">
              <p> {{row.param1}}</p>
            </td>
            <td class="frame-td">
              <img v-if="currentTable === 0 || currentTable === 1" :src="row.img_url" :alt="row.img_url">
              <p v-if="currentTable === 2 && row.content_type === 'article'" class="article"> {{row.param2}}</p>
              <div v-if="currentTable === 2 && row.content_type === 'video' || row.content_type === 'pptx'" v-html="row.param2" class="frame"></div>
              <img v-if="currentTable === 2 && row.content_type === 'image'" :src="row.param2" :alt="row.param2" class="image">
            </td>
            <td class="last">
              <button v-if="currentTable === 0" @click="changePatchAlert">Изменить</button>
              <button v-if="currentTable === 1" @click="changePatchAlert">Изменить</button>
              <button v-if="currentTable === 2" @click="changePatchAlert">Изменить</button>
              <button v-if="currentTable === 0" @click="removeRow(row.id, '/api/remove-section')">Удалить</button>
              <button v-if="currentTable === 1" @click="removeRow(row.id, '/api/remove-subsection')">Удалить</button>
              <button v-if="currentTable === 2" @click="removeRow(row.id, '/api/remove-content')">Удалить</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

</template>

<script>
import PageNavLink from "@/common/PageNavigationLink.vue";

export default {
  name: 'frag-table',
  components: {PageNavLink},
  props: {
    rows: {
      type: Array,
      required: true
    },
    currentTable: {
      type: Number,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getSectionNameByHtmlId(html_id) {
      // Retrieve the array from localStorage
      const data = JSON.parse(localStorage.getItem('sections'));

      if (!data || !Array.isArray(data)) {
        return 'Ошибка: Не удалось найти данные о разделах.';
      }

      // Find the object with the matching html_id
      const section = data.find(item => item.html_id === html_id);

      // Return the name if section is found, otherwise return null or handle as needed
      return section ? section.name : 'Ошибка: Раздел не найден';
    },
    subsectionName(subsectionID) {
      const element = JSON.parse(localStorage.getItem('subsections')).find(item => item.html_id === subsectionID);
      return element ? element.subsection_name : null;
    },
    splitDate(date_stamp, returnDate) {
      const [date, timePart] = date_stamp.split('T');
      const time = timePart.split('.')[0]; // Remove the milliseconds part

      return returnDate ? date : time;
    },
    removeRow(id, remove_url) {
      // Create the fetch request
      fetch(remove_url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
          .then((response) => {
            if (!response.ok) {
              this.$emit('alertBox',`Не удалось удалить элемент с ID: ${id}.`, false);
              throw new Error('Failed to remove row from the database.');
            }
            this.$emit('alertBox', `Элемент с ID: ${id} удален.`, true);
          })
          .catch((error) => {
            console.error(error);
          });
      this.$emit('rowRemoved');
    },

    changePatchAlert(){
      alert('Пока нельзя изменять добавленные объекты...')
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}



.box {
  background-color: #fffb;
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  text-align: center;
}

.table-container {
  max-height: 750px;
  overflow-y: auto; /* Добавляет вертикальную полосу прокрутки */
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1; /* Чтобы шапка оставалась выше остальных элементов */
  border: 1px solid lightgrey;
}

table {
  border-collapse: collapse;
  width: 100%;
  thead {
    background-color: #eaeaea;
    tr {
      th {
        border: 1px solid lightgrey;
      }
    }
  }
  tbody {
    tr {
      td {
        background-color: white;
        border: 1px solid lightgrey;
        text-align: center;
        button {
          padding: 10px;
          margin: 10px;
          font-size: var(--comm-font-size-tiny);
          background-color: var(--comm-color-secondary);
          border-radius: var(--comm-border-radius);
          border: 1px solid var(--comm-color-primary);
          color: var(--comm-color-primary);
        }

        button:hover {
          background-color: var(--comm-color-primary);
          color: var(--comm-color-secondary);
          cursor: pointer;
        }
      }
    }
  }
}

.fixed-table th:last-child,
.fixed-table td:last-child {
  width: 100px;
}

.fixed-table th:first-child,
.fixed-table td:first-child {
  width: 50px;
}

.fixed-table th:nth-child(2),
.fixed-table td:nth-child(2) {
  width: 100px;
}

img {
  height: 60px;
  overflow-clip-margin: content-box;
  overflow: clip;
  text-align: center;
  border-radius: var(--comm-border-radius-thin);
}

.article {
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.table-name {
  height: var(--name-panel-height);
  background-color: var(--item-box-shadow-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 15px;
   p {
     padding: 0;
     margin: 0;
     color: var(--headings-font-color);
     font-size: var(--comm-font-size-large);
     font-family: var(--description-font-family);
     text-transform: capitalize;
   }
  button{
    margin: 10px;
  }
}

.frame-td {
  max-width: 320px;
}
</style>