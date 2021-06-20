const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../configFiles/config.json')
const errors = require('../configFiles/errors.js');

module.exports = async(client, message, args) => {

const pe = require("../../models/prefix")
const p = await pe.findOne({ Guild: message.guild.id })

const inicio = new Discord.MessageEmbed()
    .setTitle('🏠 | !Hola!')
    .setDescription(`Esta es la sección de ayuda en \`${message.guild.name}\`\nMi prefix en este servidor es \`${p}\``)
    .setFooter(`Reacciones:
    🏠 = Inicio
    🛠 = Administradores
    📜 = Diversión
    🖼 = Imágenes
    🎟 = Tickets
    `)//Crea el embed 1, en este caso, el "index", osea, el indice
    const help_staff = new Discord.MessageEmbed()
    .setTitle(':shield: | Ayuda')
    .setDescription('Comandos STAFF')
    .addFields(
        {
            name: "Aqui", value: "Puedes meter tus Fields, tienen que ir como este"
        },
        {
            name: "si quieres poner otro", value: 'debes poner una "," entre los {}, como estan aqui'
        }
    )
    .setFooter(`Reacciones:
    🎮 = Comandos de STAFF
    📜 = Comandos de interacciones
    🌎 = Indice
    `)//Crea otro embed, siempre debes tener el Footer así, este será el embed de STAFF
    const help_inter = new Discord.MessageEmbed()
    .setTitle(':shield: | Ayuda')
    .setDescription('Comandos Interacciones')
    .addFields(
        {
            name: "Aqui", value: "Puedes meter tus Fields, tienen que ir como este"
        },
        {
            name: "si quieres poner otro", value: 'debes poner una "," entre los {}, como estan aqui'
        }
    )
    .setFooter(`Reacciones:
    🎮 = Comandos de STAFF
    📜 = Comandos de interacciones
    🌎 = Indice
    `)//Crea el tercer y ultimo embed, en este caso será el embed de Interacciones
//<-- CODIGO PRINCIPAL -->
    message.channel.send(indice).then(m => {//Envía el embed numero 1, que sería el Indice, al completar, ejecuta lo del "then"
        m.react('🎮')
        m.react('📜')
        m.react('🌎')//Reacciona con estos emojis
        m.awaitReactions((reaction, user) => {//Ejecuta la función awaitReactions, que sirve para esperar que el user reaccione
            const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));//define userReactions
            if(message.author.id !== user.id) return; //Si el que reaccionó no es el mismo que envio el mensaje lo ignora
     
            if(reaction.emoji.name === '🎮') { //Si la reaccion es este emoji
                try {
	                for (const reaction of userReactions.values()) {//Busca entre todas las reacciones del mensaje
		            reaction.users.remove(user.id);//La remueve
                }
            } catch(error) { console.error(error) }//Si hay errores lo envia a la consola
                m.edit(help_staff); //Edita el mensaje enviado a "help staff"
            }
            if(reaction.emoji.name === '📜') {//Si la reaccion es este emoji
                try {
	                for (const reaction of userReactions.values()) {
		            reaction.users.remove(user.id);//Remueve la reaccion
                }
            } catch(error) { console.error(error) }
                m.edit(help_inter); //Edita el mensaje a "help inter"
            }
            if(reaction.emoji.name === '🌎') { //Si la reaccion es este emoji
                try {
	                for (const reaction of userReactions.values()) {
		            reaction.users.remove(user.id); //Remueve la reaccion
                }
            } catch(error) { console.error(error) }
                m.edit(indice); //Edita el mensaje al indice
            }
        })
    })



    }