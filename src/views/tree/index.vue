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
      <el-button @click="play">
        {{ activeNumber }}
      </el-button>
      <br><br><br><br><br>
      <h1 style="text-align: center">{{ score.name }}</h1>
    </div>
    <!--歌谱内容-->
    <div class="body">
      <sections :sections="score.sections" :tone="score.key" :display-chord="displayChord" :active="activeNumber"/>
    </div>

    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
import { getInfo } from '@/api/score'
import { Sections } from './components'
import { mapGetters } from 'vuex'

export default {
  components: {
    Sections
  },
  data() {
    return {
      options: [{
        value: 'D'
      }, {
        value: 'E'
      }],
      activeNumber: -1,
      displayChord: false,
      displayChordText: '和弦',
      header: '我是header',
      footer: '我是footer',
      score: {},
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {

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
     * 播放
     */
    play() {
      this.activeNumber += 1
    }
  }
}
</script>

<style rel='stylesheet/scss' scoped>

</style>
