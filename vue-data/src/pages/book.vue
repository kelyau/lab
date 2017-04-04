<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <book-list></book-list>
      </i-col>
      <i-col span="19">
        <book-content></book-content>
      </i-col>
    </Row>
    
  </div>
</template>
<style>

</style>
<script>
import List from '@/components/list';
import Content from '@/components/content';

export default {
  data() {
    return {};
  },
  components: { bookList: List, bookContent: Content },
};
</script>
