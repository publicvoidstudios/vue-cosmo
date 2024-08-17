<template>
  <div class="container-fluid p-0 m-0">
    <!-- Header of table -->
    <div class="d-flex justify-content-between align-items-center mt-3 px-4 py-2">
      <h5 class="h2">{{tableNames[currentTable]}}</h5>
      <button data-bs-toggle="modal" data-bs-target="#modalCreation" class="btn btn-primary m-1">Добавить</button>
    </div>
    <!-- Divider -->
    <hr class="table-group-divider">
    <div class="row mw-100 mx-2 d-flex justify-content-center">
      <!-- Loading spinner -->
      <div class="d-flex justify-content-center m-3" v-if="rowsStatus(paginatedRows) === 'undefined'">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>
      <!-- Empty table -->
      <div class="container d-flex justify-content-center align-items-center flex-column text-secondary fs-3" v-if="rowsStatus(paginatedRows) === 'empty'">
        <span>Здесь пока пусто. </span>
        <span v-if="currentTable === 4">Отзывов ещё нет.</span>
        <span v-else>Добавьте новый элемент.</span>
        <button v-if="currentTable !== 4" data-bs-toggle="modal" data-bs-target="#modalCreation" class="btn btn-primary m-1">Добавить</button>
      </div>
      <!-- Sections -->
      <div v-if="currentTable === 0" class="col-md-5 col-lg-4 col-xl-3 col-xxl-2 my-2 mx-1" v-for="row in paginatedRows">
        <div class="d-flex flex-column p-3 rounded shadow bg-secondary-subtle">
          <section-item :img_url="row.img_url" :name="row.name"></section-item>
          <div class="d-flex justify-content-between text-dark-emphasis p-3">
            <div>
              <p>Дата:</p>
              <p>{{ splitDate(row.date_stamp, true) }}</p>
            </div>
            <div class="text-end">
              <p>Время:</p>
              <p>{{ splitDate(row.date_stamp, false) }}</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button class="btn btn-info shadow m-1" data-bs-toggle="modal" data-bs-target="#modalModification" @click="setModifiableData('section', row.id, row.name, row.html_id, row.img_url)">Изменить</button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>
        </div>
      </div>
      <!-- Subsections -->
      <div v-if="currentTable === 1" class="col-md-5 col-lg-4 col-xl-3 col-xxl-2 m-1" v-for="row in paginatedRows">
        <div class="d-flex flex-column m-1 p-3 rounded shadow bg-primary-subtle">
          <section-item :img_url="row.img_url" :name="row.subsection_name"></section-item>
          <p class="text-center text-dark-emphasis m-0 mt-3 p-0"><strong>Относится к разделу:</strong></p>
          <p class="text-center text-dark-emphasis m-0 p-0">{{parentSectionName(row.parent_section_name)}}</p>
          <div class="d-flex justify-content-between text-dark-emphasis p-3">
            <div>
              <p>Дата:</p>
              <p>{{ splitDate(row.date_stamp, true) }}</p>
            </div>
            <div class="text-end">
              <p>Время:</p>
              <p>{{ splitDate(row.date_stamp, false) }}</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button
                class="btn btn-info m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalModification"
                @click="setModifiableData('subsection', row.id, row.parent_section_name, row.subsection_name, row.html_id, row.img_url)"
            >
              Изменить
            </button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>
        </div>
    </div>
      <!-- Content -->
      <div v-if="currentTable === 2" class="col-md-5 col-lg-4 col-xl-3 col-xxl-2 m-1" v-for="row in paginatedRows">
        <div class="d-flex flex-column m-1 p-3 rounded shadow bg-primary-subtle">
          <content-preview :item="row"></content-preview>
          <div class="d-flex justify-content-between text-dark-emphasis p-3">
            <div>
              <p>Дата:</p>
              <p>{{ splitDate(row.date_stamp, true) }}</p>
            </div>
            <div class="text-end">
              <p>Время:</p>
              <p>{{ splitDate(row.date_stamp, false) }}</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button
                class="btn btn-info m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalModification"
                @click="setModifiableData('content', row.id, row.subsection_id, row.content_type, row.param1, youTubeIFrameToURL(row.param2))"
            >
              Изменить
            </button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>

        </div>
      </div>
      <!-- Services & Courses -->
      <div v-if="currentTable === 3 || currentTable === 5" class="col-lg-6" v-for="row in paginatedRows">
        <div class="d-flex flex-column m-1 p-3 rounded shadow bg-primary-subtle">
          <main-item :html_id="row.html_id" :image-u-r-l="row.img_url" :description="row.description" :name="row.name" :in-preview-mode="true"></main-item>
          <div class="d-flex justify-content-between text-dark-emphasis p-3">
            <div>
              <p>Дата:</p>
              <p>{{ splitDate(row.date_stamp, true) }}</p>
            </div>
            <div class="text-end">
              <p>Время:</p>
              <p>{{ splitDate(row.date_stamp, false) }}</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button
                v-if="currentTable === 3"
                class="btn btn-info m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalModification"
                @click="setModifiableData('service', row.id, row.name, row.html_id, row.description, row.img_url)"
            >
              Изменить
            </button>
            <button
                v-if="currentTable === 5"
                class="btn btn-info m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalModification"
                @click="setModifiableData('course', row.id, row.name, row.html_id, row.description, row.img_url, row.medical)"
            >
              Изменить
            </button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>

        </div>
      </div>
      <!-- Reviews -->
      <div v-if="currentTable === 4" class="col-lg-6" v-for="row in paginatedRows">
        <div class="d-flex flex-column m-1 p-3 rounded shadow bg-primary-subtle">
          <!-- Review preview -->
          <div class="my-3 text-secondary">
            Отзыв к {{parentServiceName(row.parent_html_id).type}}:
            <br>
            <strong>{{parentServiceName(row.parent_html_id).name}}</strong>
          </div>
          <div class="text-secondary fs-5">
            <span v-if="row.rating >= 0.5" class="text-warning">&#9733;</span>
            <span v-if="row.rating >= 1.5" class="text-warning">&#9733;</span>
            <span v-if="row.rating >= 2.5" class="text-warning">&#9733;</span>
            <span v-if="row.rating >= 3.5" class="text-warning">&#9733;</span>
            <span v-if="row.rating >= 4.5" class="text-warning">&#9733;</span>
            <span v-if="row.rating < 0.5" class="star">&#9734;</span>
            <span v-if="row.rating < 1.5" class="star">&#9734;</span>
            <span v-if="row.rating < 2.5" class="star">&#9734;</span>
            <span v-if="row.rating < 3.5" class="star">&#9734;</span>
            <span v-if="row.rating < 4.5" class="star">&#9734;</span>

            <span>({{row.rating}}/5)</span>
          </div>
          <blockquote class="text-light-emphasis fs-5">"{{row.body}}"</blockquote>
          <div class="m-0 p-0 d-flex justify-content-between">
            <cite class="text-end">--{{row.user_name}}</cite>
            <div class="m-0 p-0 d-flex justify-content-end">
              <span class="text-secondary fs-7">{{splitDate(row.date_stamp, true)}}, </span>
              <span class="text-secondary fs-7">&nbsp;{{splitDate(row.date_stamp, false)}}</span>
            </div>
          </div>

          <!-- Common functions -->
          <div class="d-flex align-items-center justify-content-center flex-wrap">
            <button class="btn btn-success" v-if="!row.approved" @click="updateReviewApproval(row.id, true)">Опубликовать</button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>

        </div>
      </div>
      <!-- Articles -->
      <div v-if="currentTable === 6" class="col-lg-6" v-for="row in paginatedRows">
        <div class="d-flex flex-column m-1 p-3 rounded shadow bg-primary-subtle">
          <!-- Article preview -->
          <article-element :article="row"></article-element>

          <!-- Common functions -->
          <div class="d-flex align-items-center justify-content-center flex-wrap">
            <button
                class="btn btn-info m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalModification"
                @click="setModifiableData('article', row.id, row.title, row.body, row.author)"
            >
              Изменить
            </button>
            <button data-bs-toggle="modal" data-bs-target="#modalRemoving" class="btn btn-danger m-1" @click="selectedRow = row">Удалить</button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="my-3 d-flex justify-content-center align-items-center flex-column">
    <p class="m-0 p-0">Элементов на странице:</p>
    <div class="my-1">
      <button class="btn btn-secondary rounded-end-0" @click="itemsPerPage = 5" :class="{'bg-primary text-light-emphasis' : itemsPerPage === 5, 'bg-body text-primary' : itemsPerPage !== 5}">5</button>
      <button class="btn btn-secondary rounded-0" @click="itemsPerPage = 10" :class="{'bg-primary text-light-emphasis' : itemsPerPage === 10, 'bg-body text-primary' : itemsPerPage !== 10}">10</button>
      <button class="btn btn-secondary rounded-0" @click="itemsPerPage = 20" :class="{'bg-primary text-light-emphasis' : itemsPerPage === 20, 'bg-body text-primary' : itemsPerPage !== 20}">20</button>
      <button class="btn btn-secondary rounded-start-0" @click="itemsPerPage = 50" :class="{'bg-primary text-light-emphasis' : itemsPerPage === 50, 'bg-body text-primary' : itemsPerPage !== 50}">50</button>
    </div>

    <nav aria-label="Page navigation" class="d-flex justify-content-center align-items-center flex-column gap-1">
      <p class="m-0 p-0">Страница:</p>
      <ul class="pagination">
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': pageNumber === currentPage }">
          <a class="page-link" style="cursor: pointer" @click="changePage(pageNumber)">{{ pageNumber }}</a>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Deletion modal window -->
  <div class="modal fade" id="modalRemoving" tabindex="-1" aria-labelledby="modalRemovingLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h1 class="modal-title fs-5" id="modalCreationLabel">Удалить {{tableNamesSingle[currentTable]}}?</h1>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <p class="text-danger">ПОДТВЕРДИТЕ ДЕЙСТВИЕ</p>
          <p>Действительно удалить {{tableNamesSingle[currentTable]}} "{{selectedRow.name}}{{selectedRow.subsection_name}}{{selectedRow.user_name}}{{selectedRow.title}}"?</p>
          <p>Отменить это действие невозможно!</p>
        </div>
        <div class="modal-footer">
          <button
              v-if="currentTable === 0"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-section')"
              data-bs-dismiss="modal"
          >
            Удалить раздел
          </button>
          <button
              v-if="currentTable === 1"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-subsection')"
              data-bs-dismiss="modal"
          >
            Удалить подраздел
          </button>
          <button
              v-if="currentTable === 2"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-content')"
              data-bs-dismiss="modal"
          >
            Удалить контент
          </button>
          <button
              v-if="currentTable === 3"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-service')"
              data-bs-dismiss="modal"
          >
            Удалить услугу
          </button>
          <button
              v-if="currentTable === 4"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-review')"
              data-bs-dismiss="modal"
          >
            Удалить отзыв
          </button>
          <button
              v-if="currentTable === 5"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-course')"
              data-bs-dismiss="modal"
          >
            Удалить курс
          </button>
          <button
              v-if="currentTable === 6"
              type="button"
              class="btn btn-danger"
              @click="removeRow(selectedRow.id, '/api/remove-article')"
              data-bs-dismiss="modal"
          >
            Удалить статью
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modification modal window -->
  <div class="modal fade" id="modalModification" tabindex="-1" aria-labelledby="modalModificationLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" style="max-width: 1000px;">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h1 class="modal-title fs-5" id="modalModificationLabel">Изменить {{tableNamesSingle[currentTable]}}</h1>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <!--     Contents of modal window     -->
          <!-- If modifying a section -->
          <div v-if="currentTable === 0" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="section_name">Название раздела:</label>
                <input
                    id="section_name"
                    class="form-control"
                    v-model="sectionEditable.name"
                    type="text"
                    maxlength="50"
                    required
                    aria-describedby="section_name_desc"
                    @input="this.sectionEditable.html_id = this.transliterate(this.sectionEditable.name)"
                >
                <div id="section_name_desc" class="mt-1">Как будет называться новый раздел? Лимит знаков: 50</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="section_image">Ссылка на изображение раздела:</label>
                <input id="section_image" class="form-control" v-model="sectionEditable.img_url" type="text" required aria-describedby="section_image_desc">
                <div id="section_image_desc" class="mt-1">Нужно указать ссылку на изображение для нового раздела.</div>
              </div>
              <hr>
              <h5 class="h5">Предпросмотр:</h5>
              <div class="container">
                <section-item :img_url="sectionEditable.img_url" :name="sectionEditable.name"></section-item>
              </div>
            </form>
          </div>
          <!-- If modifying a subsection -->
          <div v-if="currentTable === 1" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="subsection_parent">Подраздел относится к разделу:</label>
                <select id="subsection_parent" class="form-select" v-model="subsectionEditable.parent_section_name" aria-describedby="subsection_parent_desc">
                  <option v-for="section in sections" :value="section.html_id">
                    {{section.name}}
                  </option>
                </select>
                <div id="subsection_parent_desc" class="mt-1">Нужно указать раздел, к которому относится создаваемый подраздел.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="subsection_name">Название подраздела:</label>
                <input id="subsection_name" class="form-control" v-model="subsectionEditable.subsection_name" type="text" required aria-describedby="subsection_name_desc" @input="subsectionEditable.html_id = transliterate(subsectionEditable.subsection_name)">
                <div id="subsection_name_desc" class="mt-1">Укажите название подраздела.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="subsection_img_url">Ссылка на изображение подраздела:</label>
                <input id="subsection_img_url" class="form-control" v-model="subsectionEditable.img_url" type="text" required aria-describedby="subsection_image_desc">
                <div id="subsection_image_desc" class="mt-1">Укажите ссылку на изображение подраздела.</div>
              </div>
              <hr>
              <h5 class="h5">Предпросмотр:</h5>
              <div class="container">
                <section-item :img_url="subsectionEditable.img_url" :name="subsectionEditable.subsection_name"></section-item>
              </div>
            </form>
          </div>
          <!-- If modifying a content -->
          <div v-if="currentTable === 2" class="container">
            <form class="p-3">
              <div class="mb-3">
                <label class="h5" for="content_parent">Подраздел контента:</label>
                <select
                    id="content_parent"
                    v-model="contentEditable.subsection_id"
                    class="form-select"
                    aria-describedby="content_parent_desc"
                >
                  <option selected>Выберите подраздел</option>
                  <option v-for="name in subsections" :value="name.html_id">
                    {{name.name}}
                  </option>
                </select>
                <div id="content_parent_desc" class="mt-1">Выберите подраздел, к которому относится добавляемый контент.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="content_type">Тип контента:</label>
                <select
                    id="content_type"
                    v-model="contentEditable.content_type"
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

                <label for="content_param1" class="h5" v-if="contentEditable.content_type === 'image'"> Описание изображения:</label>
                <label for="content_param1" class="h5" v-if="contentEditable.content_type === 'article'"> Название статьи:</label>
                <label for="content_param1" class="h5" v-if="contentEditable.content_type === 'video'"> Название видео:</label>
                <label for="content_param1" class="h5" v-if="contentEditable.content_type === 'pptx'"> Название презентации:</label>
                <input id="content_param1" class="form-control" v-model="contentEditable.param1" type="text" required aria-describedby="content_param1_desc">
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'image'">Опишите изображение</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'article'">Назовите статью</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'video'">Назовите видео</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'pptx'">Назовите презентацию</div>
              </div>
              <div class="mb-3">
                <label for="content_param2" class="h5" v-if="contentEditable.content_type === 'image'"> Ссылка на изображение:</label>
                <label for="content_param2" class="h5" v-if="contentEditable.content_type === 'article'"> Текст статьи:</label>
                <label for="content_param2" class="h5" v-if="contentEditable.content_type === 'video'"> Ссылка на видео с YouTube:</label>
                <label for="content_param2" class="h5" v-if="contentEditable.content_type === 'pptx'"> Код для вставки презентации:</label>
                <input id="content_param2" v-if="contentEditable.content_type === 'image'" class="form-control" v-model="contentEditable.param2" type="text" required>
                <textarea id="content_param2" v-if="contentEditable.content_type === 'video' || contentEditable.content_type === 'pptx'" class="form-control" v-model="contentEditable.param2" required> </textarea>
                <tt-editor v-if="contentEditable.content_type === 'article'" class="form-control" v-model="contentEditable.param2"></tt-editor>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'image'">Вставьте ссылку на изображение</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'article'">Вставьте текст статьи</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'video'">Скопируйте сюда ссылку на видео с Youtube.
                  <br>Ссылка должна иметь такой вид: https://www.youtube.com/watch?v=jNQXAC9IVRw</div>
                <div id="content_param1_desc" class="mt-1" v-if="contentEditable.content_type === 'pptx'">Нужен код вставки презентации с OneDrive</div>
              </div>
              <h5 class="h5" v-if="contentEditable.content_type === 'image' || contentEditable.content_type === 'video' || contentEditable.content_type === 'pptx'">Предпросмотр:</h5>
              <div class="container">
                <img v-if="contentEditable.content_type === 'image'" style="max-width: 100%" :src="contentEditable.param2" :alt="contentEditable.param1">
                <div v-if="contentEditable.content_type === 'video' || contentEditable.content_type === 'pptx'">
                  <div v-if="contentEditable.content_type === 'pptx'" class="ratio ratio-16x9" v-html="contentEditable.param2"></div>
                  <div v-if="contentEditable.content_type === 'video'" class="ratio ratio-16x9" v-html="youTubeURLToIframe(contentEditable.param2)"></div>
                  <p class="h2">{{contentEditable.param1}}</p>
                </div>
              </div>
            </form>
          </div>
          <!-- If modifying a service -->
          <div v-if="currentTable === 3" class="container">
            <form class="p-5">
              <div class="mb-3">
                <label class="h5" for="service_name">Название услуги</label>
                <input v-model="serviceEditable.name" type="text" class="form-control" id="service_name" aria-describedby="service_name_desc" @input="serviceEditable.html_id = transliterate(serviceEditable.name)">
                <div id="service_name_desc" class="mt-1">Необходимо указать название услуги. Например: "Ультразвуковая чистка лица"</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_description">Описание услуги</label>
                <tt-editor v-model="serviceEditable.description" class="form-control" id="service_description" aria-describedby="service_description_desc"/>
                <div id="service_description_desc" class="mt-1">
                  Необходимо описать услугу.
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_name">Ссылка на изображение услуги</label>
                <input v-model="serviceEditable.img_url" type="text" class="form-control" id="service_name" aria-describedby="service_name_desc">
                <div id="service_name_desc" class="mt-1">Укажите ссылку на изображение для услуги. Рекомендуется использовать изображения размером не менее 512px х 512px</div>
              </div>
              <hr>
              <div class="mb-3">
                <p class="h5">Предпросмотр:</p>
                <main-item
                    :in-preview-mode='true'
                    :html_id="serviceEditable.html_id"
                    :image-u-r-l="serviceEditable.img_url"
                    :description="serviceEditable.description"
                    :name="serviceEditable.name"
                >
                </main-item>
              </div>
            </form>
          </div>
          <!-- If modifying a course -->
          <div v-if="currentTable === 5" class="container">
            <form class="p-5">
              <div class="mb-3">
                <label class="h5" for="course_name">Название курса</label>
                <input v-model="courseEditable.name" type="text" class="form-control" id="course_name" aria-describedby="course_name_desc" @input="courseEditable.html_id = transliterate(courseEditable.name)">
                <div id="course_name_desc" class="mt-1">Необходимо указать название курса. Например: "Сестринское дело"</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="service_description">Описание курса</label>
                <tt-editor v-model="courseEditable.description" class="form-control" id="service_description" aria-describedby="service_description_desc"/>
                <div id="service_description_desc" class="mt-1">
                  Необходимо описать курс.
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_image">Ссылка на изображение курса</label>
                <input v-model="courseEditable.img_url" type="text" class="form-control" id="course_image" aria-describedby="course_image_desc">
                <div id="course_image_desc" class="mt-1">Укажите ссылку на изображение для курса. Рекомендуется использовать изображения размером не менее 512px х 512px</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_medical">Для студентов с медицинским образованием:</label>
                <input v-model="courseEditable.medical" type="checkbox" class="form-check" id="course_medical" aria-describedby="course_medical_desc">
                <div id="course_medical_desc" class="mt-1">Требуется ли для курса медицинское образование?</div>
              </div>
              <hr>
              <div class="mb-3">
                <p class="h5">Предпросмотр:</p>
                <main-item
                    :in-preview-mode='true'
                    :html_id="courseEditable.html_id"
                    :image-u-r-l="courseEditable.img_url"
                    :description="courseEditable.description"
                    :name="courseEditable.name"
                >
                </main-item>
              </div>
            </form>
          </div>
          <!-- If modifying an article -->
          <div v-if="currentTable === 6" class="container-fluid">
            <form class="p-1">
              <div class="mb-3">
                <label class="h5" for="article_title">Название статьи</label>
                <input v-model="articleEditable.title" type="text" class="form-control" id="article_title" aria-describedby="article_title_desc">
                <div id="article_title_desc" class="mt-1">Необходимо указать название статьи.</div>
              </div>
              <div class="mb-3">
                <label class="h5" for="article_body">Текст статьи</label>
                <tt-editor class="form-control" v-model="articleEditable.body"></tt-editor>
                <div id="article_body_desc" class="mt-1">
                  Скопируйте в это поле текст статьи.
                </div>
              </div>
              <div class="mb-3">
                <label class="h5" for="course_image">Автор</label>
                <input v-model="articleEditable.author" type="text" class="form-control" id="course_image" aria-describedby="course_image_desc">
                <div id="course_image_desc" class="mt-1">Укажите автора статьи.</div>
              </div>
            </form>
          </div>

        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-primary"
              @click="modifyItem"
              data-bs-dismiss="modal"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainItem from "@/components/pages/main/MainItem.vue";
import SectionItem from "@/components/pages/students/SectionItem.vue";
import ContentPreview from "@/components/pages/students/utilitary/ContentPreview.vue";
import ArticleElement from "@/components/pages/articles/ArticleElement.vue";
import TtEditor from "@/components/pages/utils/TipTapEditor.vue";
import TableElement from "@/components/pages/admin/TableElement.vue";

export default {
  name: 'frag-table',
  components: {TableElement, TtEditor, ArticleElement, ContentPreview, SectionItem, MainItem},
  props: {
    rows: {
      type: Array,
      required: true
    },
    currentTable: {
      type: Number,
      required: true
    },
    searchQuery: {
      type: String,
      required: true
    },
    searchType: {
      type: String,
      required: true
    },
    sections: {
      type: Array,
      required: true
    },
    subsections: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tableNames: [
          "Разделы",
          "Подразделы",
          "Контент",
          "Услуги",
          "Отзывы",
          "Курсы",
          "Статьи"
      ],
      tableNamesSingle: [
        "раздел",
        "подраздел",
        "контент",
        "услугу",
        "отзыв",
        "курс",
        "статью"
      ],
      selectedRow: 0,
      currentPage: 1,
      itemsPerPage: 5,
      sectionEditable: {
        id: 0,
        name: '',
        html_id: '',
        img_url: ''
      },
      subsectionEditable: {
        id: 0,
        parent_section_name: '',
        subsection_name: '',
        html_id: '',
        img_url: ''
      },
      contentEditable: {
        id: 0,
        subsection_id: '',
        content_type: '',
        param1: '',
        param2: ''
      },
      serviceEditable: {
        id: 0,
        name: '',
        html_id: '',
        description: '',
        img_url: ''
      },
      courseEditable: {
        id: 0,
        name: '',
        html_id: '',
        description: '',
        img_url: '',
        medical: ''
      },
      articleEditable: {
        id: 0,
        title: '',
        body: '',
        author: ''
      },
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
      ]
    }
  },
  methods: {
    splitDate(date_stamp, returnDate) {
      if(date_stamp) {
        const [date, timePart] = date_stamp.split('T');
        const time = timePart.split('.')[0]; // Remove the milliseconds part

        const [year, month, day] = date.split('-');
        const rearrangedDate = day + "." + month + "." + year;

        return returnDate ? rearrangedDate : time;
      }
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
            this.$emit('callUpdate');
          })
          .catch((error) => {
            console.error(error);
          });
      this.$emit('rowRemoved');
    },
    async updateReviewApproval(id, approved) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/update-review-approval', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                id: id,
                approved: approved
              })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        console.log(data);
        this.$emit('callUpdate');
      } catch (error) {
        console.error(error);
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    parentSectionName(parent_section_html_id) {
      const section = this.sections.find(s => s.html_id === parent_section_html_id);
      if(section) {
        return section.name;
      } else {
        return "Ошибка: Не найдено";
      }
    },
    parentServiceName(parent_service_html_id) {
      const services = JSON.parse(localStorage.getItem('services'));

      const service = services.find(s => s.html_id === parent_service_html_id);

      if(service) {
        return {
          name: service.name,
          type: 'услуге'
        }
      } else {
        return this.parentCourseName(parent_service_html_id);
      }
    },
    parentCourseName(parent_course_html_id) {
      const courses = JSON.parse(localStorage.getItem('courses'));

      const course = courses.find(s => s.html_id === parent_course_html_id);

      if(course) {
        return {
          name: course.name,
          type: 'курсу'
        }
      } else {
        return {
          name: 'Ошибка: услуга/курс не найдены...',
          type: 'Н/Д'
        }
      }
    },
    transliterate(input) {
      const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      // noinspection SpellCheckingInspection
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
    },
    modifyItem() {
      switch (this.currentTable) {
        //Modifying section
        case 0:
          if(this.sectionEditable.name.length && this.sectionEditable.img_url.length) {
            this.modifySection(
                this.sectionEditable.id,
                this.sectionEditable.name,
                this.sectionEditable.html_id,
                this.sectionEditable.img_url
            )
            this.setModifiableData('section', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Modifying subsection
        case 1:
          if(this.subsectionEditable.parent_section_name.length && this.subsectionEditable.subsection_name.length && this.subsectionEditable.img_url.length) {
            this.modifySubsection(
                this.subsectionEditable.id,
                this.subsectionEditable.parent_section_name,
                this.subsectionEditable.subsection_name,
                this.subsectionEditable.html_id,
                this.subsectionEditable.img_url
            )
            this.setModifiableData('subsection', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Modifying content
        case 2:
          if(this.contentEditable.subsection_id.length && this.contentEditable.content_type.length && this.contentEditable.param1.length && this.contentEditable.param2.length) {
            if(this.contentEditable.content_type === 'video' ) {
              this.contentEditable.param2 = this.youTubeURLToIframe(this.contentEditable.param2);
            }
            if(this.contentEditable.content_type === 'pptx'){
              this.contentEditable.param2 = this.replacePPTXWidthAndHeight(this.contentEditable.param2, 320, 220);
            }
            this.modifyContent(
                this.contentEditable.id,
                this.contentEditable.subsection_id,
                this.contentEditable.content_type,
                this.contentEditable.param1,
                this.contentEditable.param2
            )
            this.setModifiableData('content', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
        //Modifying service
        case 3:
          if(this.serviceEditable.name.length && this.serviceEditable.description.length && this.serviceEditable.img_url.length) {
            this.modifyService(
                this.serviceEditable.id,
                this.serviceEditable.name,
                this.serviceEditable.html_id,
                this.serviceEditable.description,
                this.serviceEditable.img_url
            )
            this.setModifiableData('service', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
          //Creating course
        case 5:
          if(this.courseEditable.name.length && this.courseEditable.description.length && this.courseEditable.img_url.length) {
            this.modifyCourse(
                this.courseEditable.id,
                this.courseEditable.name,
                this.courseEditable.html_id,
                this.courseEditable.description,
                this.courseEditable.img_url,
                this.courseEditable.medical
            )
            this.setModifiableData('course', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
          //Creating article
        case 6:
          if(this.articleEditable.title.length && this.articleEditable.body.length && this.articleEditable.author.length) {
            this.modifyArticle(
                this.articleEditable.id,
                this.articleEditable.title,
                this.articleEditable.body,
                this.articleEditable.author
            )
            this.setModifiableData('article', null, null, null, null, null, null)
          } else {
            this.$emit('alertBox', `Все поля должны быть заполнены`, false)
          }
          return;
      }
    },
    async modifySection(id, name, html_id, img_url) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-section', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            ms_name: name,
            ms_html_id: html_id,
            ms_img_url: img_url
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        console.log(data);
        this.$emit('callUpdate');
      } catch (error) {
        console.error(error);
        this.$emit('alertBox', error.message, false)
      }
    },
    async modifySubsection(id, parent_section_name, subsection_name, html_id, img_url) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-subsection', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            parent_section_name: parent_section_name,
            subsection_name: subsection_name,
            html_id: html_id,
            img_url: img_url
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        this.$emit('callUpdate');
      } catch (error) {
        this.$emit('alertBox', error.message, false)
      }
    },
    async modifyContent(id, subsection_id, content_type, param1, param2) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-content', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            subsection_id: subsection_id,
            content_type: content_type,
            param1: param1,
            param2: param2
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        this.$emit('callUpdate');
      } catch (error) {
        this.$emit('alertBox', error.message, false)
      }
    },
    async modifyService(id, name, html_id, description, img_url) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-service', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        this.$emit('callUpdate');
      } catch (error) {
        this.$emit('alertBox', error.message, false)
      }
    },
    async modifyCourse(id, name, html_id, description, img_url, medical) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-course', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url,
            medical: medical
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        this.$emit('callUpdate');
      } catch (error) {
        this.$emit('alertBox', error.message, false)
      }
    },
    async modifyArticle(id, title, body, author) {
      try {
        const response = await fetch('http://cosmmedic.ru:3000/api/modify-article', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            author: author
          })
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.error);
        }

        const data = await response.json();
        this.$emit('alertBox', data.message, true)
        this.$emit('callUpdate');
      } catch (error) {
        this.$emit('alertBox', error.message, false)
      }
    },
    setModifiableData(type, ...args) {
      switch (type) {
        case 'section':
          this.sectionEditable.id = args[0];
          this.sectionEditable.name = args[1];
          this.sectionEditable.html_id = args[2];
          this.sectionEditable.img_url = args[3];
          break;
        case 'subsection':
          this.subsectionEditable.id = args[0];
          this.subsectionEditable.parent_section_name = args[1];
          this.subsectionEditable.subsection_name = args[2];
          this.subsectionEditable.html_id = args[3];
          this.subsectionEditable.img_url = args[4];
          break;
        case 'content':
          this.contentEditable.id = args[0];
          this.contentEditable.subsection_id = args[1];
          this.contentEditable.content_type = args[2];
          this.contentEditable.param1 = args[3];
          this.contentEditable.param2 = args[4];
          break;
        case 'service':
          this.serviceEditable.id = args[0];
          this.serviceEditable.name = args[1];
          this.serviceEditable.html_id = args[2];
          this.serviceEditable.description = args[3];
          this.serviceEditable.img_url = args[4];
          break;
        case 'course':
          this.courseEditable.id = args[0];
          this.courseEditable.name = args[1];
          this.courseEditable.html_id = args[2];
          this.courseEditable.description = args[3];
          this.courseEditable.img_url = args[4];
          this.courseEditable.medical = args[5];
          break;
        case 'article':
          this.articleEditable.id = args[0];
          this.articleEditable.title = args[1];
          this.articleEditable.body = args[2];
          this.articleEditable.author = args[3];
          break;
      }
    },
    replacePPTXWidthAndHeight(str, newWidth, newHeight) {
      const regex = /width="(\d+px?)" height="(\d+px?)"/;
      return str.replace(regex, `width="${newWidth}px" height="${newHeight}px"`);
    },
    youTubeURLToIframe(url){
      if(url) {
        const videoId = url.split('v=')[1].split('&')[0];
        return `<iframe
                    style="width: 100%; height: 100%"
                    allowfullscreen
                    src="https://www.youtube.com/embed/${videoId}?color=white"
              ></iframe>`
      } else {
        return 'Ссылка не указана'
      }

    },
    youTubeIFrameToURL(iframe) {
      const url = iframe.split('src="')[1].split('"')[0];
      return url.split('embed/')[0] + 'watch?v=' + url.split('embed/')[1];
    },
    rowsStatus(rows) {
      if(rows === undefined) {
        return 'undefined'
      }
      if(rows) {
        if(rows.length > 0){
          return 'filled'
        } else {
          return 'empty'
        }
      }
    }
  },
  computed: {
    totalPages() {
      if(this.rows !== undefined) {
        return Math.ceil(this.rows.length / this.itemsPerPage);
      } else {
        return 0;
      }

    },
    paginatedRows() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      if(this.filteredRows !== undefined) {
        return this.filteredRows.slice(startIndex, endIndex);
      } else {
        return undefined;
      }

    },
    filteredRows() {
      if(this.searchQuery.trim() === ''){
        return this.rows;
      } else {
        switch (this.currentTable) {
          //Sections search
          case 0:
            if(this.searchType === 'name') {
              //Search by name
              return this.rows.filter(row => row.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return;
          //Subsections search
          case 1:
            if(this.searchType === 'name') {
              //Search by name
              return this.rows.filter(row => row.subsection_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            if(this.searchType === 'parent') {
              //Get subsections list to search by name
              const sections = JSON.parse(localStorage.getItem('sections'));
              //Search by name
              return this.rows.filter(
                  row =>
                      sections.filter(
                          section =>
                              section.name
                                  .toLowerCase()
                                  .includes(this.searchQuery.toLowerCase())
                      )
                          .some(
                              section => section.html_id === row.parent_section_name)
              );
            }
            return;
          //Content search
          case 2:
            //By name
            if(this.searchType === 'name') {
              //Get subsections list to search by name
              const subsections = JSON.parse(localStorage.getItem('subsections'));
              //Search by name
              return this.rows.filter(
                  row =>
                      subsections.filter(
                          subsection =>
                              subsection.subsection_name
                                  .toLowerCase()
                                  .includes(this.searchQuery.toLowerCase())
                      )
                          .some(
                              subsection => subsection.html_id === row.subsection_id)
              );
            }
            //By contents
            if(this.searchType === 'content') {
              return this.rows.filter(row => row.param1.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return;
          //Services search
          case 3:
            //By name
            if(this.searchType === 'name') {
              //Search by name
              return this.rows.filter(
                  row =>
                      row.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return;
          //Reviews search
          case 4:
            //By user's name
            if(this.searchType === 'user_name') {
              //Search by user's name
              return this.rows.filter(
                  row =>
                      row.user_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            //By content
            if(this.searchType === 'body') {
              //Search by content
              return this.rows.filter(
                  row =>
                      row.body.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            //By rating
            if(this.searchType === 'rating') {
              //Search by rating
              return this.rows.filter(
                  row =>
                      row.rating.toString().includes(this.searchQuery.toLowerCase()));
            }
            //By parent name
            if(this.searchType === 'name') {
              //Get subsections list to search by name
              const services = JSON.parse(localStorage.getItem('services'));
              //Search by name
              return this.rows.filter(
                  row =>
                      services.filter(
                          service =>
                              service.name
                                  .toLowerCase()
                                  .includes(this.searchQuery.toLowerCase())
                      )
                          .some(
                              service => service.html_id === row.parent_html_id)
              );
            }
            return;
          //Courses search
          case 5:
            //By name
            if(this.searchType === 'name') {
              //Search by name
              return this.rows.filter(
                  row =>
                      row.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return;
          //Articles search
          case 6:
            //By name
            if(this.searchType === 'name') {
              //Search by name
              return this.rows.filter(
                  row =>
                      row.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            //By author
            if(this.searchType === 'author') {
              //Search by name
              return this.rows.filter(
                  row =>
                      row.author.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            //By body
            if(this.searchType === 'body') {
              //Search by name
              return this.rows.filter(
                  row =>
                      row.body.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            return;
          default:
            return this.rows;
        }
      }
    },
  }
}
</script>

<style scoped>



.fade-enter-active {
  animation: fade-in .3s;
}
.fade-leave-active {
  animation: fade-in .3s reverse;
}

.fade-move {
  transition: transform 0.3s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>