const { Message } = require("discord.js");
const Discord = require("discord.js");

const mongoose = require("mongoose");

const staff = require("../../configFiles/config.json");
const errors = require("../../configFiles/errors.js");

module.exports = async (client, message, args) => {


	if (!message.member.hasPermission("ADMINISTRATOR")) {
		return errors.noPerms(message, "ADMINISTRATOR")
	}

  const prefixSchema = require("../../models/prefix");

  const res = args[0];
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
};
