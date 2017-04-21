<template>
  <div class="book">
    <Row>
      <i-col span="5">
        <book-list :list="bookList" :active="bookItem.id" active-prop="id" name="book"></book-list>
      </i-col>
      <i-col span="19">
        <div class="loading" v-if="loading"><span>loading</span></div>
        <book-content :book="bookItem"></book-content>
      </i-col>
    </Row>

  </div>
</template>
<style>
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(200,200,200,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
import List from '@/components/list';
import Content from '@/components/content';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: '',
      loading: false,
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
      this.loading = true;
      this.id = this.$route.params.id;
      if (!parseInt(this.id, 10)) {
        this.$store.dispatch('initBookItem');
        return;
      }
      this.$store.dispatch('fetchBookItem', { id: this.id })
          .then(() => { this.loading = false; });
    },
  },
  components: { bookList: List, bookContent: Content },
  destroyed() {
    this.$store.dispatch('destroyBookItem');
  },
};
</script>
