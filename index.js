const request = require('request');
const fs = require('fs');
const axios = require('axios');

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");

const client = new Client({
    intents: [
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

const text_channel_id = "";
const channel_id = "";
const elevenkey = "";

addSpeechEvent(client);
let options = { json: true };
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

client.on("messageCreate", (msg) => {
    const voiceChannel = msg.member?.voice.channel;
    if (voiceChannel) {
        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            selfDeaf: false,
        });
    }
});

client.on("speech", (msg) => {
    if (!msg.content) return;


    const connection = getVoiceConnection(channel_id);

    var msg_old = msg.content;

    var m_link = "https://api.pawan.krd/chat/gpt?id=ayomideayomideayoayomide&text=" + msg_old;
    request(m_link, options, (error, res, body) => {

        if (!error && res.statusCode == 200) {
            var response = body.reply;
            client.channels.cache.get(text_channel_id).send(response);


            let responseStr = response.trim();
            if(responseStr > 5000){
           let responseStr = responseStr.substring(0, 4999);
            }
            if (responseStr.includes("|")) {
                let responseStr = responseStr.replace("|", "");
            }
            var ai_res = responseStr;


var voice_id = ""; //read Readme.md
axios({
  method: 'post',
  url: 'https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream',
  data: { text: ai_res },
  headers: {
    'Accept': 'audio/mpeg',
    'xi-api-key': elevenkey,
    'Content-Type': 'application/json',
  },
  responseType: 'stream'
})
  .then(response => {
   const player = createAudioPlayer();
                const resource = createAudioResource(response.data);
                connection.subscribe(player);
                player.play(resource);
    
  })
  .catch(error => {
    console.error(error);
  });

        }
    });



});

client.on("ready", () => {
    console.log("Ready!");
});

client.login('Your-Bot-Token-Here');


//Prevent pm2 crash on error
process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);

})

process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
})
