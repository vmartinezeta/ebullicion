/*Autor: Víctor Martínez*/

class Burbuja {
    constructor(x, y, radio) {
        this.x = x
        this.x0 = x
        this.y = y
        this.y0 = y
        this.radio = radio
        this.r0 = radio
        this.vaiven = 4
    }

    moveUp() {
        this.x = this.x - this.vaiven / 2 + Math.random() * this.vaiven
        this.y = this.y - 1
        this.radio = this.radio - 0.04
        if (this.radio < 0) {
            this.reset()
        }
    }

    reset() {
        this.x = this.x0
        this.y = this.y0
        this.radio = this.r0
    }

}



class Ebullicion {
    constructor(capa, largo, altura) {
        this.capa = capa
        this.largo = largo
        this.altura = altura
        this.burbujas = []
        this.nivelAgua = 30
        this.burbujaHueca = false
        this.color = "#0162f782"
        this.ciclo = 0
        this.total = 50
        this.timer = 0
        this.margenX = 10
        this.minRadio = 5
        this.maxRadio = 10
    }

    play() {
        this.createBurbuja(20)
        requestAnimationFrame(this.drawAll.bind(this))
    }

    createBurbuja(cantidadMax) {
        this.burbujas = []
        const margenX = 100 - 2 * this.margenX
        while (this.burbujas.length < cantidadMax) {
            const x = Math.random() * margenX * this.largo / 100 + this.margenX * this.largo / 100
            const y = Math.random() * 30 + this.altura - (this.altura - 100) * this.nivelAgua / 100
            const radio = this.minRadio + Math.random() * (this.maxRadio - this.minRadio)
            this.burbujas.push(new Burbuja(x, y, radio))
        }
    }

    drawAll() {
        this.clearCapa()

        this.drawRecipiente()

        this.burbujas.forEach(b => this.drawBurbuja(b))

        this.crearFrame()

        requestAnimationFrame(this.drawAll.bind(this))
    }

    clearCapa() {
        this.capa.clearRect(0, 0, this.largo, this.altura)
        this.capa.fillStyle = this.color
        this.capa.strokeStyle = this.color
    }

    drawRecipiente() {
        this.capa.beginPath()
        this.capa.moveTo(this.largo, this.altura - (this.altura - 100) * this.nivelAgua / 100 - this.total)
        this.capa.lineTo(this.largo, this.altura)
        this.capa.lineTo(0, this.altura)
        this.capa.lineTo(0, this.altura - (this.altura - 100) * this.nivelAgua / 100 - this.total)

        const curva = (this.total * Math.sin(this.ciclo / this.total))

        this.capa.bezierCurveTo((this.largo / 3),
            this.altura - (this.altura - 100) * this.nivelAgua / 100 - this.total - curva,
            (2 * this.largo / 3),
            this.altura - (this.altura - 100) * this.nivelAgua / 100 - this.total + curva,
            this.largo,
            this.altura - (this.altura - 100) * this.nivelAgua / 100 - this.total)

        this.capa.fill()
    }

    drawBurbuja(b) {
        this.capa.beginPath()
        this.capa.arc(b.x, b.y, b.radio, 0, 2 * Math.PI)
        if (this.burbujaHueca) {
            this.capa.stroke()
        } else {
            this.capa.fill()
        }
    }

    crearFrame() {
        this.ciclo++
        const ciclo = 2 * Math.PI
        if (this.ciclo > this.total * ciclo) {
            this.ciclo = 0
        }

        this.burbujas.forEach(b => b.moveUp())
    }

}



const capa = canvas.getContext("2d")
const altura = canvas.height = 460
const largo = canvas.width = 800
const animation = new Ebullicion(capa, largo, altura)
animation.play()