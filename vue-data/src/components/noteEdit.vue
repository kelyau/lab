<template>
<div class="note-edit">
  <Form :model="content" :label-width="80">
    <Form-item label="主题">
      <Input type="text" v-model="content.title"/>
    </Form-item>
    <Form-item label="时间">
      <Date-picker type="date" placeholder="选择时间" style="width: 200px" @on-change="changeDate"></Date-picker>
    </Form-item>
    <Form-item label="标签">
      <Input type="text" v-model="content.tags" />
    </Form-item>
    <Form-item>
      <Input type="textarea" v-model="content.text" />
    </Form-item>
    <Form-item>
      <Button type="success" @click="submit()">确定</Button>&nbsp;
      <Button @click="cancel()">取消</Button>
    </Form-item>
  </Form>
</div>
</template>

<style scoped>
  .note-edit {
    background: #fff;
    position: absolute;
    z-index: 2;
    padding: 0 100px;
    width: 100%;
    height: 100%;
  }
</style>

<script>
export default {
  methods: {
    submit() {
      this.$store.dispatch('postNote', Object.assign({}, this.content))
        .then((u) => {
          this.$emit('on-close');
          this.$router.push({ name: 'note', params: { id: u.toJSON().objectId } });
        });
    },
    cancel() {
      this.$emit('on-close');
    },
    changeDate(date) {
      this.content.date = date;
    },
  },
  props: ['content'],
};
</script>
