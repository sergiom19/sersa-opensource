const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

//SCHEMAS -----------------------------------------------

const ticketSchema = require('../../models/ticketSystem.js');
const prefixSchema = require('../../models/prefix.js');
const logsSchema = require('../../models/logs');
const sancionesSchema = require('../../models/sancioneslogs');

//SCHEMAS -----------------------------------------------

module.exports = async (client, message, args) => {

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        return errors.botPerms(message, "MANAGE_CHANNELS")
    }

    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return errors.noPerms(message, "MANAGE_CHANNELS")
    }

    if (!args[0]) {

        //SACAR PREFIX
        const p = await prefixSchema.findOne({ Guild: message.guild.id })
        const prefix = p ? p.prefix : 'c!'

        //SACAR CANALES DE LOGS
        const logs = await logsSchema.findOne({ Servidor: message.guild.id })
        const logscanal = logs ? `<#${logs.Canal}>` : 'Ninguno'


        //SACAR LOGS DE SANCIONES
        const sanciones = await sancionesSchema.findOne({ Servidor: message.guild.id })
        const logssanciones = sanciones ? `<#${sanciones.Canal}>` : 'Ninguno'

        //SACAR CANALES DE TICKETS
        const ticketss = await ticketSchema.findOne({ Servidor: message.guild.id })
        const ticket = ticketss ? `<#${ticketss.Canal}>` : 'Ninguno'


        const configserver = new Discord.MessageEmbed()
            .setTitle(`Configuración de ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('PREFIX', `**${prefix}**`)
            .addField('Registros', `**${logscanal}**`)
            .addField('Sanciones', `**${logssanciones}**`)
            .addField('Tickets', `**${ticket}**`)

        const nifoserver = new Discord.MessageEmbed()
            .setTitle('Guia de comandos de configuración')
            .setDescription('Algunos comandos estan todavía desarrollandose.')
            .addField('Configuracion de los canales de registros', [
                `\`${prefix}setlogs [registros | sanciones] <#canal>\``
            ])
            .addField('Configuración del Prefix', `\`${prefix}setprefix <NUEVO PREFIX>\``)
            .addField('[BETA] Configuración del sistema de Tickets', [
                `\`${prefix}config ticket colocar canal <#canal>\``,
                `\`${prefix}config ticket colocar categoria <IDCategoria>\``
            ])


        message.channel.send(configserver).then(msg => {
            msg.react('🔩')
            msg.react('ℹ')
            msg.awaitReactions((reaction, user) => {
                if (message.author.id !== user.id || user.bot) return;
                if (reaction.emoji.name === '🔩') {
                    reaction.users.remove(user.id)
                    msg.edit(configserver)
                }
                if (reaction.emoji.name === 'ℹ') {
                    reaction.users.remove(user.id)
                    msg.edit(nifoserver)


                }
            })
        })

    }

    //TICKET SYSTEM -----------------------------------------------------

    // if (args[0] === 'ticket') {
    //     if(!args[1]) return message.channel.send(`<@${message.author.id}>, para configurar la sección de tickets usa estos parámeros: \`config ticket colocar\`.`)

    //     if (args[1] === 'colocar') {

    //         if(!args[2]) return message.channel.send(`<@${message.author.id}>, para configurar la sección de tickets usa estos parámeros: \`config ticket colocar [categoria | canal]\`.`)

    //         if (args[2] === 'categoria') {
    //             let ticket_categoria = await ticketSchema.findOne({ Servidor: message.guild.id }).exec()

    //             let categoria = args[3];

    //             if (ticket_categoria) {
    //                 await ticketSchema.updateOne({ Servidor: message.guild.id, Categoria: categoria })
    //                 message.channel.send(`Has actualizado la categoría de Tickets en <#${categoria}>`)
    //             } else {
    //                 let categoria2 = new ticketSchema({ Servidor: message.guild.id, Categoria: categoria }) //si no hay uno existente
    //                 await categoria2.save()
    //                 message.channel.send(`Has establecido la categoría de Tickets en <#${categoria}>`)
    //             }


    //         }

    //         if (args[2] === 'canal') {

    //             let ticket_canal = await ticketSchema.findOne({ Servidor: message.guild.id }).exec()

    //             let res = message.mentions.channels.first();

    //             if(res.type !== "text") return message.channel.send('Menciona un canal para el sistema de tickets')

    //             if (ticket_canal) {
    //                 await ticketSchema.updateOne({ Servidor: message.guild.id, Canal: res.id })
    //                 message.channel.send(`Has actualizado el canal de Tickets en ${res}`)
    //             } else {
    //                 let canalticket2 = new ticketSchema({ Servidor: message.guild.id, Canal: res.id }) //si no hay uno existente
    //                 await canalticket2.save()
    //                 message.channel.send(`Has establecido el canal de Tickets en ${res}`)
    //             }

    //         }

    //         if(args[2] === 'transcript') {


    //         }

    //     }

    // -----------------------------------------------

    if (args[0] === 'prefix') {

        if (args[1] === 'colocar') {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return errors.noPerms(message, "ADMINISTRATOR")
            }

            const prefixSchema = require("../../models/prefix");

            const res = args[2];
            if (!res) return message.channel.send("Coloca el nuevo prefijo");

            let modelo = await prefixSchema.findOne({ Guild: message.guild.id });

            let dt = new prefixSchema({ Guild: message.guild.id, prefix: res });

            modelo
                ? await prefixSchema.updateOne(
                    { Guild: message.guild.id },
                    { prefix: res }
                )
                : await dt.save();

            message.channel.send(`Mi nuevo prefijo ahora es ${res}`);

        }

        if (args[1] === 'reiniciar') {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return errors.noPerms(message, "ADMINISTRATOR")
            }



            const prefixSchema = require("../../models/prefix");

            const p = await prefixSchema.findOne({ Guild: message.guild.id })
            const prefix = p ? p.prefix : 'c!'

            if(!prefix) return message.channel.send('No puedes reinicar el prefix porque no ahi nada para reinicar.')

            const embedprefix = new Discord.MessageEmbed()
                .setTitle(`¿Está seguro que desea eliminar el prefijo de este servidor?`)
                .setDescription(`El prefix actual de este servidor es: **${prefix}**\n\nSi elimina el prefix actual lo podrá volver a recuperar en cualquier momento.`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor('#ed3528')

            const lasprefix = new Discord.MessageEmbed()
            .setTitle(`El reinicio del prefix se ha cancelado.`)
            .setColor('RED')


            const nuevoprefix = new Discord.MessageEmbed()
                .setTitle('El prefix se ha eliminado.')
                .setDescription(`El prefix se ha reestablecido a **c!**.`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setColor('BLUE')

            const { confirmation } = require('@reconlx/discord.js')

            message.channel.send(embedprefix).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
                if(emoji === '✅') {
                    msg.delete()
                    await prefixSchema.deleteOne({ Guild : message.guild.id })
                    message.channel.send(nuevoprefix)
                }
                if(emoji === '❌') {
                    msg.delete()
                    message.channel.send(lastprefix)
                }
            })
    


        }

    }

}