<template>
  <!-- If creating a section -->
  <div v-if="currentTable === 0" class="form">
    <label> Название раздела:
      <input v-model="section.name" type="text" required>
    </label>

    <label> Ссылка на изображение раздела:
      <input v-model="section.img_url" type="text" required>
    </label>

    <button @click="createItem('section', section.name, this.transliterate(section.name), section.img_url)">
      Создать раздел
    </button>
  </div>

  <!-- If creating a subsection -->
  <div v-if="currentTable === 1" class="form">

    <label> Подраздел относится к разделу:
      <select v-model="subsection.parent">
        <option v-for="section in sections" :value="section.html_id">
          {{section.name}}
        </option>
      </select>
    </label>

    <label>Название подраздела:
      <input v-model="subsection.name" type="text" required>
    </label>

    <label> Ссылка на изображение подраздела:
      <input v-model="subsection.img_url" type="text" required>
    </label>

    <button @click="createItem('subsection', subsection.parent, subsection.name, this.transliterate(subsection.name), subsection.img_url)">
      Создать подраздел
    </button>
  </div>

  <!-- If creating a content -->
  <div v-if="currentTable === 2" class="content-form">

    <div class="parts">
      <div class="part-1">
        <label> Контент для подраздела:
          <select v-model="content.parent">
            <option v-for="name in subsectionsNames" :value="name.html_id">
              {{name.name}}
            </option>
          </select>
        </label>

        <label>Тип контента:
          <select v-model="content.type">
            <option v-for="type in dataTypes" :value="type.type">
              {{type.qualifiedName}}
            </option>
          </select>
        </label>
      </div>

      <div class="part-2">
        <label v-if="content.type === 'image'"> Описание изображения:
          <input v-model="content.param1" type="text" required>
        </label>
        <label v-if="content.type === 'article'"> Название статьи:
          <input v-model="content.param1" type="text" required>
        </label>
        <label v-if="content.type === 'video'"> Название видео:
          <input v-model="content.param1" type="text" required>
        </label>
        <label v-if="content.type === 'pptx'"> Название презентации:
          <input v-model="content.param1" type="text" required>
        </label>

        <label v-if="content.type === 'image'"> Ссылка на изображение:
          <input v-model="content.param2" type="text" required>
        </label>
        <label v-if="content.type === 'article'"> Текст статьи:
          <textarea v-model="content.param2" required placeholder="Вставьте текст статьи..."></textarea>
        </label>
        <label v-if="content.type === 'video'"> Код для вставки видео:
          <textarea v-model="content.param2" required placeholder="Вставьте код видео с YouTube..."> </textarea>
        </label>
        <label v-if="content.type === 'pptx'"> Код для вставки презентации:
          <textarea v-model="content.param2" required placeholder="Вставьте код презентации с OneDrive..."> </textarea>
        </label>
      </div>
    </div>


    <button @click="createItem('content', content.parent, content.type, content.param1, content.param2)">
      Добавить контент
    </button>
  </div>

</template>

<script>

import InputDropdown from "@/components/UI/InputDropdown.vue";

export default {
  name: 'creation-form',
  components: {InputDropdown},
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
      }
    }
  },
  methods: {
    updateInputData(inputValue, targetValue) {
      console.log(inputValue);
      targetValue = inputValue;
    },
    createItem(type, ...args) {
      let argsNotEmpty;
      args.forEach((arg) => {
        argsNotEmpty = arg !== '';
      })
      if (argsNotEmpty) {
        if(this.currentTable === 2){
          if(this.content.type === 'video' ) {
            args[3] = this.replaceYouTubeWidthAndHeight(this.content.param2, 320, 180);
            console.log(`Video detected, replacing... To: ${this.content.param2}`)
          }
          if(this.content.type === 'pptx'){
            args[3] = this.replacePPTXWidthAndHeight(this.content.param2, 320, 220);
            console.log(`PPTX detected, replacing... To: ${this.content.param2}`)
          }
        }
        this.$emit('createItem', type, args);
        console.log(`Created event for item creation. Sent type: ${type} and args: ${args}`);
      } else {
        console.log(`Some fields seem to be empty...`)
        this.$emit('alertBox', `Все поля должны быть заполнены`, false)
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
  }
}
</script>

<style scoped>
.form{
  background-color: var(--comm-color-secondary);
  border-radius: 10px;
  min-width: 300px;
  max-width: 90vw;
  min-height: 100px;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: auto;
  max-height: 80vh;
  overflow-y: auto;
}

.content-form {
  background-color: var(--comm-color-secondary);
  border-radius: 10px;
  min-width: 300px;
  max-width: 90vw;
  min-height: 100px;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  max-height: 80vh;
  overflow-y: auto;

  .parts {
    display: flex;
    flex-direction: row;


    .part-1 {
      max-width: 400px;
      margin: 0;
      padding: 30px;
    }

    .part-2 {
      width: max-content;
      margin: 0;
      padding: 30px;

      textarea {
        height: 400px;
      }
    }
  }

  .form-1 {
    max-width: 400px;
    margin: 0;
    padding: 30px;
  }
  button {

  }
}

label{
  text-align: center;
  font-family: var(--description-font-family);
  font-size: var(--comm-font-size-medium);
  margin: 10px;
}
select{
  align-self: center;
  padding: 5px;
  border-radius: var(--comm-border-radius);
  width: 100%;
  border: 1px solid var(--comm-color-primary);
  font-family: var(--description-font-family);
}

select:focus{
  transition: border 0s;
  border: 2px solid var(--comm-color-primary);
  outline: none;
}

input, textarea{
  align-self: center;
  padding: 5px;
  border-radius: var(--comm-border-radius);
  width: 100%;
  border: 1px solid var(--comm-color-primary);
  font-family: var(--description-font-family);
}

input:focus, textarea:focus{
  transition: border 0s;
  border: 2px solid var(--comm-color-primary);
  outline: none;
}

textarea {
  resize: vertical;
  width: 100%;
}

button{
  border: 2px solid var(--comm-color-primary);
  background-color: transparent;
  border-radius: var(--comm-border-radius);
  padding: 10px;
  margin:  30px 10px 10px 10px;
  font-family: var(--description-font-family);
  color: var(--comm-color-primary);
  font-size: 18px;
}
</style>