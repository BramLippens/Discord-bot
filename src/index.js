const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  switch (message.content) {
    case "hello":
      message.reply("Bite me!");
  }
});

client.login(process.env.CLIENT_TOKEN);
