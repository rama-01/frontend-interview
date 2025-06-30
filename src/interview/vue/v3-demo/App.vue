<template>
  <!-- <div class="app-container">
    <h1>大文件上传与断点续传示例</h1>
    <FileUpload />
  </div> -->
  <router-view />
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