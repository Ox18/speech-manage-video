import { ACTION_COMMAND } from '@/shared/consts/actions.const'
import { CUSTOM_COMMANDS } from '@/shared/consts/commandsPersonality.const'

export const googleCommandVideo = (command) => {
  let action = null

  for (let i = 0; i < CUSTOM_COMMANDS.length; i++) {
    const { commands, action: actionName, isRegex } = CUSTOM_COMMANDS[i]
    if (isRegex) {
      for (let j = 0; j < commands.length; j++) {
        const commandRegex = commands[j]
        const match = command.match(commandRegex)
        if (match) {
          action = actionName
          break
        }
      }
    } else {
      if (commands.includes(command)) {
        action = actionName
        break
      }
    }
  }

  if (!action) {
    return null
  }

  if ([ACTION_COMMAND.ADVANCE_VIDEO_BY_TIME, ACTION_COMMAND.BACK_VIDEO_BY_TIME].includes(action)) {
    const [, time = 10, timeToAdvance = 'segundos'] = command.trim().split(' ')

    const seconds = timeToAdvance === 'segundos' ? parseInt(time) : parseInt(time) * 60
    return { action, payload: { seconds } }
  }

  return { action }
}
