<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <book-list :books="bookList" :bookActive="bookItem.id"></book-list>
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
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id;
      if (!parseInt(this.id, 10)) {
        this.$store.dispatch('initBookItem');
        return;
      }
      this.$store.dispatch('fetchBookItem', { id: this.id });
    },
  },
  components: { bookList: List, bookContent: Content },
  destroyed() {
    this.$store.dispatch('destroyBookItem');
  },
};
</script>
