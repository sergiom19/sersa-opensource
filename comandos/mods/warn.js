const Discord = require('discord.js')
const db = require('../../models/ModSchema')

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send('Miembro no encontrado.')
    let reason = args.slice(1).join(" ")
    if (!reason) reason = 'Sin razón';
    db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
        if (err) throw err;
        if (!data) {
            data = new db({
                guildid: message.guild.id,
                user: user.user.id,
                content: [
                    {
                        moderator: message.author.id,
                        reason: reason
                    }
                ]
            })
        } else {
            const obj = {
                moderator: message.author.id,
                reason: reason
            }
            data.content.push(obj)
        }
        data.save()
    });
    user.send(new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`Has sido advertido por \`${reason}\``)
        .setTimestamp()
        .setColor("RED")
    )
    message.channel.send(`> Se ha advertido a ${user} por \`${reason}\``)


}