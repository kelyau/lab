<template>
  <div class="note">
    <div  v-flex-container>
      <div v-flex-item width="200px"></div>
      <div v-flex-item>
        <note-edit :content="editContent"></note-edit>
        <Button type="success" @click="newNote()">写一篇</Button>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import noteEdit from '@/components/noteEdit';

export default{
  data() {
    return {
      edit: false,
      editContent: {},
    };
  },
  methods: {
    newNote() {
      this.editContent = {};
      this.edit = true;
    },
  },
  components: { noteEdit },
};
</script>
