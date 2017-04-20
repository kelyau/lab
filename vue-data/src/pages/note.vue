<template>
  <div class="note">
    <div  v-flex-container>
      <div v-flex-item width="200px">
        <note-list :list="noteList" :active="noteCurr.objectId" active-prop="objectId" name="note"></note-list>
      </div>
      <div v-flex-item>
        <transition 
          name="slide"
          enter-active-class="animated slideInDown"
          leave-active-class="animated slideOutUp">
          <note-edit :content="editContent" @on-close="hideNoteEidt" v-if="editStatus"></note-edit>
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
      this.editContent = {};
      this.editStatus = false;
    },
    fetchData() {
      this.id = this.$route.params.id;
      if (this.id === '0') {
        this.$store.dispatch('initNote');
        return;
      }
      this.$store.dispatch('getNote', this.id);
    },
  },
  components: { noteEdit, 'note-list': List, noteContent },
};
</script>
