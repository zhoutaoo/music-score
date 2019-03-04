<template>
  <div class="app-container">
    <div>
      <div style="display: inline-block; vertical-align: middle; padding-right: 5px">
        节拍器：<el-switch v-model="voice"/>
        <el-select v-model="score.key" placeholder="请选择" style="width: 60px;" @change="transChord">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
        <el-button type="primary" @click="displayForChord">{{ displayChord ? "级数" : "和弦" }}</el-button>
      </div>

      <el-button-group>
        <el-button type="primary" @click="startAndStop">{{ played ? "暂停" : "开始" }}</el-button>
        <el-button @click="stop">停止</el-button>
      </el-button-group>

      <jingle v-show="false" ref="jingle" :voice="voice"/>

    </div>
    <br><br>
    <!--歌谱头标题等-->
    <div class="header">
      <h1 style="text-align: center">{{ score.name }}</h1>
      <h2>{{ score.enName }}</h2>
      <div><h4>调式 : {{ score.key }}</h4></div>
      <div><h4>拍子 : {{ score.beat }}/{{ score.note }}</h4></div>
      <div><h4>速度 : {{ score.velocity }}</h4></div>

      <br>
    </div>
    <!--歌谱内容-->
    <div class="body">
      <sections
        :score="score"
        :beat-per-ms="beatPerMs()"
        :display-chord="displayChord"
        :active="activeNumber"
        @beat="beat"/>
    </div>

    <div class="footer">{{ footer }}</div>
  </div>
</template>

<script>
import { getInfo } from '@/api/score'
import { Sections } from './components'
import { Jingle } from './components'
import { mapGetters } from 'vuex'

const MINUTE = 60000

export default {
  components: {
    Sections,
    Jingle
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
      voice: true,
      played: false,
      player: null,
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
        this.score = response.data
        this.listLoading = false
      })
    },
    /**
     * 显示和弦/级数
     */
    displayForChord() {
      this.displayChord = !this.displayChord
    },
    /**
     * 转调
     */
    transChord(key) {
      this.score.key = key
    },
    /**
     * 开始暂停播放
     */
    startAndStop() {
      this.played ? this.pause() : this.play()
    },
    /**
     * 开始播放
     */
    play() {
      this.played = true
      this.nextBeat()
      this.player = setInterval(this.nextBeat, this.beatPerMs() * this.score.beat)
    },
    /**
     * 每拍的时长
     */
    beatPerMs() {
      return MINUTE / this.score.velocity
    },
    /**
     * 下一节
     */
    nextBeat() {
      this.activeNumber += 1
      if (this.activeNumber >= this.score.sections.length) {
        this.stop()
      }
    },
    /**
     * 暂停播放
     */
    pause() {
      this.played = false
      clearInterval(this.player)
    },
    /**
     * 停止播放
     */
    stop() {
      clearInterval(this.player)
      this.activeNumber = -1
      this.played = false
    },
    beat() {
      this.$refs.jingle.play()
    }
  }
}
</script>

<style rel='stylesheet/scss' scoped>

</style>
