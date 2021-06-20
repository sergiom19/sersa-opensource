const Discord = require('discord.js')


const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async(client, message, args) => {

  const pet = require("pet-pet-gif") 
        
        let miembro = message.mentions.users.first() || message.author;

        let animatedGif = await pet(miembro.displayAvatarURL({format: "png"}))

        const petpet = new Discord.MessageAttachment(animatedGif, "petpet.gif") 
        
        message.channel.send(petpet) 
//TU CODIGO ESCRITO AAAAAAAAAA
    }