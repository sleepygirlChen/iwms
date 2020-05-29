<template>
  <div class="monitor">
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      @ready="onPlayerReadied"
    ></video-player>
  </div>
</template>

<script>
export default {
  name: "monitor",
  data() {
    return {
      playerOptions: {
        overNative: true,
        height: 600,
        autoplay: true,
        controls: true,
        techOrder: ["flash"],
        sourceOrder: true,
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://58.200.131.2:1935/livetv/hunantv"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    onPlayerReadied() {
      // // consolelog(this.player, this.player.techName_);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>

<style lang="less" scoped>
// .videoHeight {
//   height: calc(~"100vh - 80px");
// }
</style>