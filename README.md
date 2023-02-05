# ChatGPT and Discord Voice Call bot, based on Node.js

## How to deploy

### Locally
Edit `index.js` and add your bot token, channel id and text channel id and elevenlab
[How to set up elevenlab](https://www.npmjs.com/package/elevenlabs-api)

Execute the command

```bash
# install dependencies
npm i 
# Start the bot service
npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs
# Or
node index
```

After starting the bot, first join a voice channel then send any messge in the text channel you added in `index.js`.

## License

MIT © Amos Ayomide (amosayomide05)



<p align="center"><br>
<img src="https://visit-counter.vercel.app/counter.png?page=https%3A%2F%2Fgithub.com%2Famosayomide05%2Fdiscord-voice&s=80&c=00ff00&bg=00000000&no=5&ff=digi" alt="visits">
</p>
