module.exports = (client) => {
  
console.log(`${client.user.tag} se ha iniciado`.underline.green)
const estados = [
  `${client.guilds.cache.size} servers`,
  `${client.channels.cache.size} canales`,
  `${client.users.cache.size} usuarios`,
  `Mencioname para ayuda!`
];

let index = 0;
setInterval(() => {
if(index === estados.length) index = 0;
const status = estados[index]
//console.log(status)
client.user.setActivity(status);
index++;
}, 5000)

client.user.setPresence({
  activity: {
    name: `que me menciones!`,
    type: "WATCHING"
  },
  status: 'dnd'
})

.catch(console.error);
 
  
}