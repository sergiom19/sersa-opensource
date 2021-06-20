const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

const pe = require("../../models/prefix")


module.exports = async (client, message, args) => {

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
		 errors.botPerms(message, "MANAGE_MESSAGES") }

	

const p = await pe.findOne({ Guild: message.guild.id })

const prefix = p ? p.prefix : 'c!'
console.log(prefix)

const embedCargando = new Discord.MessageEmbed()
.setTitle('Ayuda de Sersa')
.setDescription('Cargando reacciones...')
.setColor('GRAY')
.setFooter(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))

const embedPrincipal = new Discord.MessageEmbed()
.setTitle('🏠 | Ayuda de Sersa')
.setDescription(`**¡Hola! Este es un menú interactivo, reacciona abajo para guiarte por categorías.**\nEn este servidor mi prefix es \`${prefix}\`.\n\n\`\`🏠 - Inicio\`\`\n\`\`🛠 - Configuración\`\`\n\`\`🚔 - Moderación\`\`\n\`\`😃 - Diversión\`\`\n\`\`📘 - Información\`\`\n\`\`🖼 - Imágenes\`\`\n\`\`⭐ - Sobre Mí\`\``)
.setColor('WHITE')
.setFooter(`Sersa`, client.user.displayAvatarURL({ dynamic: true }))

const embedConfig = new Discord.MessageEmbed()
.setTitle('🛠 | Ayuda de Sersa')
.setDescription(`**Zona de Configuración**\nAquí encontraras todos los comandos de configuración que actualmente dispongo.\n\n\`${prefix}blockchat\` - \`Bloquea un canal.\`\n\`${prefix}setlogs\` - \`Establece los canales de registro.\`\n\`${prefix}setprefix\` - \`Establece mi nuevo prefix.\``)
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí')

const embedMod = new Discord.MessageEmbed()
.setTitle('🚔 | Ayuda de Sersa')
.setDescription(`**Zona de Moderación**\nAquí encontraras todos los comandos de moderación que actualmente dispongo.\n\n\`${prefix}clear\` - \`Elimina los mensajes de un canal.\`\n\`${prefix}tempban\` - \`Prohibe a un usuario del servidor.\`\n\`${prefix}warn\` - \`Da una advertencia a un usuario\`\n\`${prefix}warnlist\` - \`Lista de advertencias de un usuario\`\n\`${prefix}limpiarwarn\` - \`Limpia todos los warns de un usuario\`\n\`${prefix}eliminarwarn\` - \`Elimina el último warn de un usuario\``)
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí')

const embedFun = new Discord.MessageEmbed()
.setTitle('😃 | Ayuda de Sersa')
.setDescription(`**Toda Diversión tiene su límite, ¡PERO NO LA NUESTRA!**\nAquí encontraras todos los comandos para divertirte que actualmente dispongo.\n\n\`${prefix}petpet\` - \`Usa a cualquiera como una mascota.\`\n\`${prefix}youtube\` - \`Entra a un canal de voz y disfruta viendo Youtube con tus amigos.\`\n\`${prefix}amistad\` - \`Averigua la amistad de un usuario y tú.\``)
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí')

const embedInfo = new Discord.MessageEmbed()
.setTitle('📘 | Ayuda de Sersa')
.setDescription(`**Todo sabio se necesita informar, ¡Bienvenido a la información del servidor.!**\nAquí encontraras los comandos que uno debe usar para informarse dentro del servidor.\n\n\`${prefix}userinfo\` - \`Lee información de un usuario.\`\n\`${prefix}avatar\` - \`Mira el avatar de un usuario.\`\n\`${prefix}ping\` - \`Mi ping.\`\n\`${prefix}botstats\` - \`Mira mi información (Comando Inactivo).\``)
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí')

const embedImg = new Discord.MessageEmbed()
.setTitle('🖼 | Ayuda de Sersa')
.setDescription(`**Zona de Imágenes**\nTodos los comandos disponibles para ver y usar imágenes.\n\n\`${prefix}wallpaper\` - \`Muestra un wallpaper random.\`\n\`${prefix}simpmode\` - \`Carnet de simp, jája.\``)
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí')


const moment = require("moment");
require('moment-duration-format');
const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");

const embedMio = new Discord.MessageEmbed()
.setTitle('⭐ | Ayuda de Sersa')
.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`**Todo sobre mí**\nVeo que te interesa saber mas sobre mi...`)
.addField('Hosting:', '`VPS Azure`', true)
//.addField('RAM:', 'VPS Azure', true)
//.addField('CPU:', 'VPS Azure', true)
.addField('<:sergio_discordjs:855938750830739486> Librería:', `\`Discord.js v12 (${Discord.version})\``, true)
.addField('<:sergio_js:855938751129190440> NodeJS', `${process.versions.node}`, true)
.addField('<a:activo_sergio:855937154076508180> Uptime:', `\`${actividad}\``, true)
.addField('<:segio_miembros:855937674002300939> Usuarios:', `${client.users.cache.size}`, true)
.addField(`<:sergio_canal_texto:855937672116043816> Canales:`, `${client.channels.cache.size}`, true)
.addField(`<:sergio_ajustes:855937669615452171> Servidores:`, `${client.guilds.cache.size}`, true)
.addField('<:sergio_link:855937674211491860> Links', [
  '[Discord Server](https://discord.gg/FbWAa8qaqm)',
  '[Invítame a tu servidor!](https://discord.com/oauth2/authorize?client_id=838116306191646791&scope=bot&permissions=8589934591)'
])
//.addField('¡Vótame!')
.setColor('WHITE')
.setFooter('🏠 - Inicio | 🛠 - Configuración | 🚔 - Moderación | 😃 - Diversión\n📘 - Información | 🖼 - Imágenes | ⭐ - Sobre Mí\nHecho con cariño por twenifive#1111 <3')

message.channel.send(embedPrincipal).then(msg => {
  msg.react('🏠')
  msg.react('🛠')
  msg.react('🚔')
  msg.react('😃')
  msg.react('📘')
  msg.react('🖼')
  msg.react('⭐')

  msg.awaitReactions((reaction,user) =>{
    if (message.author.id !== user.id || user.bot) return;
    if(reaction.emoji.name === '🏠'){
        reaction.users.remove(user.id)
        msg.edit(embedPrincipal)
    }
    if(reaction.emoji.name === '🛠'){
        reaction.users.remove(user.id)
       msg.edit(embedConfig)
    }
    if(reaction.emoji.name === '🚔'){
        reaction.users.remove(user.id)
        msg.edit(embedMod)
    }
    if(reaction.emoji.name === '😃'){
        reaction.users.remove(user.id)
       msg.edit(embedFun)
    }
    if(reaction.emoji.name === '📘'){
        reaction.users.remove(user.id)
       msg.edit(embedInfo)
    }
    if(reaction.emoji.name === '🖼'){
      reaction.users.remove(user.id)
     msg.edit(embedImg)
  }
  if(reaction.emoji.name === '⭐'){
    reaction.users.remove(user.id)
   msg.edit(embedMio)
}
 })
})







}