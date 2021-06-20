const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');


const client = require('nekos.life');
const neko = new client();


module.exports = async (client, message, args) => { 
 

 async function work() {
        let owo = (await neko.sfw.wallpaper());

        const wallpaper = new Discord.MessageEmbed()
        .setTitle("Generador de Wallpapers")
        .setImage(owo.url)
        .setColor(`WHITE`)
        .setURL(owo.url);
        message.channel.send(wallpaper);

}

      work();

}