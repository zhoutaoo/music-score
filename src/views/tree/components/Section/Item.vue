<template>
  <div>
    <div>
      <!--主副歌段落标识-->
      <div
        v-if="section.type"
        style="border: dotted; width: 80px; text-align:center; font-size: x-large;font-weight: bold"
      >{{ section.type }}</div>
    </div>

    <!--中间区域-->
    <div :class="{ active: isActive }">
      <!--和弦-->
      <div>
        <ul class="chords">
          <li v-for="chord in section.chords" :key="chord.id">
            <div class="chord">{{ getChords(tonic, chord) }}</div>
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
    {{ index }}
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
      number: this.myNumber,
      isActive: false,
      timer: null,
      index: 0
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
      console.log('section :' + this.number + ' dang dang dang dang')
      if (this.index >= this.beats) {
        this.beatStop()
      }
    },
    /**
     * 节拍停止
     */
    beatStop() {
      clearInterval(this.timer)
      this.index = 0
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
    background-color: aliceblue;
  }
</style>
