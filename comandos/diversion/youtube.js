const Discord = require('discord.js')
const mongoose = require("mongoose")

const fetch = require('node-fetch')

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async(client, message, args) => {

  const channel = message.member.voice.channel;
  if(!channel) return message.channel.send('Para usar este comando debes de estar en un canal de voz.')

  fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 0,
      target_application_id: "755600276941176913",
      target_type: 2,
      temporary: false,
      validate: null
    }),
    headers: {
      "Authorization": `Bot ${client.token}`,
      "Content-Type": "application/json"
     }
  }).then(res => res.json()).then(invite => {
    if(!invite.code) return message.channel.send("No puedo empezar un video juntos </3 :C")

    let embedyt = new Discord.MessageEmbed()
    .setDescription(`Dale click a este enlace para usar Youtube Together!\n [Ver Youtube Juntos <3](https://discord.com/invite/${invite.code})`)
    .setColor('RED')
    message.channel.send(embedyt)
  })

    }