<template>
    <slot></slot>
</template>
<script>
export default {
    name: 'ListenerGlobal',
    data() {
        return {
            isListeningForCommand: false, // Bandera para saber si está en modo escucha de comandos
            commandRecognition: null // Para almacenar el reconocimiento para comandos
        }
    },
    mounted() {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        // Verificar si SpeechRecognition está disponible en el navegador
        if (!speechRecognition) {
            console.error('SpeechRecognition no es compatible con este navegador.')
            return
        }

        this.recognition = new speechRecognition()
        this.recognition.continuous = true // Mantener la escucha continua
        this.recognition.interimResults = false // Solo resultados finales
        this.recognition.lang = 'es-ES' // Establecer el idioma a español

        this.commandRecognition = new speechRecognition()
        this.commandRecognition.continuous = false // Solo escucha una vez el comando
        this.commandRecognition.interimResults = false // Solo resultados finales
        this.commandRecognition.lang = 'es-ES' // Establecer el idioma a español

        // Función para iniciar el reconocimiento del "ok google"
        const startRecognition = () => {
            this.recognition.start()
            //   this.$emit('triggerCommand', 'listener')
        }

        this.recognition.onresult = (event) => {
            const current = event.resultIndex
            const transcript = event.results[current][0].transcript.trim().toLowerCase()

            // Detectar "ok google" y cambiar a modo escucha de comando
            if (transcript.includes('ok google') && !this.isListeningForCommand) {
                console.log('Activación detectada:', transcript)
                this.$emit('triggerCommand', 'listener')
                this.isListeningForCommand = true
                this.recognition.stop()

                // Iniciar reconocimiento de comando después de detectar "ok google"
                setTimeout(() => {
                    this.listenForCommand()
                }, 500) // Pequeña pausa antes de iniciar escucha de comando
            }
        }

        this.recognition.onerror = (event) => {
            console.error('Error en el reconocimiento de voz:', event.error)

            // Reiniciar reconocimiento en caso de errores no graves
            if (event.error !== 'no-speech' && event.error !== 'not-allowed') {
                this.recognition.stop() // Detener antes de reiniciar
                startRecognition()
            }
        }

        this.recognition.onend = () => {
            if (!this.isListeningForCommand) {
                // Reiniciar reconocimiento automáticamente al finalizar si no está escuchando comando
                startRecognition()
            }
        }

        // Iniciar reconocimiento de activación
        startRecognition()
    },
    beforeUnmount() {
        this.recognition.stop()
        this.commandRecognition.stop()
        this.recognition.onend = null
        this.commandRecognition.onend = null
    },
    methods: {
        // Función para escuchar el comando después de "ok google"
        listenForCommand() {
            this.commandRecognition.start()

            this.commandRecognition.onresult = (event) => {
                const current = event.resultIndex
                const transcript = event.results[current][0].transcript.trim().toLowerCase()

                this.$emit('commandDetected', transcript) // Emitir el comando detectado
                this.$emit('triggerCommand', 'stop') // Emitir que finalizó la escucha
                this.isListeningForCommand = false
                this.commandRecognition.stop()

                // Reiniciar escucha de activación después de escuchar el comando
                setTimeout(() => {
                    this.recognition.start()
                }, 500) // Pausa antes de reiniciar la escucha de activación
            }

            this.commandRecognition.onend = () => {
                if (this.isListeningForCommand) {
                    // Si se detiene sin recibir comando, reiniciar
                    this.listenForCommand()
                }
            }
        }
    }
}
</script>
