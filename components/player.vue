<template>
  <div class="player">
    <div class="player__waveforms">
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

    <div class="player__controls">
      <div class="controls__play" v-if="!currentlyPlaying">
        <button class="control" @click="play('premaster')">
          ▶︎ premaster
        </button>
        <button class="control" @click="play('master')">▶︎ master</button>
      </div>
      <div class="controls__playing" v-else>
        <button class="control control--icons" @click="playPause">
          <span class="play">▶︎</span><span class="pause"></span>
        </button>
        <button class="control" @click="switchTrack">
          switch
        </button>
      </div>
    </div>
    <div class="player__feedback">
      <small>
        Vinicius Honorio & Orion - No Love Lost (Temudo Remix)<br />
        <span v-if="currentlyPlaying">
          currently playing <strong>{{ currentlyPlaying }}</strong>
        </span>
      </small>
    </div>
  </div>
</template>
<script>
import master from "@/assets/audio/master.wav";
import premaster from "@/assets/audio/premaster.wav";

export default {
  data() {
    return {
      WaveSurfer: null,
      waveSurfer: {},
      loadedFiles: 0,
      options: {
        responsive: true,
        height: 50,
        barWidth: 3,
        cursorWidth: 3,
        waveColor: "#ccc"
      },
      optionsP: {
        progressColor: "black",
        cursorColor: "black"
      },
      optionsM: {
        progressColor: "hsl(207, 100%, 26%)",
        cursorColor: "black"
      },
      currentlyPlaying: null,
      notPlaying: null,
      progress: 0
    };
  },
  mounted() {
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
  beforeDestroy() {
    this.master.destroy();
    this.premaster.destroy();
  },
  methods: {
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
    }
  },
  computed: {
    currentTrack() {
      return this[this.currentlyPlaying];
    }
  }
};
</script>
<style lang="scss">
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

.control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  background: $secondary-color;
  color: $primary-color;
  border: 2px solid $primary-color;
  height: 29px;
  outline: none;
  //line-height: 1;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    box-shadow: inset 0px 0px 0px 1px black;
  }

  &--icons {
    padding-top: 5px;
  }
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
