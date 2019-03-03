<template>
  <div>
    <audio ref="audio">
      <source src="@/assets/da.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Jingle',
  methods: {
    play() {
      this.$refs.audio.play()
    }
  }
}

</script>

