import { Client, GatewayIntentBits, Events } from "discord.js";
import fs from "fs";
import { profanityChecker } from "./profanity.js";
import dotenv from "dotenv";

dotenv.config();
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.on(Events.ClientReady, async (client) => {
  console.log("client ready");
  const guild = client.guilds.cache.get(guildId);

  console.log("fetching users");
  let res = await guild.members.fetch();

  const filePath = "./community.txt";

  res.forEach(async (member) => {
    const name = member.user.username;
    const result = await profanityChecker(name);

    if (!result) {
      console.log(`adding ${name}`);
      fs.appendFileSync(filePath, `${name}\n`, "utf8");
    }
  });

  console.log("------------------");
  console.log("job done");
});

client.login(token);
