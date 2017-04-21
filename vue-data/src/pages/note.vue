<template>
  <div class="note">
    <div  v-flex-container>
      <div v-flex-item width="200px">
        <note-list :list="noteList" :active="noteCurr.objectId" active-prop="objectId" name="note"></note-list>
      </div>
      <div v-flex-item>
        <transition name="loading"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">
          <div v-if="loading" class="loading">loading</div>
        </transition>
        <transition 
          name="slide"
          enter-active-class="animated slideInDown"
          leave-active-class="animated slideOutUp">
          <note-edit :content="editContent" @on-close="hideNoteEidt" v-show="editStatus"></note-edit>
        </transition>
        <div class="content">
          <Button type="success" @click="newNote()">写一篇</Button>
          <Button type="success" @click="editNote()">编辑</Button>
          <note-content :data="noteCurr"></note-content>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  padding: 10px;
}
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
import noteEdit from '@/components/noteEdit';
import List from '@/components/list';
import noteContent from '@/components/noteContent';
import { mapGetters } from 'vuex';

export default{
  data() {
    return {
      editStatus: false,
      editContent: {},
      id: '',
      loading: false,
    };
  },
  created() {
    this.$store.dispatch('getNotes');
    this.fetchData();
  },
  computed: mapGetters({
    noteList: 'noteList',
    noteCurr: 'noteCurr',
  }),
  watch: {
    $route: 'fetchData',
  },
  methods: {
    newNote() {
      this.editContent = {};
      this.editStatus = true;
    },
    editNote() {
      this.editContent = Object.assign({}, this.noteCurr);
      this.editStatus = true;
    },
    hideNoteEidt() {
      this.editStatus = false;
      this.editContent = {};
    },
    fetchData() {
      this.id = this.$route.params.id;
      this.loading = true;
      if (this.id === '0') {
        this.$store.dispatch('initNote')
          .then(() => { this.loading = false; });
        return;
      }
      this.$store.dispatch('getNote', this.id)
          .then(() => { this.loading = false; });
    },
  },
  components: { noteEdit, 'note-list': List, noteContent },
  beforeRouteUpdate(to, from, next) {
    this.editStatus = false;
    next();
  },
};
</script>
