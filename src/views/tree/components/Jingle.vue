<template>
  <div>
    <audio ref="audio" defaultPlaybackRate="2">
      <source src="@/assets/da.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Jingle',
  props: {
    voice: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    play() {
      if (this.voice) {
        console.log('audio : da')
        this.$refs.audio.play()
      }
    }
  }
}

</script>

