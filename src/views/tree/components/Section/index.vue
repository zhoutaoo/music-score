<template>
  <div>
    <div v-for="(section, index) in sections" :key="section.id" class="section">
      <Bars :section="section" :tone="tone" :display-chord="displayChord" :active="active" :my-number="index"/>
    </div>
  </div>
</template>

<script>
import { Bars } from '../index'

export default {
  name: 'Sections',
  components: {
    Bars
  },
  props: {
    active: {
      type: Number,
      default: -1
    },
    displayChord: {
      type: Boolean,
      default: false
    },
    tone: {
      type: String,
      default: ''
    },
    sections: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      myNO: 0
    }
  },
  created() {
    console.log('created')
  }
}
</script>

<style rel='stylesheet/scss' scoped>
  .section {
    display: inline-block;
    min-width: 25%;
  }
</style>
