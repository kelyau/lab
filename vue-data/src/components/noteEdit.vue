<template>
<div class="note-edit">
  <Form :model="content" :label-width="80">
    <Form-item label="主题">
      <Input type="text" v-model="content.title"/>
    </Form-item>
    <Form-item label="时间">
      <Date-picker type="date" placeholder="选择时间" style="width: 200px"></Date-picker>
    </Form-item>
    <Form-item label="标签">
      <Input type="text" v-model="content.tag" />
    </Form-item>
    <Form-item>
      <Input v-model="content.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
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
    padding: 0 100px;
    width: 100%;
    height: 100%;
  }
</style>

<script>
export default {
  methods: {
    submit() {
      this.Utils.log(this.content);
    },
    cancel() {

    },
  },
  created() {
    this.$on('on-form-change', (e) => { this.log(e); });
  },
  props: ['content'],
};
</script>
