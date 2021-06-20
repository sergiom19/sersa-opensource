module.exports = async (client, message, args) => { 

     const Discord = require('discord.js')
     const staff = require('../../configFiles/config.json')
      const errors = require('../../configFiles/errors.js');
    const { MessageEmbed } = require("discord.js");
    const { MessageButton } = require('discord-buttons');
    
   


 if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
    return errors.botPerms(message, "MANAGE_ROLES")
}

if (!staff.staff.includes(message.author.id)) return errors.noDev(message);
    
    const embed = new Discord.MessageEmbed()
    .setTitle('Verificación del Discord')
    .setDescription('Haz click en el botón de abajo para tener __acceso completo__ al servidor de discord. ✅')
    .setFooter('Sersa siempre contigo.', client.user.displayAvatarURL({ dynamic: true }))
    .setColor('#ffffff')
    .setImage('https://media.discordapp.net/attachments/842779796114505738/852847550465179688/verificacion_de_discord.png')
    

   const verify = new MessageButton()
    .setStyle("blurple")
    .setLabel("Verifícate")
    .setID("verify")
    .setEmoji('✅')

    message.channel.send({component: verify, embed: embed});
}