<template>
  <div>
    <!-- Коллаж -->
    <main-section :anchor-name="pageAnchors[0]">
      <template v-slot:name>
        <section-name :centered="true">
          <template v-slot:name>
            Медицина и косметология 2.0
          </template>
          <template v-slot:slogan>
            КАЧЕСТВО ЖИЗНИ ИДЕТ РУКА ОБ РУКУ СО СТРЕМЛЕНИЕМ К СОВЕРШЕНСТВУ
          </template>

        </section-name>
      </template>
      <template v-slot:content>
        <collage></collage>
      </template>
    </main-section>
    <!--  Кабинет  -->
    <main-section :anchor-name="pageAnchors[1]">
      <!--   SECTION NAME   -->
      <template v-slot:name>
        <section-name>
          Мой кабинет
        </section-name>
      </template>

      <!--   SECTION DESCRIPTION   -->
      <template v-slot:description>
        <section-desc>
          Маленькие ежедневные улучшения принесут, в конце концов, большие результаты
        </section-desc>
      </template>

      <!--   SECTION CONTENT   -->
      <template v-slot:content>
        <section-elements v-if="servicesItems" :items="servicesItems"></section-elements>
      </template>
    </main-section>
    <!--  Курсы  -->
    <main-section :anchor-name="pageAnchors[2]">
      <!--   SECTION NAME   -->
      <template v-slot:name>
        <section-name>
          Курсы косметологии
        </section-name>
      </template>

      <!--   SECTION CONTENT   -->
      <template v-slot:content>
        <section-elements v-if="coursesMedical" :items="coursesMedical">
          <template v-slot:name>
            <section-name :small="true">КУРС «СЕСТРИНСКОЕ ДЕЛО В КОСМЕТОЛОГИИ»</section-name>
          </template>
          <template v-slot:desc>
            <section-desc :small="true">Обучение в группе и индивидуально. Базовый курс для начинающих. <strong>Повышение
              квалификации для специалистов.</strong></section-desc>
          </template>
        </section-elements>


        <section-elements v-if="coursesNonMedical" :items="coursesNonMedical">
          <template v-slot:name>
            <section-name :small="true">КУРС «КОСМЕТИК-ЭСТЕТИСТ»</section-name>
          </template>
          <template v-slot:desc>
            <section-desc :small="true">Обучение основам красоты. <strong>Медицинское образование не требуется.</strong>
            </section-desc>
          </template>
        </section-elements>
      </template>
    </main-section>
    <!-- Обо мне -->
    <main-section :anchor-name="pageAnchors[3]">
      <template v-slot:name>
        <section-name>
          Обо мне
        </section-name>
      </template>
      <template v-slot:content>
        <about></about>
      </template>
    </main-section>

    <!--  Контакты  -->
    <main-section :anchor-name="pageAnchors[4]">
      <template v-slot:name>
        <section-name>
          Контакты
        </section-name>
      </template>
      <template v-slot:description>
        <section-desc>
          Вы можете связаться со мной одним из этих способов:
        </section-desc>
      </template>
      <template v-slot:content>
        <section-elements :contacts-section="true" :items="contactsItems"></section-elements>
      </template>
    </main-section>

    <!-- Коллеги -->
    <main-section :anchor-name="pageAnchors[5]">
      <template v-slot:name>
        <section-name>
          Я и мои партнеры
        </section-name>
      </template>
      <template v-slot:description>
        <section-desc>
          Без этих людей мой проект не был бы таким ярким.
        </section-desc>
      </template>
      <template v-slot:content>
        <people :items="persons"></people>
      </template>
    </main-section>
  </div>
</template>

<script>
import MainSection from '@/components/pages/main/MainSection.vue';
import SectionName from '@/components/pages/main/SectionName.vue';
import SectionDesc from '@/components/pages/main/SectionDescription.vue';
import SectionElements from '@/components/pages/main/SectionElements.vue';
import Collage from '@/components/pages/main/Collage.vue';
import About from '@/components/pages/main/About.vue';
import People from '@/components/pages/main/People.vue';

export default {
  components: { People, About, Collage, SectionElements, SectionDesc, SectionName, MainSection },
  props: {
    servicesItems: {
      type: Array,
      required: true,
    },
    coursesItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pageTitle: 'Медицина и косметология 2.0',
      popupContent: '',
      popupName: '',
      popupVisible: false,
      contactsItems: [
        {
          name: 'VK',
          description: undefined,
          imageURL: 'src/resources/vk_icon.jpg',
          contactItem: true,
          locationURL: 'https://vk.com/im?sel=189596649',
        },
        {
          name: 'Telegram',
          description: undefined,
          imageURL: 'src/resources/tg_icon.jpg',
          contactItem: true,
          locationURL: 'https://t.me/HelenaFreedom',
        },
        {
          name: 'WhatsApp',
          description: undefined,
          imageURL: 'src/resources/whatsapp_icon.jpg',
          contactItem: true,
          locationURL: 'https://wa.me/+79956499610?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5,%20',
        },
      ],
      pageAnchors: [
        {
          id: 0,
          link: 'home',
          displayName: 'Домой',
        },
        {
          id: 1,
          link: 'cabinet',
          displayName: 'Кабинет',
        },
        {
          id: 2,
          link: 'courses',
          displayName: 'Курсы',
        },
        {
          id: 3,
          link: 'about',
          displayName: 'Обо мне',
        },
        {
          id: 4,
          link: 'contacts',
          displayName: 'Контакты',
        },
        {
          id: 5,
          link: 'coworkers',
          displayName: 'Партнеры',
        },
      ],
      persons: [
        {
          name: 'Елена Усова',
          description: `<p><strong>Профессиональный профиль:</strong> квалификация - врач. Окончила ТашГосМИ-1 (ТМА) в 1997 году. До поступления в медицинский институт, в 1991 году окончила Медицинское училище и на втором курсе медицинского училища, в 1990 году, получила свой первый диплом косметолога с медицинским образованием.</p>
                        <p><strong>Опыт работы в сфере косметологии</strong> с 1991 года. Основная специализация – решение проблем старения и связанных с процессом старения деформационных изменений контура лица, области декольте и тела, в целом, пигментации кожи в различных областях тела, включая лицо, зону декольте, интимную зону, связанных с возрастными изменениями, состояний кожи и волос после перенесенных соматических и инфекционных заболеваний с фокусом на эстетические процедуры и дерматологическую косметологию. Восстановление эстетической привлекательности кожи после лечения акне, рубцовых изменений, пятен поствоспалительного характера и пигментации, как после родов, так и после перенесенных воспалений кожи.</p>
                        <p><strong>Образование:</strong> в последующие годы работы в сфере косметологии ежегодно, а иногда и не один раз в год, повышаю свою квалификацию по различным направлениям. Регулярно посещаю различные конференции и семинары, направленные на обновление знаний и умений в области красоты и медицины. Каждые три года повышаю квалификацию как преподаватель, освоила преподавание в симуляционном центре медицинского института БФУ им. И. Канта в 2020 году.</p>
                        <p><strong>Моя профессиональная деятельность как косметолога</strong> включает в себя следующие навыки:</p>
                        <p>Консультирование состояния кожи и определение ее проблем и потребностей</p>
                        <p>Планирование комплекса процедур и разработка плана процедур, ориентированных на конкретные потребности кожи.</p>
                        <p>Осуществляю следующие процедуры: косметический массаж лица, мануальную чистку лица, спины, области бикини, применение пилингов для решения различных проблем кожи.</p>
                        <p>Могу предложить различные методы с применением аппаратных методик: УЗ- чистку, микротоки, миостимуляторы, лимфодренажный аппарат, владею методикой трансдермальной фракционной мезотерапии и процедурой ВВ-GLOW.</p>
                        <p>С радостью восстановлю жизненные силы кожи при помощи капиллярной мезотерапии и процедуры биоревитализации. Применяю в своей работе тред-терапию, липоскульптуру лица и тела.</p>
                        <p>Веду преподавательскую деятельность с 2009 года. С 2012 года являюсь преподавателем Балтийского Федерального Университета им И. Канта высшего и среднего медицинского образования. Преподаю такие предметы, как Анатомия и физиология человека, Основы патологии, Здоровый образ жизни, Уход за больным.</p>
                        <p>Преподаю на курсах дополнительного образования БФУ им И. Канта по направлениям «Эстетическая косметология» и «Сестринское дело в косметологии» в течение многих лет.</p>`,
          img_url: 'src/resources/persons/elus.png',
          html_id: 'elena_usova',
        },
        {
          name: 'Наталья Жирнова',
          description: `<p>Практикующий и обучающий косметолог в Калининграде.</p>
                        <p>Официальный дилер профессиональной косметики Anna Lotan (Израиль)</p>
                        <p>Адрес: улица Юбилейная, 6, салон красоты "Версаль".</p>
                        <p>+7 906 230 25 17</p>`,
          img_url: 'src/resources/persons/cowork4.png',
          html_id: 'natalia_zhirnova',
        },
        {
          name: 'Ольга Ковальчук',
          description: `<p><strong>Профессиональный профиль:</strong> среднее медицинское образование, косметолог-эстетист.</p>
                        <p>Технолог. Преподаватель ТМ YUSSKISS.</p>
                        <p><strong>Опыт работы в сфере косметологии:</strong> с 2013 года в профессии</p>
                        <p><strong>Образование:</strong> владею эстетическими, инъекционными, аппаратными методами омоложения</p>
                        <p><strong>Моя профессиональная деятельность</strong></p>
                        <ul><strong>Провожу:</strong>
                          <li>Базовое обучение шугарингу и ваксингу.</li>
                          <li>Обзорные семинары по продукции ТМ YUSSKISS.</li>
                          <li>Практические мастер-классы по теме «Чистка бикини».</li>
                          <li>Разрабатываю индивидуальные программы по уходу за лицом.</li>
                          <li>Консультации по подбору домашнего ухода.</li>
                        </ul>`,
          img_url: 'src/resources/persons/cowork1.png',
          html_id: 'olga_covalchuk',
        },
        {
          name: 'Татьяна Бедарева',
          description: `<p><strong>Профессиональный профиль:</strong> косметолог, массажист.</p>
                        <p>Массаж в косметологии — это искусство, которое позволяет не только улучшить состояние кожи,
                        но и привнести ощущение легкости, расслабления и гармонии. Как нежное прикосновение, которое вдохновляет кожу на новые
                        высоты красоты. Он утончает текстуру кожи, разглаживает морщины и придает лицу свежий,
                        сияющий вид. </p>
                        <p>Каждое движение массажиста создает умиротворяющий ритм, который погружает в себя и
                        позволяет забыть о повседневных заботах. Это истинное погружение в состояние гармонии и
                        релаксации, магия, пробуждающая клетки кожи к новой жизни. Он
                        стимулирует кровообращение, улучшает цвет лица, укрепляет мышцы лица и шеи, делая кожу
                        упругой и сияющей.</p>
                        <p>В процессе массажа кожа наполняется жизненной силой и энергией природы. Она приобретает
                        здоровый румянец, естественное сияние и мягкость, отражая природную красоту во всей своей
                        чистоте.</p>
                        <p>Когда массаж становится частью косметологических процедур, он превращается в
                        исключительное путешествие к самосовершенствованию и гармонии кожи. Насладись этим
                        удивительным опытом и дари себе красоту и заботу, которые заслуживаешь!</p>`,
          img_url: 'src/resources/persons/cowork2.png',
          html_id: 'tatiana_bedareva',
        },
      ],
    };
  },
  computed: {
    coursesMedical() {
      if (this.coursesItems) {
        return this.coursesItems.filter(course => course.medical === true);
      } else {
        return [];
      }
    },
    coursesNonMedical() {
      if (this.coursesItems) {
        return this.coursesItems.filter(course => course.medical === false);
      } else {
        return [];
      }
    },
  },
  beforeMount() {
    this.$emit('dataUpdateRequest');
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Медицина и косметология 2.0';
    this.$emit('updatePageAnchors', this.pageAnchors);
  },
};
</script>