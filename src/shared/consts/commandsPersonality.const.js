import { ACTION_COMMAND } from '@/shared/consts/actions.const'

export const CUSTOM_COMMANDS = [
  {
    commands: ['avanza', 'adelanta', 'siguiente'],
    action: ACTION_COMMAND.ADVANCE_VIDEO_BY_DEFAULT
  },
  {
    isRegex: true,
    commands: [
      /avanza (\d+) segundos/,
      /avanza (\d+) minutos/,
      /adelanta (\d+) minutos/,
      /adelanta (\d+) segundos/
    ],
    action: ACTION_COMMAND.ADVANCE_VIDEO_BY_TIME
  },
  {
    commands: ['retrocede', 'atras', 'anterior'],
    action: ACTION_COMMAND.BACK_VIDEO_BY_DEFAULT
  },
  {
    isRegex: true,
    commands: [
      /retrocede (\d+) segundos/,
      /atras (\d+) minutos/,
      /atras (\d+) segundos/,
      /anterior (\d+) minutos/
    ],
    action: ACTION_COMMAND.BACK_VIDEO_BY_TIME
  },
  {
    commands: ['reiniciar', 'reinicia', 'reinicio', 'reiniciar video'],
    action: ACTION_COMMAND.RESTART_VIDEO
  },
  {
    commands: ['pausar', 'pausa', 'parar'],
    action: ACTION_COMMAND.PAUSE_VIDEO
  },
  {
    commands: ['reproducir', 'reproduce', 'play'],
    action: ACTION_COMMAND.PLAY_VIDEO
  },
  {
    commands: ['subir volumen', 'subir sonido', 'aumentar volumen'],
    action: ACTION_COMMAND.INCREASE_VOLUME
  },
  {
    commands: ['bajar volumen', 'bajar sonido', 'disminuir volumen'],
    action: ACTION_COMMAND.DECREASE_VOLUME
  },
  {
    commands: ['bajar todo el volumen', 'silenciar', 'silencio'],
    action: ACTION_COMMAND.MUTE
  },
  {
    commands: ['subir todo el volumen', 'maximo volumen', 'volumen maximo'],
    action: ACTION_COMMAND.MAX_VOLUME
  }
]
