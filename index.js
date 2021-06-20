const Discord = require("discord.js");
const {Client,Intents} = require('discord.js')
const client = new Client({ ws: { intents: Intents.ALL } });

const config = require('./configFiles/config.json');

const mongoose = require('mongoose');
let { readdirSync, lstatSync } = require('fs');
var colors = require('colors');

const ms = require('ms');

require('dotenv').config();

let prefix = config.PREFIX;

mongoose.connect(process.env.mongodatabase, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log(colors.bold.green('[DATABASE] ¡Conectado a MongoDB!')))


const prefixSchema = require('./models/prefix')


client.prefix = async function(message) {
//         let custom;

         const data = await prefixSchema.findOne({ Guild : message.guild.id })

         const prefix = data ? data.prefix : 'c!'
//             .catch(err => console.log(err))
        
//         if(data) {
//             custom = data.Prefix;
//         } else {
//             custom = 'c!';
//         }
//         return custom;
     }




///////////////////////HANDLER//////////////////////////////

client.comandos = new Discord.Collection();


for(const file of readdirSync(require("path").join(__dirname, "comandos"))) {
    if(file.endsWith(".js")) {
      let fileName = file.substring(0, file.length - 3); 
      let fileContents = require(`./comandos/${file}`); 
      client.comandos.set(fileName, fileContents);
    } else if(lstatSync(require("path").join(__dirname, "comandos", file)).isDirectory()) {
      const commands = readdirSync(require("path").join(__dirname, "comandos", file)).filter((file) => file.endsWith(".js"));
    for (const file2 of commands) {
      const command = require(`./comandos/${file}/${file2}`);
      let fileName = file2.substring(0, file2.length - 3);
      client.comandos.set(fileName, command);
    }
    }
}


              for(const file of readdirSync('./eventos/')) { 
                  if(file.endsWith(".js")){
                      let fileName = file.substring(0, file.length - 3); 
                        let fileContents = require(`./eventos/${file}`); 
                          client.on(fileName, fileContents.bind(null, client)); 
                              }
                              }



///////////////////////HANDLER//////////////////////////////

client.login(process.env.TOKEN);