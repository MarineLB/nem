<template>
  <div class="player">
    <div class="list">
      <Button
        v-for="(track, index) in tracks"
        class="list__item button--no-hover"
        :key="track.author"
        :type="selected === track ? 'full' : 'ghost'"
        @click="selected = track"
        >{{ index + 1 }}</Button
      >
      <!-- -{{ track.artist_track }} - {{ track.premaster.url }}
      {{ track.master.url }} -->
      <br />
    </div>
    <div class="player__waveforms" v-if="selected">
      <div
        class="player__waveform player__waveform--premaster"
        :class="{ 'player__waveform--hidden': currentlyPlaying === 'master' }"
        ref="waveformP"
      >
        <span class="waveform__loading" v-if="loadedFiles < 2"
          >Loading audio files... {{ loadedFiles }} / 2</span
        >
      </div>
      <div
        class="player__waveform player__waveform--master"
        :class="{ 'player__waveform--hidden': currentlyPlaying !== 'master' }"
        ref="waveformM"
      ></div>
    </div>

    <div class="player__controls" v-if="selected">
      <div class="controls__play" v-if="!currentlyPlaying">
        <Button @click="play('premaster')">▶︎ premaster</Button>
        <Button @click="play('master')">▶︎ master</Button>
      </div>
      <div class="controls__playing" v-else>
        <Button class="control--icons" @click="playPause">
          <span class="play">▶︎</span><span class="pause"></span>
        </Button>
        <Button @click="switchTrack">switch</Button>
        <span v-if="currentlyPlaying">
          currently playing <strong>{{ currentlyPlaying }}</strong>
        </span>
      </div>
    </div>
    <div class="player__feedback" v-if="selected">
      <small>{{ selected.artist_track }}<br /></small>
    </div>
  </div>
</template>
<script>
import Button from "@/components/button.vue";
// import master from "@/assets/audio/master.wav";
// import premaster from "@/assets/audio/premaster.wav";

export default {
  components: { Button },
  props: ["tracks"],
  data() {
    return {
      selected: null,
      WaveSurfer: null,
      waveSurfer: {},
      loadedFiles: 0,
      options: {
        responsive: true,
        height: 50,
        barWidth: 3,
        cursorWidth: 3,
        waveColor: "#ccc",
      },
      optionsP: {
        progressColor: "black",
        cursorColor: "black",
      },
      optionsM: {
        progressColor: "hsl(207, 100%, 26%)",
        cursorColor: "black",
      },
      currentlyPlaying: null,
      notPlaying: null,
      progress: 0,
    };
  },
  mounted() {
    // const premaster = null;
    // const master = null;
    if (this.tracks && this.tracks.length > 0) this.selected = this.tracks[0];
    // this.$nextTick(() => {
    //   if (this.selected) this.init(premaster, master);
    // });
  },
  watch: {
    selected() {
      this.reset();
      this.$nextTick(() => {
        this.init(this.selected.premaster.url, this.selected.master.url);
      });
    },
  },
  beforeDestroy() {
    this.reset();
  },
  methods: {
    init(premaster, master) {
      this.WaveSurfer = require("wavesurfer.js");
      let wsOptionsM = Object.assign(
        { container: this.$refs.waveformM },
        this.options,
        this.optionsM
      );
      let wsOptionsP = Object.assign(
        { container: this.$refs.waveformP },
        this.options,
        this.optionsP
      );
      this.master = new this.WaveSurfer.create(wsOptionsM);
      this.premaster = new this.WaveSurfer.create(wsOptionsP);
      // TODO CHECK IF CAN LOAD FROM URL
      this.master.load(master);
      this.premaster.load(premaster);

      this.premaster.on("ready", () => {
        this.loadedFiles++;
      });
      this.master.on("ready", () => {
        this.loadedFiles++;
      });

      this.premaster.on("finish", () => {
        this.play("premaster", 0);
      });
      this.master.on("finish", () => {
        this.play("master", 0);
      });
    },
    play(track, start) {
      this.currentlyPlaying = track;
      this.notPlaying = track === "master" ? "premaster" : "master";
      this[track].play(start);
    },
    playPause() {
      this.currentTrack.playPause();
      //this.progress = this.currentTrack.getCurrentTime();
      //this.currentlyPlaying = null;
      //this.notPlaying = null;
    },
    switchTrack() {
      this.currentTrack.pause();
      this.progress = this.currentTrack.getCurrentTime();
      this.play(this.notPlaying, this.progress);
    },
    reset() {
      if (this.master) this.master.destroy();
      if (this.premaster) this.premaster.destroy();
      this.loadedFiles = 0;
      this.currentlyPlaying = null;
      this.notPlaying = null;
      this.progress = 0;
    },
  },
  computed: {
    currentTrack() {
      return this[this.currentlyPlaying];
    },
  },
};
</script>
<style lang="scss">
.list {
  margin-bottom: $margin-md;
}
.list__item {
  margin-right: $margin-sm;
}
.player__waveforms {
  position: relative;
  height: 50px;
  margin-bottom: 10px;
}
.player__waveform {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &--hidden {
    opacity: 0;
    z-index: -1;
  }
}

// .player__controls {
//   display: flex;
//   align-items: center;
// }

.player__feedback {
  margin-top: 7px;
  margin-bottom: 20px;
}

.pause {
  &:before,
  &:after {
    content: "";
    display: inline-block;
    background: $primary-color;
    height: 11px;
    width: 3px;
    margin-right: 2px;
  }
}
</style>
