require('dotenv').config();
const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits, Partials } = require('discord.js');

const client = new SapphireClient({
  defaultPrefix: 'e;',
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  loadMessageCommandListeners: true,
  partials: [Partials.Channel, Partials.Message, Partials.User],
  typing: true,
});

async function main() {
  try {
    await client.login(process.env.TOKEN);
  } catch (error) {
    client.destroy();
    throw error;
  }
};

main().catch(console.error);
