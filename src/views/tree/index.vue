<template>
  <div class="app-container">
    <!--歌谱头标题等-->
    <div class="header">{{ header }}
      <el-select v-model="score.key" placeholder="请选择" @change="transChord">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <el-button @click="displayForChord">
        {{ displayChordText }}
      </el-button>
    </div>
    <!--歌谱内容-->
    <div class="body">
      <div v-for="(section, index) in score.sections" :key="section.id" class="section">
        <div>
          <!--主副歌段落标识-->
          <div
            v-if="section.type"
            style="border: dashed; width: 20%; text-align:center"
          >{{ section.type }}</div>
        </div>
        <!--和弦-->
        <ul class="chords">
          <!--开始小节线-->
          <li v-if="index%4==0" class="separator">\</li>
          <li v-for="chord in section.chords" :key="chord.id">
            <div class="chord">
              {{ getChords(score.key, chord) }}
            </div>
          </li>
          <!--结束小节线-->
          <li class="separator">\</li>
        </ul>
        <!--弹奏谱-->
        <ul v-for="record in section.records" :key="record.id" class="record">
          <li v-if="index%4==0" class="separator">\</li>
          <li v-for="item in record" :key="item.id">
            <div class="beat">{{ item }}</div>
          </li>
          <li class="separator">\</li>
        </ul>
        <!--歌词-->
        <ul class="lyric">
          <li v-if="index%4==0" class="separator">\</li>
          <li v-for="beat in section.lyric" :key="beat.id">
            <div class="beat">{{ beat }}</div>
          </li>
          <li class="separator">\</li>
        </ul>

        <div>
          <br><!--空行-->
        </div>

      </div>
    </div>
    <!--歌谱尾-->
    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
import { getInfo } from '@/api/score'
import { getChords } from '@/utils/music'

export default {
  data() {
    return {
      options: [{
        value: 'D'
      }, {
        value: 'E'
      }],
      displayChord: false,
      displayChordText: '和弦',
      header: '我是header',
      footer: '我是footer',
      score: {},
      listLoading: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    /**
     * 拉取歌谱数据
     */
    fetchData() {
      this.listLoading = true
      getInfo().then(response => {
        console.log(response.data)
        this.score = response.data
        this.listLoading = false
      })
    },
    /**
     * 显示和弦/级数
     */
    displayForChord() {
      this.displayChord = !this.displayChord
      this.displayChordText = this.displayChordText === '和弦' ? '级数' : '和弦'
    },
    /**
     * 转调
     */
    transChord(key) {
      this.score.key = key
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
.record {
  font-family: SMUS2011a;
}

.section {
  display: inline-block;
  min-width: 25%;
}

.section ul {
  margin-block-end: 0;
  margin-block-start: 0;
  padding-inline-start: 0;
  width: inherit;
}

.section ul li {
  display: inline-block;
  text-align: center;
  min-width: 22.5%;
}

.section ul .separator {
  font-family: SMUS2011a;
  min-width: 2%;
}

.chords {
  font-style: oblique
 }
</style>
