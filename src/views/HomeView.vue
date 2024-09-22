<template>
  <main>
    <video ref="videoPlayer" width="600" controls>
      <source src="@/assets/videos/video.mp4" type="video/mp4" />
      Tu navegador no soporta la reproducción de videos.
    </video>
    <ListenerGlobal @commandDetected="command" @triggerCommand="trigger">
      <Listener v-if="isEnabledListener" />
    </ListenerGlobal>
  </main>
</template>

<script>
import Listener from '@/components/Listener.vue'
import ListenerGlobal from '@/components/ListenerGlobal.vue'

const TRIGGER = {
  LISTENER: 'listener',
  STOP: 'stop'
}

const COMMAND = {
  AVANZA: 'avanza',
  RETROCEDE: 'retrocede',
  REINICIO: 'reinicio',
  PAUSA: 'pausa',
  REPRODUCE: 'reproduce',
  SUBIR_VOLUMEN: 'subir_volumen',
  BAJAR_VOLUMEN: 'bajar_volumen'
}

// Diccionario de comandos similares
const COMMAND_ALIASES = {
  'avanza el video': COMMAND.AVANZA,
  adelanta: COMMAND.AVANZA,
  'retrocede el video': COMMAND.RETROCEDE,
  atrás: COMMAND.RETROCEDE,
  reiniciar: COMMAND.REINICIO,
  pausar: COMMAND.PAUSA,
  reproducir: COMMAND.REPRODUCE,
  'subir sonido': COMMAND.SUBIR_VOLUMEN,
  'bajar sonido': COMMAND.BAJAR_VOLUMEN
}

export default {
  components: {
    Listener,
    ListenerGlobal
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
    command(data) {
      console.log('Comando detectado:', data)

      // Convertir el comando a minúsculas y verificar alias
      let normalizedCommand = data.toLowerCase().trim()


      if (
        normalizedCommand.startsWith('subir volumen') ||
        normalizedCommand.startsWith('bajar volumen')
      ) {
        // replace subi volumn to subir_volumen
        normalizedCommand = normalizedCommand.replace(' volumen', '_volumen')
      }
      console.log({ normalizedCommand })

      const [command, ...args] = this.getCommand(normalizedCommand).split(' ')

      console.log({ command })
      // Validar el comando reconocido
      if (!Object.values(COMMAND).includes(command)) {
        console.log('Comando no válido:', command)
        return
      }

      // Obtener referencia del video
      const video = this.$refs.videoPlayer

      // Manejo centralizado de comandos
      switch (command) {
        case COMMAND.AVANZA:
          this.adjustVideoTime(video, args, 'forward')
          break
        case COMMAND.RETROCEDE:
          this.adjustVideoTime(video, args, 'backward')
          break
        case COMMAND.REINICIO:
          video.currentTime = 0
          console.log('El video se ha reiniciado')
          break
        case COMMAND.PAUSA:
          video.pause()
          console.log('El video se ha pausado')
          break
        case COMMAND.REPRODUCE:
          video
            .play()
            .then(() => console.log('El video se está reproduciendo'))
            .catch((error) => console.error('Error al reproducir el video:', error))
          break
        case COMMAND.SUBIR_VOLUMEN:
          this.adjustVolume(video, 0.2) // Subir volumen en 10%
          break
        case COMMAND.BAJAR_VOLUMEN:
          this.adjustVolume(video, -0.2) // Bajar volumen en 10%
          break
      }
    },
    getCommand(input) {
      // Busca en el diccionario de alias, si no existe, devuelve el input original
      return COMMAND_ALIASES[input] || input
    },
    adjustVideoTime(video, args, direction) {
      const [time = '10', unit = 's'] = args // Valores por defecto de 10 segundos

      const parsedTime = parseInt(time)

      if (isNaN(parsedTime) || parsedTime <= 0) {
        console.log('Tiempo no válido:', time)
        return
      }

      const multiplier = unit.startsWith('m') ? 60 : 1 // Convertir a segundos si la unidad es minutos
      const offset = parsedTime * multiplier * (direction === 'forward' ? 1 : -1)

      video.currentTime += offset
      console.log(
        `El video se moverá ${direction === 'forward' ? 'adelante' : 'atrás'} ${parsedTime} ${unit.startsWith('m') ? 'minutos' : 'segundos'}`
      )
    },
    adjustVolume(video, change) {
      let newVolume = video.volume + change
      newVolume = Math.min(Math.max(newVolume, 0), 1) // Limitar entre 0 y 1
      video.volume = newVolume
      console.log(`El volumen se ha ajustado a ${Math.round(newVolume * 100)}%`)
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
