<template>
  <div class="app-container">
    <h1>大文件上传与断点续传示例</h1>
    <FileUpload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUpload from './components/FileUpload.vue'

export default defineComponent({
  name: 'App',
  components: {
    FileUpload
  }
})
</script>

<style>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>