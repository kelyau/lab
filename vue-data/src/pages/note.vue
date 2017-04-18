<template>
  <div class="note">
    <div  v-flex-container>
      <div v-flex-item width="200px"></div>
      <div v-flex-item>
        
        <button type="success" @click="newNote()">写一篇</button>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
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
};
</script>
