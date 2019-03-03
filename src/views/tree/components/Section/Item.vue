<template>
  <div>
    <!--中间区域-->
    <div :class="{ active: isActive }">
      <!--和弦-->
      <div>
        <ul class="chords">
          <li v-for="(chord, i) in section.chords" :key="chord.id" :class="{ beaton : index === i }">
            <div class="chord">{{ getChords(tonic, chord) | nullToBlank }}</div>
          </li>
        </ul>
      </div>

      <div v-for="record in section.records" :key="record.id" class="record">
        <!--弹奏谱-->
        <ul>
          <li v-for="(item, i) in record" :key="item.id" :class="{ beaton : index === i }">
            <div class="beat">{{ item | nullToBlank }}</div>
          </li>
        </ul>
      </div>

      <div>
        <!--歌词-->
        <ul class="lyric">
          <li v-for="(beat, i ) in section.lyric" :key="beat.id" :class="{ beaton : index === i }">
            <div class="beat">{{ beat | nullToBlank }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getChords } from '@/utils/music'

export default {
  name: 'Bars',
  filters: {
    nullToBlank: function(value) {
      return !value ? '　' : value
    }
  },
  props: {
    active: {
      type: Number,
      default: -1
    },
    sectionId: {
      type: Number,
      default: 0
    },
    displayChord: {
      type: Boolean,
      default: false
    },
    tonic: {
      type: String,
      default: ''
    },
    beats: {
      type: Number,
      default: 0
    },
    section: {
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
      number: this.sectionId,
      isActive: false,
      timer: null,
      index: -1
    }
  },
  watch: {
    /**
     * 监听active看是否播放到当前小节
     */
    active: function(value) {
      this.isActive = this.number === value
      if (this.isActive) {
        console.log('Bars active :' + this.number)
      }
      // 播放当前小节时，按节拍
      if (this.isActive) {
        this.beatStart()
      }
    }
  },
  created() {
    console.log('Bars created :' + this.number)
  },
  methods: {
    /**
     * 节拍开始
     */
    beatStart() {
      this.beat()
      this.timer = setInterval(this.beat, this.beatPerMs)
    },
    /**
     * 每拍调用
     */
    beat() {
      this.index++
      this.$emit('beat')
      console.log('section :' + this.number + '-' + this.index + ' da')
      if (this.index >= this.beats) {
        this.beatStop()
      }
    },
    /**
     * 节拍停止
     */
    beatStop() {
      clearInterval(this.timer)
      this.isActive = false
      this.index = -1
    },
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
    min-height: 20px;
  }
  /*和弦*/
  .chord {
    font-weight: bold;
    min-height: 20px;
    line-height:20px;
  }
  /*弹奏记录*/
  .record {
    font-family: SMUS2011a;
  }
  .beaton {
    background-color: palegreen;
  }
</style>
