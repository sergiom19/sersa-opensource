const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

const pe = require("../../models/prefix")


module.exports = async (client, message, args) => { 

    if (message.author.id !== '837946272853000192') {
        return;
    }
    await message.channel.send(`Reinicando bot...`)
    process.exit();

}