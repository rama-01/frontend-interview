<template>
  <div id="app">
  {{foo}}
  <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
import { fixed_obj } from './constant';


export default {
  name: 'App',
  data() {
    return {
      foo: Object.freeze(fixed_obj)
    }
  },
  methods: {
    handleClick() {
      console.log(this.foo);
      this.foo.a = 'Button was clicked!';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
