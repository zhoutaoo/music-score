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
      <br><br><br><br><br>
    </div>
    <!--歌谱内容-->
    <div class="body">
      <sections :sections="score.sections" :tone="score.key" :display-chord="displayChord"/>
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
    }
  }
}
</script>

<style rel='stylesheet/scss' scoped>
  
</style>
