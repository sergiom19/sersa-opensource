const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

const logsSchema = require('../../models/sancioneslogs')

module.exports = async (client, message, args) => {
    const {MessageAttachment} = require('discord.js')
    const Canvas = require('canvas')
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author //necesitaremos un usuario para poner su avatar en la simp card.
    
    let avatar = user.displayAvatarURL({ dynamic: false, format: 'png', size: 128}) // conseguiremos el avatar del usuario.
    
    const canvas = Canvas.createCanvas(318, 192) // creamos un canvas de 318 x 192 para que la imagen quede perfecta en el canvas
    const ctx = canvas.getContext('2d') // el contexto
    
    const bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/750461925099307129/751872081175511050/IMG_20200905_133034_358.JPG') // cargamos la imagen de la simpcard, la puedes descargar si quieres
    
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height) // dibujamos la imagen en todo el canvas.
    
    ctx.beginPath() // empezamos un path para hacer un circulo
    ctx.arc(70, 75, 50, 0, Math.PI * 2) //hacemos el circulo
    ctx.fillStyle = '#ffffff' // haremos que el circulo tenga un fondo blanco
    ctx.fill() //rellenamos el circulo
    ctx.stroke() // dibujamos el circulo en si.
    ctx.closePath() // cerramos el path
    ctx.clip() // y le hacemos clip para que lo que quede dentro del circulo se corte si sale de este.
    
    let imagen = await Canvas.loadImage(avatar) // cargamos el avatar de la persona.
    ctx.drawImage(imagen, 20, 23.5, 100, 100) // y se dibuja el avatar en la zona del circulo
    
    let att = new MessageAttachment(canvas.toBuffer(), 'simp.png') // creamos el attachment como siempre
    message.channel.send(att)
    

}