<template>
  <div>
    {{ counter2.count }}
    <button @click="counter2.count++">increment</button>
  </div>
  <hr />
  <input type="text" v-focus />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, watchEffect } from 'vue'

const count = ref(0)
// **Run a function immediately while reactively tracking its dependencies and re-runs it whenever the dependencies are changed
// watchEffect(() => console.log(count.value))

// **Watches one or more reactive data sources and invokes a callback function when the sources change.
const counter2 = reactive({ count: 0 })
// watch(count, () => console.log(count.value))
watch(
  () => counter2.count,
  () => console.log(counter2.count)
)

/* directive */
// const vFocus = {
//   mounted: (el) => el.focus()
// }
</script>
