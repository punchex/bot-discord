require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});


client.once('ready', () => {
  console.log('Bot connecté : ' + client.user.tag);
});
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
  ;
  const boutiques = ['philibertnet.com'];

  const contient_lien = boutiques.some(boutique => message.content.includes(boutique));
  
    if (contient_lien) {
        console.log('🔗 Lien détecté de ' + message.author.username);

        const embed = new EmbedBuilder()
            .setTitle('🔔 Lien produit détecté !')
            .setColor(0x7c5cfc)
            .addFields(
                { name: '👤 Posté par', value: message.author.username },
                { name: '🔗 Lien', value: message.content },
                )
            .setTimestamp();
        
        const salon_alertes = await client.channels.fetch(process.env.ALERT_CHANNEL_ID);

        salon_alertes.send({ embeds: [embed] });
    }
  });
client.login(process.env.DISCORD_TOKEN);