<template>
  <div>
    <div>
      <!--主副歌段落标识-->
      <div
        v-if="section.type"
        style="border: dotted; width: 80px; text-align:center; font-size: x-large;font-weight: bold"
      >{{ section.type }}</div>
    </div>
    <div :class="{ active: isActive }">
      <!--和弦-->
      <div>
        <ul class="chords">
          <li v-for="chord in section.chords" :key="chord.id">
            <div class="chord">{{ getChords(tone, chord) }}</div>
          </li>
        </ul>
      </div>

      <div v-for="record in section.records" :key="record.id" class="record">
        <!--弹奏谱-->
        <ul>
          <li v-for="item in record" :key="item.id">
            <div class="beat">{{ item }}</div>
          </li>
        </ul>
      </div>

      <div>
        <!--歌词-->
        <ul class="lyric">
          <li v-for="beat in section.lyric" :key="beat.id">
            <div class="beat">{{ beat }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--段落间空行-->
    <div>
      <br><!--空行-->
      <br><!--空行-->
    </div>
  </div>
</template>

<script>
import { getChords } from '@/utils/music'

export default {
  name: 'Bars',
  props: {
    active: {
      type: Number,
      default: -1
    },
    myNumber: {
      type: Number,
      default: 0
    },
    displayChord: {
      type: Boolean,
      default: false
    },
    tone: {
      type: String,
      default: ''
    },
    section: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      number: this.myNumber,
      isActive: false
    }
  },
  watch: {
    active: function(value) {
      console.log('active:' + value)
      this.isActive = value === this.number
    },
    section: function(value) {
      console.log('section:' + value)
    }
  },
  created() {
    console.log('created')
  },
  methods: {
    /**
     * 级数转和弦
     */
    getChords(key, number) {
      if (this.displayChord === false) {
        return number
      }

      let chords = ''
      if (number === '' || number === undefined) {
        return chords
      }
      number.split('/').forEach((element, index) => {
        chords =
          chords + (index === 1 ? '/' : '') + getChords(key, element)
      })
      return chords
    }
  }
}
</script>

<style rel='stylesheet/scss' scoped>

  .section ul {
    margin-block-end: 0;
    margin-block-start: 0;
    padding-inline-start: 0;
    display: inline-block;
    min-height: 20px;
    min-width: 100%;
    border-right-style: inset;
  }
  .section ul li {
    display: inline-block;
    text-align: center;
    min-width: 25%;
  }
  /*和弦*/
  .chord {
    font-weight: bold;
  }
  /*弹奏记录*/
  .record {
    font-family: SMUS2011a;
  }
  /*歌词*/
  .lyric {
  }
  .active {
    background-color: #99a9bf;
  }
</style>
