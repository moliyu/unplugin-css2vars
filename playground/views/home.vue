<script setup>
import { changeColor } from 'virtual:theme'

window._changeColor = changeColor

function change(colorKey, color) {
  changeColor({ [colorKey]: color })
}
</script>

<template>
  <div class="test">
    test1
  </div>
  <div class="purple">
    紫颜色
  </div>
  <div class="test2">
    test2
  </div>
  <div style="color: #ff0000">
    redcolor
  </div>
  <button @click="change('theme-color', 'yellow')">
    change theme to yellow
  </button>
  <button @click="change('red-color', 'orange')">
    change redcolor to blue
  </button>
</template>

<style scoped>
.test {
  color: #409eff;
}
.test2 {
  background: #333333;
}
.purple {
  color: #66b1ff;
}
</style>
