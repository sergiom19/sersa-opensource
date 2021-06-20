const Discord = require("discord.js");
const mongoose = require("mongoose");

const staff = require("../../configFiles/config.json");
const errors = require("../../configFiles/errors.js");

const pe = require("../../models/prefix");

module.exports = async (client, message, args) => {
  if (!staff.staff.includes(message.author.id)) return errors.noDev(message);

  const embed = new Discord.MessageEmbed().setTitle("Evaluando código...");
  const msg = await message.channel.send(embed);
  try {
    const inputbro = args.join(" ").replace(/```/g, "");

    const data = eval(args.join(" ").replace(/```/g, ""));
    const dataa = await data;
    const embed = new Discord.MessageEmbed()
       .addField(":inbox_tray: Entrada", `\`\`\`${inputbro}\`\`\``)
      .addField(":outbox_tray: Salida ", `\`\`\`${dataa}\`\`\``)
    await msg.edit(embed);
    await msg.react("✅");
    await msg.react("❌");
    const filter = (reaction, user) =>
      (reaction.emoji.name === "❌" || reaction.emoji.name === "✅") &&
      user.id === message.author.id;
    msg.awaitReactions(filter, { max: 1 }).then((collected) => {
      collected.map((emoji) => {
        switch (emoji._emoji.name) {
          case "✅":
            msg.reactions.removeAll();
            break;
          case "❌":
            msg.delete();
            break;
        }
      });
    });
  } catch (e) {
    const embed = new Discord.MessageEmbed().setTitle("Ha ocurrido un error");
    return await msg.edit(embed);
  }
};
