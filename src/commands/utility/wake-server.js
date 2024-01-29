const { SlashCommandBuilder } = require("discord.js");
const Client = require("ssh2").Client;
const wakeonlan = require("wakeonlan");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder().setName("wakeup").setDescription("Wakes up the game server"),
  async execute(interaction) {
    // Send the Wake-on-LAN magic packet to wake up the remote machine
    wakeonlan(process.env.SERVER_MAC_ADDRESS, (err) => {
      if (err) {
        console.error("Error sending Wake-on-LAN packet:", err);
        interaction.reply("There was an error while waking up the server!");
        return;
      }
    });
    interaction.reply("Server is waking up!");
  },
};
