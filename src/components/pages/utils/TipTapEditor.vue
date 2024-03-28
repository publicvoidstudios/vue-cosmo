<template>

  <div class="container form-control bg-transparent">
    <div class="d-flex flex-wrap justify-content-start border border-2 border-secondary p-0 rounded-top-2 border-bottom-0" v-if="editor">
      <!-- Undo / Redo -->
      <div class="d-flex flex-column justify-content-between border-end border-end-1 p-1 col-sm-3 col-md-1">
        <div class="d-flex flex-wrap">
          <button
              class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
              style="width: 30px; height: 30px; transition: all 0.5s ease-in-out; margin: 1px; align-self: flex-start"
              v-for="index in mainActions"
              :class="{ 'bg-secondary': editor.isActive(index.active), 'bg-transparent': !editor.isActive(index.active) }"
              @click="onActionClick(index.slug, index.option)"
              @click.prevent
          >
            <svg-icon type="mdi" :path="index.icon"></svg-icon>
          </button>
        </div>
        <div class="d-flex flex-column">
          <hr class="m-0 mt-1 p-0" style="justify-self: end">
          <span class="align-self-center m-0 p-0 text-secondary"> Отмена</span>
        </div>
      </div>
      <!-- Script -->
      <div class="d-flex flex-column justify-content-between border-end border-end-1 p-1 col-sm-3 col-md-2">
        <div class="d-flex flex-wrap">
          <button
              class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
              style="width: 30px; height: 30px; transition: all 0.3s; margin: 1px;"
              v-for="index in scriptActions"
              :class="{ 'bg-secondary': editor.isActive(index.active), 'bg-transparent': !editor.isActive(index.active) }"
              @click="onActionClick(index.slug, index.option)"
              @click.prevent
          >
            <svg-icon type="mdi" :path="index.icon"></svg-icon>
          </button>
        </div>
        <div class="d-flex flex-column">
          <hr class="m-0 mt-1 p-0" style="justify-self: end">
          <span class="align-self-center m-0 p-0 text-secondary">Шрифт</span>
        </div>
      </div>
      <!-- Paragraph -->
      <div class="d-flex flex-column justify-content-between border-end border-end-1 p-1 col-sm-6 col-md-2">
        <div class="d-flex flex-wrap">
          <button
              class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
              style="width: 30px; height: 30px; transition: all 0.3s; margin: 1px;"
              v-for="index in textActions"
              :class="{ 'bg-secondary': editor.isActive(index.active), 'bg-transparent': !editor.isActive(index.active) }"
              @click="onActionClick(index.slug, index.option)"
              @click.prevent
          >
            <svg-icon type="mdi" :path="index.icon"></svg-icon>
          </button>
        </div>
        <div class="d-flex flex-column">
          <hr class="m-0 mt-1 p-0" style="justify-self: end">
          <span class="align-self-center m-0 p-0 text-secondary">Абзац</span>
        </div>
      </div>
      <!-- Styles -->
      <div class="d-flex flex-column justify-content-between p-1 border-end border-end-1 col-sm-6 col-md-4">
        <div class="d-flex flex-wrap">
          <button
              class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
              style="width: 60px; height: 60px; transition: all 0.5s ease-in-out; margin: 1px;"
              v-for="index in sizeActions"
              :class="{ 'bg-secondary': editor.isActive(index.active, index.level), 'bg-transparent': !editor.isActive(index.active) }"
              @click="onActionClick(index.slug, index.option)"
              @click.prevent
          >
            <svg-icon :size="Math.round(40/(index.level.level * 0.3))" type="mdi" :path="index.icon"></svg-icon>
          </button>
        </div>
        <div class="d-flex flex-column">
          <hr class="m-0 mt-1 p-0" style="justify-self: end">
          <span class="align-self-center m-0 p-0 text-secondary">Стили</span>
        </div>
      </div>
      <!-- Files -->
      <div class="d-flex flex-column justify-content-between p-1 col-md-3">
        <div class="d-flex flex-wrap">
          <button
              class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
              style="width: 60px; height: 60px; transition: all 0.5s ease-in-out; margin: 1px;"
              v-for="index in insertActions"
              :class="{ 'bg-secondary': editor.isActive(index.active), 'bg-transparent': !editor.isActive(index.active) }"
              @click="onActionClick(index.slug, index.option)"
              @click.prevent
          >
            <svg-icon :size="60" type="mdi" :path="index.icon"></svg-icon>
          </button>
        </div>
        <div class="d-flex flex-column">
          <hr class="m-0 mt-1 p-0" style="justify-self: end">
          <span class="align-self-center m-0 p-0 text-secondary">Вставка</span>
        </div>
      </div>
    </div>

    <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        v-if="editor"
    >
      <div class="d-flex flex-wrap bg-white rounded border border-1 opacity-75 m-0 p-0">
        <button
            class="fs-5 d-flex justify-content-center align-items-center border border-0 rounded text-secondary-emphasis bg-gradient"
            style="width: 30px; height: 30px; transition: all 0.3s; margin: 1px;"
            v-for="index in bubbleActions"
            :class="{ 'bg-secondary': editor.isActive(index.active), 'bg-transparent': !editor.isActive(index.active) }"
            @click="onActionClick(index.slug, index.option)"
            @click.prevent
        >
          <svg-icon type="mdi" :path="index.icon"></svg-icon>
        </button>
      </div>

    </bubble-menu>

    <div class="border border-2 p-0 border-secondary rounded-bottom-2 m-0">
      <editor-content :editor="editor" />
    </div>


    <div v-if="editor" class="d-flex flex-column ">
      <hr>
      <div class="d-flex justify-content-end gap-1">
        <span class="characters-count" :class="maxLimit ? limitWarning : ''">
        {{charactersCount}} {{ alterWord(charactersCount, "символ", "символа", "символов") }}
      </span>
        |
        <span class="words-count">
        {{ wordsCount }} {{ alterWord(wordsCount, "слово", "слова", "слов") }}
      </span>
      </div>

    </div>
  </div>

  <div class="custom-modal-area bg-opacity-50" :class="{'cm-active' : customModalActive}">
    <div class="custom-modal bg-light-subtle">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Укажите ссылку для вставки</h1>
        <!--     Close button     -->
        <button type="button" class="btn-close" @click="closeCustomModal" @click.prevent></button>
      </div>
      <div class="modal-body">
        <label v-if="customModalType === 'image'" for="customModalURL" class="h5">Ссылка на изображение:</label>
        <label v-if="customModalType === 'yt-video'" for="customModalURL" class="h5">Ссылка на YouTube видео:</label>
        <input id="customModalURL" type="url" class="form-control" v-model="customModalURL" @click.prevent>
        <div v-if="customModalType === 'yt-video'" class="mt-3">
          <label for="customModalWidth" class="h5">Ширина видео:</label>
          <input id="customModalWidth" type="number" class="form-control" v-model="customModalWidth">
          <label for="customModalHeight" class="h5">Высота видео:</label>
          <input id="customModalHeight" type="number" class="form-control" v-model="customModalHeight">
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="customModalType === 'image'" class="btn btn-primary" @click.prevent @click="applyCustomModalImageURL">OK</button>
        <button v-if="customModalType === 'yt-video'" class="btn btn-primary" @click.prevent @click="applyCustomModalYTURL">OK</button>
      </div>
    </div>
  </div>

</template>

<script>
import {BubbleMenu, Editor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import CharacterCount from '@tiptap/extension-character-count';
import {Heading} from "@tiptap/extension-heading";
import BlockQuote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Youtube from '@tiptap/extension-youtube'

import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiFormatBold,
  mdiFormatAlignCenter,
  mdiFormatAlignLeft,
  mdiFormatAlignRight,
  mdiFormatAlignJustify,
  mdiFormatItalic,
  mdiFormatUnderline,
  mdiFormatStrikethrough,
  mdiFormatListBulleted,
  mdiFormatListNumbered,
  mdiFormatSubscript,
  mdiFormatSuperscript,
  mdiUndo,
  mdiRedo,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatHeader4,
  mdiFileImage,
  mdiFileVideo
} from '@mdi/js';

export default {
  components: {
    BubbleMenu,
    EditorContent, SvgIcon
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    maxLimit: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
      customModalActive: false,
      customModalURL: '',
      customModalWidth: 640,
      customModalHeight: 480,
      customModalType: '',
      mainActions: [
        { slug: 'undo', icon: mdiUndo, active: 'undo' },
        { slug: 'redo', icon: mdiRedo, active: 'redo' },
      ],
      scriptActions: [
        { slug: 'bold', icon: mdiFormatBold, active: 'bold' },
        { slug: 'italic', icon: mdiFormatItalic, active: 'italic' },
        { slug: 'underline', icon: mdiFormatUnderline, active: 'underline' },
        { slug: 'strike', icon: mdiFormatStrikethrough, active: 'strike' },
        { slug: 'subscript', icon: mdiFormatSubscript, active: 'subscript' },
        { slug: 'superscript', icon: mdiFormatSuperscript, active: 'superscript' }
      ],
      textActions: [
        { slug: 'align', option: 'left', icon: mdiFormatAlignLeft, active: { textAlign: 'left' } },
        { slug: 'align', option: 'center', icon: mdiFormatAlignCenter, active: { textAlign: 'center' } },
        { slug: 'align', option: 'right', icon: mdiFormatAlignRight, active: { textAlign: 'right' } },
        { slug: 'align', option: 'justify', icon: mdiFormatAlignJustify, active: { textAlign: 'justify' } },
        { slug: 'bulletList', icon: mdiFormatListBulleted, active: 'bulletList' },
        { slug: 'orderedList', icon: mdiFormatListNumbered, active: 'orderedList' }
      ],
      sizeActions: [
        { slug: 'heading1', icon: mdiFormatHeader2, active: 'heading', level:{level: 2}},
        { slug: 'heading2', icon: mdiFormatHeader3, active: 'heading', level:{level: 3}},
        { slug: 'heading3', icon: mdiFormatHeader4, active: 'heading', level:{level: 4}},
      ],
      insertActions: [
        { slug: 'image', icon: mdiFileImage, active: 'image'},
        { slug: 'video', icon: mdiFileVideo, active: 'video'}
      ],
      bubbleActions: [
        { slug: 'bold', icon: mdiFormatBold, active: 'bold' },
        { slug: 'italic', icon: mdiFormatItalic, active: 'italic' },
        { slug: 'underline', icon: mdiFormatUnderline, active: 'underline' },
        { slug: 'bulletList', icon: mdiFormatListBulleted, active: 'bulletList' },
        { slug: 'orderedList', icon: mdiFormatListNumbered, active: 'orderedList' },

      ]
    }
  },
  computed: {
    charactersCount() {
      return this.editor.storage.characterCount.characters();
    },
    wordsCount() {
      return this.editor.storage.characterCount.words();
    },
    limitWarning() {
      const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
      const isMax = this.charactersCount === this.maxLimit;

      if (isCloseToMax && !isMax) return 'warning';
      if (isMax) return 'danger';

      return '';
    },
  },
  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(this.modelValue, false);
    },
  },
  methods: {
    onActionClick(slug, option = null) {
      const vm = this.editor.chain().focus();

      const actionTriggers = {
        bold: () => vm.toggleBold().run(),
        italic: () => vm.toggleItalic().run(),
        underline: () => vm.toggleUnderline().run(),
        strike: () => vm.toggleStrike().run(),
        bulletList: () => vm.toggleBulletList().run(),
        orderedList: () => vm.toggleOrderedList().run(),
        align: () => vm.setTextAlign(option).run(),
        subscript: () => vm.toggleSubscript().run(),
        superscript: () => vm.toggleSuperscript().run(),
        undo: () => vm.undo().run(),
        redo: () => vm.redo().run(),
        heading1: () => vm.toggleHeading({level: 2}).run(),
        heading2: () => vm.toggleHeading({level: 3}).run(),
        heading3: () => vm.toggleHeading({level: 4}).run(),
        blockquote: () => vm.toggleBlockquote().run(),
        //Change action to open modal. In opened modal, Ok button runs this:
        image: () => this.openCustomModal('image'),
        video: () => this.openCustomModal('yt-video')
      };

      actionTriggers[slug]();
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
    openCustomModal(type) {
      this.customModalActive = true;
      this.customModalType = type;
    },
    closeCustomModal() {
      this.customModalActive = false;
      this.customModalType = '';
    },
    applyCustomModalImageURL() {
      const vm = this.editor.chain().focus();
      vm.setImage({src: this.customModalURL, style: "width: 80%"}).run();
      this.closeCustomModal();
    },
    applyCustomModalYTURL() {
      const vm = this.editor.chain().focus();
      vm.setYoutubeVideo({
        src: this.customModalURL,
        width: Math.max(320, parseInt(this.customModalWidth, 10)) || 640,
        height: Math.max(180, parseInt(this.customModalHeight, 10)) || 480,
      }).run();
      this.closeCustomModal();
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
        BlockQuote,
        CharacterCount.configure({
          limit: this.maxLimit,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Heading.configure({
          levels: [1, 2, 3, 4],
        }),
        Document,
        Dropcursor,
        Image.configure({
          HTMLAttributes: {
            style: 'width: 50%; margin-left: 25%;',
          },
        }),
        Paragraph,
        Text,
        Youtube.configure({
          progressBarColor: 'white',
        })
      ],
      editorProps: {
        attributes: {
          class: 'border border-gray-400 p-3 m-3 shadow tiptap-custom',
          style: 'min-height: 12rem; outline: none; line-height: 1.1em; '
        }
      },
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML());
      },
    });
  },
  beforeUnmount() {
    this.editor.destroy();
  },
}
</script>

<style lang="scss" scoped>

.custom-modal-area {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .custom-modal {
    padding: 5px;
    border-radius: 10px;
    min-width: 300px;
    width: 50%;
    position: relative;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
}

.cm-active {
  display: flex;

  .custom-modal {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
}

.tiptap {
  border-radius: 50%;

  img {
    border-radius: 50%;
    border: 10px solid red;
  }

  div[data-youtube-video] {
    cursor: move;
    padding-right: 24px;
  }

  iframe {
     border: 8px solid #000;
     border-radius: 4px;
     min-width: 200px;
     min-height: 200px;
     display: block;
     outline: 0 solid transparent;

     &.ProseMirror-selectednode {
       transition: outline 0.15s;
       outline: 6px solid #ece111;
     }
  }
}
</style>