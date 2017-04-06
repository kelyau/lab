<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <book-list :books="bookList"></book-list>
      </i-col>
      <i-col span="19">
        <book-content :book="bookItem"></book-content>
      </i-col>
    </Row>

  </div>
</template>
<style>

</style>
<script>
import List from '@/components/list';
import Content from '@/components/content';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: '',
    };
  },
  computed: mapGetters({
    bookList: 'bookList',
    bookItem: 'bookItem',
  }),
  created() {
    this.$store.dispatch('fetchBookList', { tag: 'zh' });
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id;
      this.$store.dispatch('fetchBookItem', { id: this.id });
    },
  },
  components: { bookList: List, bookContent: Content },
};
</script>
