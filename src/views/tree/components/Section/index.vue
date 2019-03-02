<template>
  <div>
    <div v-for="(section) in sections" :key="section.id" class="section">
      <div>
        <!--主副歌段落标识-->
        <div
          v-if="section.type"
          style="border: dotted; width: 80px; text-align:center; font-size: x-large;font-weight: bold"
        >{{ section.type }}</div>
      </div>
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

      <!--段落间空行-->
      <div>
        <br><!--空行-->
        <br><!--空行-->
      </div>
    </div>
  </div>
</template>

<script>
import { getChords } from '@/utils/music'

export default {
  name: 'Sections',
  props: {
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
  created() {
    console.log('----------------')
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

  .section {
    display: inline-block;
    min-width: 25%;
  }
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
</style>
