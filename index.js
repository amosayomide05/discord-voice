const googleTTS = require('google-tts-api');
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
            if (responseStr.includes("|")) {
                let responseStr = responseStr.replace("|", "");
            }
            var ai_res = responseStr;



            const text = responseStr;

            if (text.length > 200) {
                let originalString = text;
                let parts = [];
                let partLength = 200;

                for (let i = 0; i < originalString.length; i += partLength) {
                    parts.push(originalString.slice(i, i + partLength));
                }
                const player = createAudioPlayer();
                const language = 'en-GB';
                connection.subscribe(player);

                for (let i = 0; i < parts.length; i++) {
                    var part_text = parts[i];

                    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURI(part_text)}&tl=${language}&total=1&idx=0&client=tw-ob&ttsspeed=1`;


                    const resource = createAudioResource(ttsUrl);

                    player.play(resource);
                }


            }
            else {
                const language = 'en-GB';
                const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURI(text)}&tl=${language}&total=1&idx=0&client=tw-ob&ttsspeed=1`;

                const player = createAudioPlayer();
                const resource = createAudioResource(ttsUrl);
                connection.subscribe(player);
                player.play(resource);
            }

        }
    });



});

client.on("ready", () => {
    console.log("Ready!");
});

client.login('Yuor-Bot-Token-Here');


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