<template>
  <div>
    <div v-for="(section, index) in score.sections" :key="section.id" class="section">
      <Bars :section="section" :tonic="score.type" :beat-per-ms="beatPerMs" :beats="score.beat" :display-chord="displayChord" :active="active" :my-number="index"/>
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
    score: {
      type: Object,
      default: Object
    },
    beatPerMs: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
    }
  },
  created() {
    console.log('Sections created')
  }
}
</script>

<style rel='stylesheet/scss' scoped>
  .section {
    display: inline-block;
    min-width: 25%;
  }
</style>
