const { SlashCommandBuilder } = require("discord.js");
const Client = require("ssh2").Client;
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder().setName("sleep").setDescription("Sleeps the game server"),
  async execute(interaction) {
    const sshClient = new Client();
    const connectionParams = {
      host: "192.168.0.140",
      port: 22,
      username: process.env.SERVER_USERNAME,
      password: process.env.SERVER_PASSWORD,
    };
    sshClient.connect(connectionParams);

    sshClient.on("ready", () => {
      console.log("Connected via SSH!");

      // Now you can execute commands via SSH to sleep the Windows machine
      sshClient.exec("rundll32.exe powrprof.dll,SetSuspendState Sleep", (err, stream) => {
        if (err) {
          console.error("Error executing command via SSH:", err);
          interaction.reply("There was an error while executing this command!");
        } else {
          console.log("Server is sleeping!");
          interaction.reply("Server is sleeping!");
        }

        // Close the SSH connection after executing the command
        sshClient.end();
      });
    });

    sshClient.on("error", (err) => {
      console.error("Error connecting via SSH:", err);
      interaction.reply("There was an error while executing this command!");
    });
  },
};
