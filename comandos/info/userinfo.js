const Discord = require('discord.js')


const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async (client, message, args) => { 
        

let estados = {
        "online": "🟢 En Línea",
        "idle": "🟠 Ausente",
        "dnd": "🔴 No molestar",
        "offline": "⚫️ Desconectado/invisible"
      };

      const member = message.mentions.members.first() || message.member

      function formatDate (template, date) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
        return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
          return template.split(specs[i]).join(item)
        }, template)
      }

      let badges1 = {
        
        'EARLY_SUPPORTER': '<:Earlysupporter:746029762274656317>',
        'DISCORD_EMPLOYEE': '<:Discordstaff:746029762513862666>',
        'DISCORD_PARTNER': '<:Discordpartner:746029762564194355>',
        'HYPESQUAD_EVENTS': '<:HypesquadEvents:746029762497085550>',
        'HOUSE_BRAVERY': '<:Houseofbravery:746029762459467858>',
        'HOUSE_BRILLIANCE': '<:Houseofbrilliance:746029762610331668>',
        'BUGHUNTER_LEVEL_1': '<:Bughunter:746029762522120203>',
        'BUGHUNTER_LEVEL_2': '<:Goldbughunter:746029762526576691>',
        'VERIFIED_DEVELOPER': '<:VerifiedBotDeveloper:746029762194964590>',
        'HOUSE_BALANCE': '<:Houseofbalance:746029762610331658>',
        'VERIFIED_BOT': '<:verified:753442204541911081>',
      }

      let obj = {
        "HOUSE_BRAVERY" : "Bravery" , "VERIFIED_BOT" : "Bot verificado" , "VWERIFIED_DEVELOPER" : "Desarrollador de bots verificado" , "HOUSE_BRILLIANCE" : "Brilliance" , "DISCORD_PARTNER" : "Socio de discord"
        }

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM") //La misma mierda de siempre xD defines el color en random
        .setDescription("**INFORMACIÓN DEL USUARIO:**") //Defines la descripcion
        .addField("**🎫 Nombre**:", "**" + `${member.user.tag}` + "**")//Que envíe el tag del usuario
        .addField("**🎟 ID**:", `${member.user.id}` )//Id del usuario
        .addField("**📌 Apodo del usuario**:", `${member.nickname !== null ? `${member.nickname}` : 'Ninguno'}`, true) //Si tiene o no apodo el usuario dentro del servidor
        .addField("**🛎 Fecha de Entrada al Servidor:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.joinedAt))//La fecha de ingreso del usuario al servidor
        .addField("**📥 Cuenta Registrada:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.user.createdAt))//Cuando fue creada la cuenta
        .addField("**🏳️ Insignias:**", member.user.flags.toArray().length ? member.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "No tengo badges")//Lo que hemos definido antes las badges del usuario
        .addField("**🎮  Jugando a**:", member.user.presence.game != null ? user.presence.game.name : "Nada", true)//Si esta jugando a algo, que indique el juego
        .addField("**🎖 Roles:**", member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))//Los roles que posee dicho usuario(Si la cantidad de roles del usuario excede el numero de caracteres que soporta un field, dará un error de sintaxis a la consola, si es así encuentren una manera de hacerlo ustedes mismos)
        .addField("**🎨 Estado**:", "**" + estados[member.user.presence.status] + "**")//Estado del usuario
        .addField("**🚀 ¿Está boosteando?**:", member.premiumSince ? '**Estoy boosteando <a:boostingtop:755576533430698084>**' : '**No estoy boosteando**')//si esta o no boosteando el servidor
        .setThumbnail (member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 }))//y el avatar del usuario
        .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`)//nombre y avatar del usuario en el footer
     message.channel.send(embed)//enviamos el embed


    }