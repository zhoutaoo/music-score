<template>
  <div>
    <div v-for="(section, index) in score.sections" :key="section.id" class="section">
      <div>
        <!--主副歌段落标识-->
        <div
          v-if="section.type"
          style="border: dotted; width: 100px; text-align:center; font-size: x-large;font-weight: bold"
        >{{ section.type }}</div>
      </div>
      <Bars
        :section-id="index"
        :section="section"
        :tonic="score.key"
        :beat-per-ms="beatPerMs"
        :beats="score.beat"
        :display-chord="displayChord"
        :class="{ active: index === active }"
        :active="active"
        @beat="beat"/>
      <!--段落间空行-->
      <div>
        <br><!--空行-->
        <br><!--空行-->
      </div>
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
  },
  methods: {
    beat: function() {
      this.$emit('beat')
    }
  }

}
</script>

<style rel='stylesheet/scss' scoped>
  .section {
    display: inline-block;
    min-width: 25%;
  }
  .active {
    background-color: aliceblue;
  }
</style>
