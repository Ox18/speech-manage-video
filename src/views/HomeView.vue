<template>
  <video ref="videoPlayer" width="600" controls>
    <source src="@/assets/videos/video.mp4" type="video/mp4" />
    Tu navegador no soporta la reproducción de videos.
  </video>
  <GoogleAssistant @commandDetected="command" @triggerCommand="trigger" />
</template>

<script>
import GoogleAssistant from '@/components/GoogleAssistant.vue'
import { ACTION_COMMAND } from '@/shared/consts/actions.const'
import { googleCommandVideo } from '@/utils/googleVideo.util'

const TRIGGER = {
  LISTENER: 'listener',
  STOP: 'stop'
}

export default {
  components: {
    GoogleAssistant
  },
  data() {
    return {
      isEnabledListener: false
    }
  },
  methods: {
    trigger(data) {
      this.isEnabledListener = data === TRIGGER.LISTENER
    },
    command(value) {
      const video = this.$refs.videoPlayer

      const resultCommand = googleCommandVideo(value)

      console.log('--- result from google')
      console.log(resultCommand)

      if (!resultCommand) {
        console.log('Comando no válido:', value)
        return
      }

      const { action, payload } = resultCommand

      if (action === ACTION_COMMAND.ADVANCE_VIDEO_BY_DEFAULT) {
        video.currentTime += 10
      }

      if (action === ACTION_COMMAND.ADVANCE_VIDEO_BY_TIME) {
        video.currentTime += payload.seconds
      }

      if (action === ACTION_COMMAND.BACK_VIDEO_BY_DEFAULT) {
        video.currentTime -= 10
      }

      if (action === ACTION_COMMAND.BACK_VIDEO_BY_TIME) {
        video.currentTime -= payload.seconds
      }

      if (action === ACTION_COMMAND.RESTART_VIDEO) {
        video.currentTime = 0
      }

      if (action === ACTION_COMMAND.PAUSE_VIDEO) {
        video.pause()
      }

      if (action === ACTION_COMMAND.PLAY_VIDEO) {
        video.play()
      }

      if (action === ACTION_COMMAND.INCREASE_VOLUME) {
        video.volume += 0.2
      }

      if (action === ACTION_COMMAND.DECREASE_VOLUME) {
        video.volume -= 0.2
      }

      if (action === ACTION_COMMAND.MUTE) {
        video.volume = 0
      }

      if (action === ACTION_COMMAND.MAX_VOLUME) {
        video.volume = 1
      }
    }
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}

video {
  border: 2px solid #ccc;
  border-radius: 10px;
}
</style>
