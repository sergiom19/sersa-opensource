const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

const ticketSchema = require('../../models/ticketSystem.js')

module.exports = async (client, message, args) => {
    const ch = message.guild.channels.cache.find(ch => ch.name === `ticket-${message.author.id}`)
    if (ch) return message.channel.send('Ya tienes un ticket abierto.').then(m => m.delete({  timeout: 5000  }))
    message.guild.channels.create(`ticket-${message.author.id}`, {
        type: 'text',
        parent: '756890395392081985',
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
            }
        ]
    }).then(async channel => {
        message.reply(`Haz click en <#${channel.id}> para ver tu ticket.`).then(m => m.delete({  timeout: 5000   }))
        channel.send(`¡${message.author}, bienvenido al ticket!`)
    })

}