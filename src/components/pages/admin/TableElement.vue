<template>

    <div class="d-flex flex-column p-3 rounded shadow bg-secondary-subtle">
      <slot name="preview-element"></slot>
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
        <slot name="modify-button"></slot>
        <slot name="delete-button"></slot>
      </div>
    </div>
</template>

<script>
import SectionItem from "@/components/pages/students/SectionItem.vue";

export default {
  name: 'table-element',
  components: {SectionItem},
  props: {
    row: {
      required: true
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

    }
  }
}
</script>