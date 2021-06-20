module.exports = async (client, message) =>{ 


  if (message.channel.type === "dm") return;

  const PrefixSchema = require('../models/prefix.js');
  const modelo = await PrefixSchema.findOne({ Guild: message.guild.id });

  const prefix = modelo ? modelo.prefix : 'c!';

  
  if(message.author.bot) return;
 const Mention = new RegExp(`^<@!?${client.user.id}>( |)$`)
 if(message.content.match(Mention)) { //miro 0.0
     message.channel.send(`> Mi prefix en este servidor. es **${prefix}**.\nPara comenzar usa \`${prefix}help\`.`)
 }
 //no tranqui mira //pusiste una s de mas donde puse una s de mas? //ya lo arregle mira dc

    /*if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '838116306191646791') return message.channel.send(`> Mi prefix en este servidor. es **${p}**.\nPara comenzar usa \`${p}help\`.`)
    }
*/
if(!message.content.startsWith(prefix)) return; 



  const args = message.content.slice(prefix.length).trim().split(/ +/g);  
  const command = args.shift().toLowerCase()


  let cmd = client.comandos.get(command); 
  if(!cmd) return; 
  
  cmd(client, message, args);
  

}